from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q

from .models import CustomUser as User
from .serializers import CustomUserSerializer


@api_view(['GET'])
def get_user(request, email, phone):
    user = User.objects.filter(Q(email=email) | Q(phone=phone))
    serializer = CustomUserSerializer(user, many=True)
    data = serializer.data
    print(data)

    return Response(data, status=status.HTTP_200_OK)
