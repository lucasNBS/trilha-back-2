from django.urls import path, include
from rest_framework import routers
from .views import ProductView, ProductQuantitySoldView, ProductQuantityStockView

router = routers.DefaultRouter()
router.register('products', ProductView)

urlpatterns = [
  path('', include(router.urls)),
  path('product/<int:id>/quantity-sold/', ProductQuantitySoldView.as_view()),
  path('product/<int:id>/quantity-stock/', ProductQuantityStockView.as_view())
]