from django.urls import path
from .views import RegisterView, LoginView, TokenView, RestrictAccessView

urlpatterns = [
  path('register/', RegisterView.as_view()),
  path('login/', LoginView.as_view()),
  path('token/', TokenView.as_view()),
  path('test-auth/', RestrictAccessView.as_view())
]