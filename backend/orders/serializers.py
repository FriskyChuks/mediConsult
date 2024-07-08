from rest_framework import serializers

from .models import *


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'


class OrderDetailSerializer(serializers.ModelSerializer):
    item_name = serializers.SerializerMethodField(read_only=True)
    customer = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = OrderDetail
        fields = '__all__'

    def get_customer(self, obj):
        return obj.order.customer.email

    def get_item_name(self, obj):
        # return {
        #     "item": obj.item.title,
        #     # "cat": obj.item.item_category.title
        # }
        return obj.item.title


class DeliverySerializer(serializers.ModelSerializer):
    staff = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Delivery
        fields = '__all__'

    def get_staff(self, obj):
        return obj.confirmed_by.fullname


class ModeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mode
        fields = '__all__'
