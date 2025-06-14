from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required
from rest_framework.response import Response
from rest_framework.decorators import api_view

# Create your views here.
@api_view(['GET'])
def teste(request):
    return Response({'funcionando': '0-0'})