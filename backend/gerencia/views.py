from rest_framework.response import Response
from rest_framework.decorators import api_view

from rest_framework import viewsets
from .models import Projeto, RelatorioProjeto, Funcionario, TermoAberturaProjeto, EstruturaAnaliticaProjeto, TarefaEAP, QuadroKanban, CardKanban
from .serializers import ProjetoSerializer, RelatorioProjeto, FuncionarioSerializer, TAPSerializer, EAPSerializer, TarefaEAPSerializer, QuadroKanbanSerializer, CardKanbanSerializer

# Create your views here.
@api_view(['GET'])
def teste(request):
    return Response({'funcionando': '0-0'})


class ProjetoViewSet(viewsets.ModelViewSet):
    queryset = Projeto.objects.all()
    serializer_class = ProjetoSerializer