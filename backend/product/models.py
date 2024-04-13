from django.db import models
from django.core.validators import MinValueValidator

# Create your models here.
class Product(models.Model):
  title = models.CharField(max_length=100, blank=False, null=False)
  description = models.TextField(blank=False, null=False)
  image = models.ImageField(upload_to='images', default='images/no-image.jpg')
  price = models.FloatField(blank=False, null=False, validators=[MinValueValidator(0)])
  quantity_in_stock = models.IntegerField(blank=False, null=False, validators=[MinValueValidator(0)])
  quantity_sold = models.IntegerField(blank=False, null=False, validators=[MinValueValidator(0)])
