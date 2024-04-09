from django.db import models
from django.contrib.auth.models import AbstractUser

from CS_Elective import settings

class User(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('manager', 'Manager'),
    )

    name = models.CharField(max_length=255)
    role = models.CharField(max_length=255, choices=ROLE_CHOICES, default='admin')
    email = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255, unique=True)
    username = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

class JobListing(models.Model):
    STATUS_CHOICES = (
        ('open', 'Open'),
        ('applied', 'Applied'),
        ('archived', 'Archived'),
    )

    title = models.CharField(max_length=255)
    company = models.CharField(max_length=255)
    url = models.CharField(max_length=255, default='')
    # description = models.TextField()
    # date_posted = models.DateField()
    # user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='open')
