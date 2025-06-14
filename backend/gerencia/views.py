from rest_framework.response import Response
from rest_framework.decorators import api_view

from rest_framework import viewsets
from .models import Projeto, RelatorioProjeto, Funcionario, TermoAberturaProjeto, EstruturaAnaliticaProjeto, TarefaEAP, QuadroKanban, CardKanban
from .serializers import ProjetoSerializer, RelatorioProjetoSerializer, FuncionarioSerializer, TAPSerializer, EAPSerializer, TarefaEAPSerializer, QuadroKanbanSerializer, CardKanbanSerializer


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
        
