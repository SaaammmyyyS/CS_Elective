# Generated by Django 5.0.1 on 2024-05-05 00:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobscraper', '0013_alter_joblisting_url'),
    ]

    operations = [
        migrations.AddField(
            model_name='joblisting',
            name='data_from',
            field=models.CharField(default='', max_length=255),
        ),
    ]