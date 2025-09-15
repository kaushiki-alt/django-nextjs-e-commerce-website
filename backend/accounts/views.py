from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import AccountSerializer
from rest_framework  import status
from .models import Account



@api_view(['POST', 'GET'])
def register(request):
        if request.method == 'POST':
            serializer = AccountSerializer(data = request.data)
            if (serializer.is_valid()):
                serializer.save()
                return Response(serializer.data, status= status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            products = Account.objects.all()
            serializer = AccountSerializer(products, many=True)
            return Response(serializer.data)