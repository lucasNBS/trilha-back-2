from rest_framework.exceptions import AuthenticationFailed, NotAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import User
from .serializers import UserSerializer
import jwt, datetime, json

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
      'exp': datetime.datetime.now() + datetime.timedelta(seconds=20),
      'iat': datetime.datetime.now()
    }

    serializer = UserSerializer(user)

    access_token = jwt.encode(payload, 'SECRET', algorithm='HS256')
    refresh_token = jwt.encode({'id': user.id}, 'SECRET', algorithm='HS256')

    return Response(
      {'access_token': access_token, 'refresh_token': refresh_token, 'user': serializer.data}
    )
  
class TokenView(APIView):

  def post(self, request):
    body_unicode = request.body.decode('utf-8')
    refresh_token = json.loads(body_unicode)

    if not refresh_token:
      raise NotAuthenticated('Unauthenticated')

    try:
      payload = jwt.decode(refresh_token, 'SECRET', algorithms=['HS256'])

      user = User.objects.filter(id=payload['id']).first()

      payload = {
        'id': user.id,
        'exp': datetime.datetime.now() + datetime.timedelta(seconds=20),
        'iat': datetime.datetime.now()
      }

      access_token = jwt.encode(payload, 'SECRET', algorithm='HS256')

      serializer = UserSerializer(user)

      return Response({'access_token': access_token, 'user': serializer.data})
    except:
      raise AuthenticationFailed('Unauthenticated')

class UserView(APIView):
  
  def get(self, request):
    
    access_token = request.headers['Authorization'].split(" ")[1]

    try:
      payload = jwt.decode(access_token, 'SECRET', algorithms=['HS256'])

      user = User.objects.filter(id=payload['id']).first()

      serializer = UserSerializer(user)

      return Response(serializer.data)  
    except:
      raise AuthenticationFailed('Unauthenticated')