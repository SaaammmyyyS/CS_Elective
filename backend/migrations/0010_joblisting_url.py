# Generated by Django 5.0.1 on 2024-04-09 09:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0009_remove_joblisting_url'),
    ]

    operations = [
        migrations.AddField(
            model_name='joblisting',
            name='url',
            field=models.CharField(default='', max_length=255),
        ),
    ]