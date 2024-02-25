from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
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