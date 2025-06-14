from django.db import models
from registry.models import User


class Projeto(models.Model):
    nome = models.CharField(max_length=50)
    
    criador = models.ForeignKey(User, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.nome
    

class RelatorioProjeto(models.Model):
    titulo = models.CharField(max_length=50)
    conteudo = models.TextField(max_length=3000)
    ultima_atualizacao = models.DateTimeField(auto_now=True)
    
    projeto = models.ForeignKey(Projeto, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.titulo


class Funcionario(models.Model):
    nome = models.CharField(max_length=50)
    cargo = models.CharField(max_length=50, blank=True, null=True)
    
    projetos = models.ManyToManyField(Projeto, related_name='funcionarios')
    
    def __str__(self):
        return self.nome
    

class TermoAberturaProjeto(models.Model):
    titulo = models.CharField(max_length=50)
    documento = models.FileField(upload_to='documentos/')
    
    projeto = models.ForeignKey(Projeto, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.titulo
    

class EstruturaAnaliticaProjeto(models.Model):
    n_tarefas = models.IntegerField(default=0)
    documento = models.FileField(upload_to='documentos/', null=True, blank=True)
    
    projeto = models.ForeignKey(Projeto, on_delete=models.CASCADE)
    
    def __str__(self):
        return f'eap do projeto {self.projeto}'
    

class QuadroKanban(models.Model):
    titulo = models.CharField(max_length=50)
    numero_de_cards = models.IntegerField(default=0)
    
    projeto = models.ForeignKey(Projeto, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.titulo
    
    
class CardKanban(models.Model):
    tarefa = models.CharField(max_length=70)
    status = models.CharField(max_length=20, default="para fazer")
    data_de_entrega = models.DateField(blank=True, null=True)    
    
    quadro = models.ForeignKey(QuadroKanban, on_delete=models.CASCADE)
    responsaveis = models.ManyToManyField(Funcionario, related_name='tarefas', blank=True)

    
    def __str__(self):
        return self.tarefa
