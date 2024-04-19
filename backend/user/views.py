from django.shortcuts import render
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import User
from .serializers import UserSerializer
import jwt, datetime

# Create your views here.
class RegisterView(APIView):

  def post(self, request):
    serializer = UserSerializer(data=request.data)

    if serializer.is_valid(raise_exception=True):
      serializer.save()
      return Response(serializer.data)
    
class LoginView(APIView):

  def post(self, request):
    email = request.data['email']
    password = request.data['password']

    user = User.objects.filter(email=email).first()

    if user is None:
      raise AuthenticationFailed('User doesn\'t exist')
    
    if not user.check_password(password):
      raise AuthenticationFailed('Incorrect password')

    payload = {
      'id': user.id,
      'exp': datetime.datetime.now() + datetime.timedelta(minutes=15),
      'iat': datetime.datetime.now()
    }

    access_token = jwt.encode(payload, 'SECRET', algorithm='HS256')
    refresh_token = jwt.encode({'id': user.id}, 'SECRET', algorithm='HS256')

    response = Response()

    response.set_cookie(key='access_token', value=access_token, max_age=30)
    response.set_cookie(key='refresh_token', value=refresh_token)

    return response
  
class UserView(APIView):

  def get(self, request):
    refresh_token = request.COOKIES.get('refresh_token')

    if not refresh_token:
      raise AuthenticationFailed('Unauthenticated')
    
    try:
      payload = jwt.decode(refresh_token, 'SECRET', algorithms=['HS256'])

      user = User.objects.filter(id=payload['id']).first()

      payload = {
        'id': user.id,
        'exp': datetime.datetime.now() + datetime.timedelta(minutes=15),
        'iat': datetime.datetime.now()
      }

      access_token = jwt.encode(payload, 'SECRET', algorithm='HS256')

      serializer = UserSerializer(user)

      response = Response(serializer.data)
      response.set_cookie(key='access_token', value=access_token, max_age=30)

      return response
    except:
      raise AuthenticationFailed('Unauthenticated')

class LogoutView(APIView):

  def post(self, request):
    response = Response({'message': 'Success'})

    response.delete_cookie('access_token')
    response.delete_cookie('refresh_token')
    return response
  

class RestrictAccessView(APIView):
  
  def get(self, request):
    access_token = request.COOKIES.get('access_token')

    try:
      payload = jwt.decode(access_token, 'SECRET', algorithms=['HS256'])

      user = User.objects.filter(id=payload['id']).first()

      serializer = UserSerializer(user)

      return Response(serializer.data)  
    except:
      raise AuthenticationFailed('Unauthenticated')