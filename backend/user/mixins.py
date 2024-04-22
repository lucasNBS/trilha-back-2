from rest_framework.exceptions import AuthenticationFailed
from rest_framework.views import APIView
from .exceptions import UserNotLoggedin
from .models import User
from .serializers import UserSerializer
import jwt

class LoginRequiredMixin(APIView):

  def is_logged(self, request):
    access_token = request.headers['Authorization'].split(" ")[1]

    try:
      payload = jwt.decode(access_token, 'SECRET', algorithms=['HS256'])

      user = User.objects.filter(id=payload['id']).first()

      serializer = UserSerializer(user)
    except:
      raise UserNotLoggedin("Unauthenticated")
