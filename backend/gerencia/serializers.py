from rest_framework import serializers
from .models import Projeto, RelatorioProjeto, Funcionario, TermoAberturaProjeto, EstruturaAnaliticaProjeto, QuadroKanban, CardKanban

        
class ProjetoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Projeto
        fields = '__all__'
 
        
class RelatorioProjetoSerializer(serializers.ModelSerializer):
    class Meta:
        model = RelatorioProjeto
        fields = '__all__'
  
  
class FuncionarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Funcionario
        fields = '__all__'
 
    
class TAPSerializer(serializers.ModelSerializer):
    class Meta:
        model = TermoAberturaProjeto
        fields = '__all__'
    
        
class EAPSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstruturaAnaliticaProjeto
        fields = '__all__'
        
        
class QuadroKanbanSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuadroKanban
        fields = '__all__'
        

class CardKanbanSerializer(serializers.ModelSerializer):
    class Meta:
        model = CardKanban
        fields = '__all__'