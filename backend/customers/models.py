from django.db import models
from accounts.models import CustomUser as User

from items.models import Item


class Order(models.Model):
    customer = models.ForeignKey(User, on_delete=models.CASCADE)
    discount = models.DecimalField(
        decimal_places=2, max_digits=12, default=00.00)
    VAT = models.DecimalField(decimal_places=2, max_digits=12, default=00.00)
    order_date = models.DateTimeField()
    processing = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.customer} | {self.order_date}"


class OrderDetail(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    price = models.DecimalField(decimal_places=2, max_digits=12, default=00.00)
    quantity = models.IntegerField()

    def __str__(self):
        return f"{self.item} ({self.quantity}) | {self.price}"


class Mode(models.Model):
    title = models.CharField(max_length=20)

    def __str__(self):
        return self.title


class Delivery(models.Model):
    dispatch_status = models.BooleanField(default=False)
    dispatch_date = models.DateField()
    mode = models.ForeignKey(Mode, on_delete=models.CASCADE)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    delivery_status = models.BooleanField(default=False)
    confirmed_by = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        if self.delivery_status:
            return f"{self.order} ('Delivered')"
        return f"{self.order} ('Pending')"
