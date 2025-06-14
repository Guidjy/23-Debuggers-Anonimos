from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include

from rest_framework.routers import DefaultRouter

from . import views


router = DefaultRouter()
router.register(r'projetos', views.ProjetoViewSet)
router.register(r'relatorio_projeto', views.RelatorioProjetoViewSet)
router.register(r"funcionario", views.FuncionarioViewSet)
router.register(r"tap", views.TAPViewSet)
router.register(r"eap", views.EAPViewSet)
router.register(r"tarefa_eap", views.TarefaEAPViewSet)
router.register(r"quadro_kanban", views.QuadroKanbanViewSet)
router.register(r"card_kanban", views.CardKanbanViewSet)



urlpatterns = [
    path('', include(router.urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)