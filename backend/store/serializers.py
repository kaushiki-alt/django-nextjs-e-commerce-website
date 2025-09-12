from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product               # which model to use
        fields = '__all__'            # include all fields of Product model
