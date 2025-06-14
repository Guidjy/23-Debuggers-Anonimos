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
router.register(r"quadro_kanban", views.QuadroKanbanViewSet)
router.register(r"card_kanban", views.CardKanbanViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('buscar_projetos_usuario', views.buscar_projetos_usuario),
    path('gerar_relatorio/<int:projeto_id>', views.gerar_relatorio),
    path('gerar_cards_kanban/<int:projeto_id>', views.gerar_cards_kanban),
    path('perguntar_chat', views.perguntar_chat),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)