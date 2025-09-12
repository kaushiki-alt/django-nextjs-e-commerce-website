from django.contrib import admin
from .models import Product

class ProductAdmin(admin.ModelAdmin):
    list_display=('pk','name', 'description' ,'price' ,'stock' ,'created_at' ,'updated_at')
    search_fields=('name', 'stock')
admin.site.register(Product, ProductAdmin)
