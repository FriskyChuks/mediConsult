from django.urls import path

from .views import *


urlpatterns = [
    path('', ListCreateItemView.as_view())
]
