from django.shortcuts import render
from rest_framework.generics import *

from .serializers import *


class CreateItemView(ListCreateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
