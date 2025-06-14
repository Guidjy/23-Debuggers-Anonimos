from rest_framework.response import Response
from rest_framework.decorators import api_view

from rest_framework import viewsets
from .models import Projeto, RelatorioProjeto, Funcionario, TermoAberturaProjeto, EstruturaAnaliticaProjeto, TarefaEAP, QuadroKanban, CardKanban
from .serializers import ProjetoSerializer, RelatorioProjetoSerializer, FuncionarioSerializer, TAPSerializer, EAPSerializer, TarefaEAPSerializer, QuadroKanbanSerializer, CardKanbanSerializer

from google import genai
import PyPDF2
import re


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
 

class TarefaEAPViewSet(viewsets.ModelViewSet):
    queryset = TarefaEAP.objects.all()
    serializer_class = TarefaEAPSerializer
    

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
    })