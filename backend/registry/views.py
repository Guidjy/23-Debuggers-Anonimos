from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import User
from .serializers import UserSerializer
from django.views.decorators.csrf import csrf_exempt

from email_validator import validate_email, EmailNotValidError


@api_view(['GET'])
def get_all_users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    
    return Response(serializer.data)


@api_view(['POST'])
def register_user(request):
    """
    Registers and logs in a new user.
    
    #### fields:
    - username: string
    - email: string
    - password: string
    - passwordConfirmation: string
    
    #### response:
    - success: string (success message) (conditional)
        - user data
    - error: string (error message) (conditional)
    """
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    confirmation = request.data.get('passwordConfirmation')
    
    if not username or not email or not password or not confirmation:
        return Response({'error': 'Please fill in the form fields.'}, status=400)
    
    if password != confirmation:
        return Response({'error': 'Password and confirmation must match'}, status=400)
    
    # validates email
    try:
        email_info = validate_email(email, check_deliverability=True)
    except EmailNotValidError:
        return Response({'error': 'Invalid email.'}, status=400)
    
    # checks if a user with that email already exists
    try:
        User.objects.get(email=email)
    except User.DoesNotExist:
        pass
    else:
        return Response({'error': 'Email already in use.'}, status=409)
    
    # registers and logs in new user
    try:
        user = User.objects.create_user(username=username, email=email, password=password)
        login(request, user)
        return Response({'success': 'User successfully registered', 'user': UserSerializer(user).data}, status=201)
    except Exception as e:
        return Response({'error': str(e)}, status=400)
    

@csrf_exempt
@api_view(['POST'])
def login_user(request):
    """
    Logs a user in.
    
    #### fields:
    - username: string
    - password: string
    
    #### response:
    - success: string (success message) (conditional)
    - error: string (error message) (conditional)
    """
    username = request.data.get('username')
    password = request.data.get('password')
    print(username)
    print(password)
    
    if not username or not password:
        return Response({'error': 'Please fill in the form fields.'}, status=400)
    
    user = authenticate(request, username=username, password=password)
    
    if user:
        login(request, user)
        return Response({'success': 'User successfully logged in.'}, status=200)
    else:
        return Response({'error': 'Invalid credentials.'}, status=400)


@login_required
@api_view(['GET'])
def logout_user(request):
    """
    Logs the current user out.
    
    #### response:
    - success: string (success message) (conditional)
    """
    logout(request)
    return Response({'success': 'User successfully logged out'}, status=200)


@api_view(['GET'])
def get_user(request, id):
    """
    Returns information about the current logged in user.
    
    #### response:
    - user: user data
    """
    try:
        user = User.objects.get(id=id)
    except User.DoesNotExist:
        return Response({'error': f'User with id {id} does not exist.'}, status=400)
    serializer = UserSerializer(user)
    return Response({'user': serializer.data}, status=200)


@login_required
@api_view(['PATCH'])
def edit_user(request):
    """
    Allows currently logged in user to edit their credentials.
    
    #### fields:
    - newUsername: string (optional)
    - newEmail: string (optional)
    - newPassword: string (optional)
    
    #### response:
    - success: string (success message)
        - updated user data
    """
    user = request.user
    new_username = request.data.get('newUsername')
    new_email = request.data.get('newEmail')
    new_password = request.data.get('newPassword')
    
    if new_username:
        user.username = new_username
    if new_email:
        user.email = new_email
    if new_password:
        user.set_password(new_password)
    
    user.save()
    
    return Response({'success': 'User successfully updated.', 'user': UserSerializer(user).data}, status=200)


@login_required
@api_view(['DELETE'])
def delete_user(request, id):
    """
    Deletes user by id
    
    #### response:
    - success: string (success message)
    """
    try:
        user = User.objects.get(id=id)
    except User.DoesNotExist:
        return Response({'error': f'User with id {id} does not exist.'}, status=400)
    
    if user == request.user:
        logout(request)
    user.delete()
    
    return Response({'success': 'User Successfully deleted'}, status=200)


@api_view(['GET'])
def usuario_atual(request):
    usuario = request.user
    serializer = UserSerializer(usuario)
    return Response(serializer.data)