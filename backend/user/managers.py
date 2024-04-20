from django.contrib.auth.models import BaseUserManager

class UserManager(BaseUserManager):

  def create_superuser(self, email, name, password):
    if not email or not name or not password:
      raise ValueError("Missing required fields")
    
    user = self.model()

    user.email = self.normalize_email(email)
    user.name = name
    user.set_password(password)
  
    user.is_staff = True
    user.is_active = True
    user.is_superuser = True

    user.save(using=self._db)
    return user