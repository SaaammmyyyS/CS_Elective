# Generated by Django 5.0.1 on 2024-04-09 08:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('jobscraper', '0004_joblisting'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='joblisting',
            name='user',
        ),
    ]