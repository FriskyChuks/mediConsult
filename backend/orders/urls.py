from django.urls import path

from .views import *


urlpatterns = [
    path('', OrdersListCreateView.as_view()),
    path('create_order_detail/', CreateOrderDetailView.as_view()),
    path('order_detail/<pk>/', OrderDetailView.as_view()),
]
