# Generated by Django 5.0.4 on 2024-10-03 10:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('addresses', '0006_rename_address_address_address_info'),
    ]

    operations = [
        migrations.RenameField(
            model_name='address',
            old_name='address_info',
            new_name='address',
        ),
    ]
