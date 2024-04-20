from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import UserManager

ROLES = (
  ("CEO", 'ceo'),
  ("ADMIN", 'admin'),
  ("COMMON", 'common')
)

# Create your models here.
class User(AbstractUser):
  name = models.CharField(max_length=25)
  email = models.EmailField(unique=True)
  password = models.CharField(max_length=100)
  role = models.CharField(max_length=10, choices=ROLES, default="COMMON")
  username = None

  objects = UserManager()

  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = ['name', 'password']