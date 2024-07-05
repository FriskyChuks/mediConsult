from django.urls import path

from .views import *


urlpatterns = [
    path('', CreateItemView.as_view())
]
