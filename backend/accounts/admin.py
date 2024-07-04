from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.forms import TextInput, Textarea, CharField
from .models import *


class UserAdminConfig(UserAdmin):
    model = CustomUser
    search_fields=('email','fullname','phone')
    list_filter = ('email','fullname','phone','is_active','is_staff','is_customer','is_clinician')
    list_display = ('email','fullname','phone','is_active','is_staff','is_customer','is_clinician')
    fieldsets = (
        (None,{'fields':('email','fullname','IPPIS','department',)}),
        ('Permissions',{'fields':('is_staff','is_active')}),
        # ('Personal')
    )
    ordering = ('email',)

admin.site.register(CustomUser, UserAdminConfig)
admin.site.register(Category)
