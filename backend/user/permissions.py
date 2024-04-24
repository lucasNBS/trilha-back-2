from rest_framework.permissions import BasePermission
from .mixins import LoginRequiredMixin

class IsCEO(BasePermission, LoginRequiredMixin):

  def has_permission(self, request, view):
    return self.user.role == 'CEO'