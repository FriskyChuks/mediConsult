from django.urls import path

from .views import *


urlpatterns = [
    path('get_user/<email>/<phone>/', get_user),
]
