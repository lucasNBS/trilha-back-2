from rest_framework import serializers
from .models import User
from .exceptions import UserAlreadyExists

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('id', 'name', 'email', 'role', 'password')
    extra_kwargs = {
      'role': {'read_only': True},
      'password': {'write_only': True}
    }

  def is_valid(self, *, raise_exception=False):
    email = self.initial_data['email']

    if self.Meta.model.objects.filter(email__iexact=email).count() > 0:
      raise UserAlreadyExists(detail="User with this email already exists")

    return super().is_valid(raise_exception=raise_exception)

  def create(self, validated_data):
    password = validated_data.pop('password', None)
    instance = self.Meta.model(**validated_data)

    if password is not None:
      instance.set_password(password)

    instance.save()
    return instance