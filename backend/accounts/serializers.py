from rest_framework import serializers
from rest_framework.validators import ValidationError
from rest_framework.authtoken.models import Token
import re
from djoser.serializers import UserCreateSerializer
from django.contrib.auth import authenticate

from .models import *

from django.contrib.auth import get_user_model
User = get_user_model()


class UserCreateSerializer(UserCreateSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'fullname', 'password']


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'email', 'fullname')

    def get_user_name(self, obj):
        try:
            return obj.user.fullname
        except:
            pass


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)

    class Meta:
        model = CustomUser
        # Add more fields as needed
        fields = ('id', 'fullname', 'email',
                  'password', 'phone')
        # Password should not be read
        extra_kwargs = {'password': {'write_only': True}}

    def validate_password(self, value):
        # if len(value) < 6:
        #     raise serializers.ValidationError(
        #         "Password must be at least 6 characters long.")
        # if not re.search(r'[A-Z]', value):
        #     raise serializers.ValidationError(
        #         "Password must contain at least one uppercase letter.")
        if not re.search(r'[a-z]', value):
            raise serializers.ValidationError(
                "Password must contain at least one lowercase letter.")
        # if not re.search(r'[0-9!@#$%^&*()_+=-]', value):
        #     raise serializers.ValidationError(
        #         "Password must contain at least one number or symbol.")
        return value

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise ValidationError("An account with that Email already exists!")
        return value

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        # token, created = Token.objects.get_or_create(user=user)
        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError('Incorrect credentials')


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
