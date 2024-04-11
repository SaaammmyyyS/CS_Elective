# Generated by Django 5.0.1 on 2024-04-11 11:22

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0010_joblisting_url'),
    ]

    operations = [
        migrations.AddField(
            model_name='joblisting',
            name='user',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
