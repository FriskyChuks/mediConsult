# Generated by Django 5.0.4 on 2024-10-03 09:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('addresses', '0002_remove_state_country'),
    ]

    operations = [
        migrations.AlterField(
            model_name='address',
            name='lga',
            field=models.CharField(max_length=225),
        ),
        migrations.AlterField(
            model_name='address',
            name='state',
            field=models.CharField(max_length=225),
        ),
    ]