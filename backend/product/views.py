from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import UpdateAPIView, ListAPIView
from rest_framework.parsers import FormParser, MultiPartParser
from django.http import JsonResponse
from .models import Product
from .serializers import ProductSerializer

# Create your views here.
class ProductView(ModelViewSet):
  queryset = Product.objects.all()
  serializer_class = ProductSerializer
  parser_classes = (MultiPartParser, FormParser)

class ProductQuantitySoldView(UpdateAPIView):
  queryset = Product.objects.all()
  serializer_class = ProductSerializer
  lookup_field = 'id'
  kwargs = 'id'
  lookup_url_kwarg = 'id'

  def update(self, request, *args, **kwargs):

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

    return super().update(request, *args, **kwargs)
  
class ProductQuantityStockView(UpdateAPIView):
  queryset = Product.objects.all()
  serializer_class = ProductSerializer
  lookup_field = 'id'
  kwargs = 'id'
  lookup_url_kwarg = 'id'

  def update(self, request, *args, **kwargs):

    product_quantity_in_stock = self.get_object().__getattribute__('quantity_in_stock')

    quantity_in_stock = request.data.get('quantity_in_stock')
    operation = request.data.get('operation')

    if operation == 'add':
      request.data.update({'quantity_in_stock': product_quantity_in_stock + float(quantity_in_stock)})
    if operation == 'remove':
      request.data.update({'quantity_in_stock': product_quantity_in_stock - float(quantity_in_stock)})

    return super().update(request, *args, **kwargs)

class StockOverview(ListAPIView):
  queryset = Product.objects.all()
  serializer_class = ProductSerializer

  def get(self, request, *args, **kwargs):
    return self.retrieve(request, *args, **kwargs)

  def retrieve(self, request, *args, **kwargs):
    total = 0
    quantity_in_stock = 0
    quantity_sold = 0

    for product in self.get_queryset():
      total += product.price * product.quantity_sold
      quantity_in_stock += product.quantity_in_stock
      quantity_sold += product.quantity_sold

    return JsonResponse({
      'total': total,
      'quantity_in_stock': quantity_in_stock,
      'quantity_sold': quantity_sold
    })