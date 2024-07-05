from django.shortcuts import render
from rest_framework.generics import *
from rest_framework import generics
from .serializers import *


class OrdersListCreateView(ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class CreateOrderDetailView(CreateAPIView):
    queryset = OrderDetail.objects.all()
    serializer_class = OrderDetailSerializer


class OrderDetailView(RetrieveAPIView):
    queryset = OrderDetail.objects.all()
    serializer_class = OrderDetailSerializer
