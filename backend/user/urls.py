from django.urls import path
from .views import RegisterView, LoginView, LogoutView, UserView, RestrictAccessView

urlpatterns = [
  path('register/', RegisterView.as_view()),
  path('login/', LoginView.as_view()),
  path('user/', UserView.as_view()),
  path('logout/', LogoutView.as_view()),
  path('test-auth/', RestrictAccessView.as_view())
]