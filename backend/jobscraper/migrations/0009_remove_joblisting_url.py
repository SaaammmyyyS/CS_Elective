# Generated by Django 5.0.1 on 2024-04-09 09:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('jobscraper', '0008_alter_joblisting_url'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='joblisting',
            name='url',
        ),
    ]