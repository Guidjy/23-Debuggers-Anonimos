from django.urls import path
from . import views


urlpatterns = [
    path('', views.get_all_users),
    path('register/', views.register_user),
    path('login/', views.login_user),
    path('logout/', views.logout_user),
    path('get_user/<int:id>', views.get_user),
    path('edit_user/', views.edit_user),
    path('delete_user/<int:id>', views.delete_user),
]