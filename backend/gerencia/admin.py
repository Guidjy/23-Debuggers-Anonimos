from django.contrib import admin
from .models import Projeto, RelatorioProjeto, Funcionario, TermoAberturaProjeto, EstruturaAnaliticaProjeto, QuadroKanban, CardKanban

# Register your models here.
admin.site.register(Projeto)
admin.site.register(RelatorioProjeto)
admin.site.register(Funcionario)
admin.site.register(TermoAberturaProjeto)
admin.site.register(EstruturaAnaliticaProjeto)
admin.site.register(QuadroKanban)
admin.site.register(CardKanban)

