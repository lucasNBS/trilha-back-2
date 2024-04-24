from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import UpdateAPIView, ListAPIView
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.pagination import PageNumberPagination
from django.http import JsonResponse
from .exceptions import OperationUnavailable
from .models import Product
from .serializers import ProductSerializer
from user.mixins import LoginRequiredMixin
from user.permissions import IsCEO

# Create your views here.
class DefaultPagination(PageNumberPagination):
  page_size = 5
  page_query_param = 'page'

class ProductView(ModelViewSet, LoginRequiredMixin):
  queryset = Product.objects.all()
  serializer_class = ProductSerializer
  parser_classes = (MultiPartParser, FormParser)
  pagination_class = DefaultPagination

  def create(self, request, *args, **kwargs):
    self.is_logged(request)
    return super().create(request, *args, **kwargs)
  
  def update(self, request, *args, **kwargs):
    self.is_logged(request)
    return super().update(request, *args, **kwargs)
  
  def list(self, request, *args, **kwargs):
    self.is_logged(request)
    return super().list(request, *args, **kwargs)
  
  def retrieve(self, request, *args, **kwargs):
    self.is_logged(request)
    return super().retrieve(request, *args, **kwargs)
  
  def destroy(self, request, *args, **kwargs):
    self.is_logged(request)
    return super().destroy(request, *args, **kwargs)

class ProductQuantitySoldView(UpdateAPIView, LoginRequiredMixin):
  queryset = Product.objects.all()
  serializer_class = ProductSerializer
  lookup_field = 'id'
  kwargs = 'id'
  lookup_url_kwarg = 'id'

  def update(self, request, *args, **kwargs):

    self.is_logged(request)

    product_quantity_sold = self.get_object().__getattribute__('quantity_sold')
    product_quantity_in_stock = self.get_object().__getattribute__('quantity_in_stock')

    quantity_sold = request.data.get('quantity_sold')
    operation = request.data.get('operation')

    if operation == 'add':
      request.data.update({'quantity_sold': product_quantity_sold + float(quantity_sold)})
      request.data.update({'quantity_in_stock': product_quantity_in_stock - float(quantity_sold)})
    if operation == 'remove':
      request.data.update({'quantity_sold': product_quantity_sold - float(quantity_sold)})
      request.data.update({'quantity_in_stock': product_quantity_in_stock + float(quantity_sold)})

    if float(request.data.get("quantity_sold")) < 0:
      raise OperationUnavailable(detail="Quantity sold cannot be negative")
    if float(request.data.get("quantity_in_stock")) < 0:
      raise OperationUnavailable(detail="Quantity in stock cannot be negative")
    
    return super().update(request, *args, **kwargs)

class ProductQuantityStockView(UpdateAPIView, LoginRequiredMixin):
  queryset = Product.objects.all()
  serializer_class = ProductSerializer
  lookup_field = 'id'
  kwargs = 'id'
  lookup_url_kwarg = 'id'

  def update(self, request, *args, **kwargs):
    
    self.is_logged(request)

    product_quantity_in_stock = self.get_object().__getattribute__('quantity_in_stock')

    quantity_in_stock = request.data.get('quantity_in_stock')
    operation = request.data.get('operation')

    if operation == 'add':
      request.data.update({'quantity_in_stock': product_quantity_in_stock + float(quantity_in_stock)})
    if operation == 'remove':
      request.data.update({'quantity_in_stock': product_quantity_in_stock - float(quantity_in_stock)})

    if float(request.data.get("quantity_in_stock")) < 0:
      raise OperationUnavailable(detail="Quantity in stock cannot be negative")

    return super().update(request, *args, **kwargs)

class StockOverview(ListAPIView, IsCEO):
  queryset = Product.objects.all()
  serializer_class = ProductSerializer

  def get(self, request, *args, **kwargs):
    self.is_logged(request)
    return self.retrieve(request, *args, **kwargs)

  def retrieve(self, request, *args, **kwargs):
    total = 0
    quantity_in_stock = 0
    quantity_sold = 0

    if self.has_permission(request, self.retrieve):
      for product in self.get_queryset():
        total += product.price * product.quantity_sold
        quantity_in_stock += product.quantity_in_stock
        quantity_sold += product.quantity_sold

      return JsonResponse({
        'total': total,
        'quantity_in_stock': quantity_in_stock,
        'quantity_sold': quantity_sold
      })
    
    else:
      for product in self.get_queryset():
        quantity_in_stock += product.quantity_in_stock
        quantity_sold += product.quantity_sold

      return JsonResponse({
        'quantity_in_stock': quantity_in_stock,
        'quantity_sold': quantity_sold
      })