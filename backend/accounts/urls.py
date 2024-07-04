from django.urls import path

from .views import *


urlpatterns = [
    path('signup/', SignUpView.as_view()),
    path('login/', LoginAPIView.as_view()),
    path('users/', ListUsers.as_view()),
    path('logout/', LogoutView.as_view()),
    path('departments/', CategoryView.as_view(), name='departments'),
]
