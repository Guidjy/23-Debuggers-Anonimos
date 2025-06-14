from rest_framework.response import Response
from rest_framework.decorators import api_view

from rest_framework import viewsets
from .models import Projeto, RelatorioProjeto, Funcionario, TermoAberturaProjeto, EstruturaAnaliticaProjeto, QuadroKanban, CardKanban
from .serializers import ProjetoSerializer, RelatorioProjetoSerializer, FuncionarioSerializer, TAPSerializer, EAPSerializer, QuadroKanbanSerializer, CardKanbanSerializer

from google import genai
import PyPDF2
import re
import json


class ProjetoViewSet(viewsets.ModelViewSet):
    queryset = Projeto.objects.all()
    serializer_class = ProjetoSerializer
    

class RelatorioProjetoViewSet(viewsets.ModelViewSet):
    queryset = RelatorioProjeto.objects.all()
    serializer_class = RelatorioProjetoSerializer
    

class FuncionarioViewSet(viewsets.ModelViewSet):
    queryset = Funcionario.objects.all()
    serializer_class = FuncionarioSerializer
    
    
class TAPViewSet(viewsets.ModelViewSet):
    queryset = TermoAberturaProjeto.objects.all()
    serializer_class = TAPSerializer
    

class EAPViewSet(viewsets.ModelViewSet):
    queryset = EstruturaAnaliticaProjeto.objects.all()
    serializer_class = EAPSerializer
    

class QuadroKanbanViewSet(viewsets.ModelViewSet):
    queryset = QuadroKanban.objects.all()
    serializer_class = QuadroKanbanSerializer
    
    
class CardKanbanViewSet(viewsets.ModelViewSet):
    queryset = CardKanban.objects.all()
    serializer_class = CardKanbanSerializer


@api_view(['GET'])
def gerar_relatorio(request, projeto_id):
    
    try:
        projeto = Projeto.objects.get(id=projeto_id)
    except Projeto.DoesNotExist:
        return Response({'erro', f'Não existe um projeto com esse id ({id})'}, status=400)
    
    prompt = f'Com base nos seguintes documentos e informações do projeto "{projeto.nome}", gere um breve relatório de no máximo dois parágrafos sobre andamento dele.'
    
    try:
        tap = TermoAberturaProjeto.objects.get(id=projeto_id)
    except TermoAberturaProjeto.DoesNotExist:
        return Response({'erro', f'Não existe um projeto com esse id ({id})'}, status=400)
    
    # extrai o texto da tap
    documento = tap.documento
    texto_pdf = 'Termo de abertura do projeto:'
    if documento:
        reader = PyPDF2.PdfReader(documento)
        for page in reader.pages:
            texto_pdf += page.extract_text() or ''
    # limpa o pdf
    texto_pdf = re.sub(r'[^A-Za-zÀ-ÖØ-öø-ÿ0-9]+', ' ', texto_pdf).strip()

            
    # Buscar funcionários
    funcionarios = Funcionario.objects.filter(projetos=projeto).values('nome', 'cargo')
    texto_pdf += 'Funcionários do projeto:'
    for f in funcionarios:
        texto_pdf += f"- {f['nome']} ({f['cargo']})"
        
    # buscar tarefas do cronograma
    cards = CardKanban.objects.filter(quadro__projeto__id=projeto_id)
    card_serializer = CardKanbanSerializer(cards, many=True)
    texto_pdf += f'Tarefas quadro kanban: {card_serializer.data}'
    
    # gera o relatório com a api do gemini
    prompt += texto_pdf
    client = genai.Client(api_key="# NÃO FAZER PUSH DA KEY DA API CARALEO")    # NÃO FAZER PUSH DA KEY DA API CARALEO
    response = client.models.generate_content(
        model="gemini-2.0-flash", contents=prompt
    )
    # limpa o relatório
    texto_limpo = re.sub(r'[*_`#>\[\]{}|~\-]', ' ', response.text).strip()

    return Response({
        'resposta': texto_limpo,
        'promt': prompt
    }, status=200)
    

@api_view(['GET'])
def gerar_cards_kanban(request, projeto_id):
    
    # verifica se existe um projeto 
    try:
        projeto = Projeto.objects.get(id=projeto_id)
    except Projeto.DoesNotExist:
        return Response({'erro', f'Não existe um projeto com esse id ({id})'}, status=400)
    
    # query o Quadro kanban
    try:
        quadro = QuadroKanban.objects.get(projeto=projeto)
    except QuadroKanban.DoesNotExist:
        nome_do_projeto = projeto.nome
        quadro = QuadroKanban.objects.create(titulo=f'Quadro {nome_do_projeto}', projeto=projeto)
    else:
        if quadro.numero_de_cards > 0:
            return Response({'erro': 'ja foram gerados cards para esse projeto'}, status=400)
    
    # query a eap
    try:
        eap = EstruturaAnaliticaProjeto.objects.get(projeto=projeto)
    except Projeto.DoesNotExist:
        return Response({'erro', f'Esse projeto não possui ume eap.'}, status=400)
    
    # extrai o texto da eap
    documento = eap.documento
    texto_pdf = ''
    if documento:
        reader = PyPDF2.PdfReader(documento)
        for page in reader.pages:
            texto_pdf += page.extract_text() or ''
    # limpa o pdf
    texto_pdf = re.sub(r'[^A-Za-zÀ-ÖØ-öø-ÿ0-9]+', ' ', texto_pdf).strip()
    
    # faz uma prompt para o gemini
    prompt = 'Formate os itens da estrutura analítica do projeto no seguinte formato json: {"descricao": "<Descrição da tarefa>"}, e retorne-os em uma lista'
    prompt += texto_pdf
    client = genai.Client(api_key="# NÃO FAZER PUSH DA KEY DA API CARALEO")    # NÃO FAZER PUSH DA KEY DA API CARALEO
    response = client.models.generate_content(
        model="gemini-2.0-flash", contents=prompt
    )
    # limpa a resposta
    texto_limpo = re.sub(r'\s+', ' ', response.text) 
    texto_limpo = re.sub(r'[/]', ' ', texto_limpo).strip()
    texto_limpo = re.findall(r'\[(.*?)\]', texto_limpo)
    texto_limpo = texto_limpo[0]  # temos json em string
    
    # parte a string em jsons individuais
    jsons = texto_limpo.split(',')
    cards = []
    for item in jsons:
        cards.append(json.loads(item))
    
    # cria cards
    cards_criados = []
    for card in cards:
        novo_card = CardKanban(
            tarefa=card['descricao'],
            quadro=quadro
        )
        novo_card.full_clean()
        novo_card.save()
        cards_criados.append(novo_card)
        
    quadro.numero_de_cards = len(cards_criados)
    quadro.save()
        
    card_serializer = CardKanbanSerializer(cards_criados, many=True)
    return Response({'cards': card_serializer.data})


@api_view(['POST'])
def perguntar_chat(request):
    pergunta = request.data.get('pergunta')
    
    if pergunta:
        client = genai.Client(api_key="# NÃO FAZER PUSH DA KEY DA API CARALEO")    # NÃO FAZER PUSH DA KEY DA API CARALEO
        response = client.models.generate_content(
            model="gemini-2.0-flash", contents=pergunta
        )
    else:
        return Response({'erro': 'Nada foi digitado'}, status=400)

    return Response({'resposta': response.text}, status=200)