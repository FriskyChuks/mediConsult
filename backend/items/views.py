from django.shortcuts import render
from rest_framework.generics import *
from rest_framework.permissions import *

from .serializers import *


class ListCreateItemView(ListCreateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)
