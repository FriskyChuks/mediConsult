from django.shortcuts import render
from rest_framework.generics import ListAPIView, ListCreateAPIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import *
from rest_framework.response import Response
from rest_framework import status

from .serializer import *
from .models import *


class StateListView(ListAPIView):
    queryset = State.objects.all()
    serializer_class = StateSerializer
    permission_classes = [AllowAny]


class LGAListView(ListAPIView):
    queryset = LGA.objects.all()
    serializer_class = LGASerializer
    permission_classes = [AllowAny]


class AddressListCreateView(ListCreateAPIView):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer
    permission_classes = [AllowAny]


@api_view(['GET'])
@permission_classes([AllowAny])
def get_customer_address(request, customer_id):
    get_address = Address.objects.filter(customer_id=customer_id)
    serializer = AddressSerializer(get_address, many=True)
    data = serializer.data
    if data:
        return Response(data, status=status.HTTP_200_OK)
    return Response(status=status.HTTP_302_FOUND)