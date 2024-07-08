from django.urls import path

from .views import *


urlpatterns = [
    path('', OrdersListCreateView.as_view()),
    path('retrieve_update_order/<pk>/', OrdersRetrieveUpdateView.as_view()),
    path('create_order_detail/', OrderDetailCreateView.as_view()),
    path('order_detail/<order_id>/',
         order_details_views, name='order_details'),
    path('delivery/', DeliveryView.as_view()),
]
