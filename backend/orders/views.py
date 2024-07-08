from rest_framework import status
from rest_framework.generics import *
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import *


class OrdersListCreateView(ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class OrdersRetrieveUpdateView(RetrieveUpdateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class OrderDetailCreateView(CreateAPIView):
    queryset = OrderDetail.objects.all()
    serializer_class = OrderDetailSerializer


@api_view(['GET'])
def order_details_views(request, order_id):
    order = Order.objects.filter(id=order_id)
    if not order:
        return Response({"message": "This order does not exist!"}, status=status.HTTP_404_NOT_FOUND)
    queryset = OrderDetail.objects.filter(order_id=order_id)
    serializer = OrderDetailSerializer(queryset, many=True)
    data = serializer.data
    return Response(data, status=status.HTTP_200_OK)


class DeliveryView(ListCreateAPIView):
    queryset = Delivery.objects.all()
    serializer_class = DeliverySerializer
