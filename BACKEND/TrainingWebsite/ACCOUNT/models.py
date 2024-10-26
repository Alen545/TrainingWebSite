from django.db import models
from django.contrib.auth.models import AbstractUser

class USER(AbstractUser):
    qualification = models.CharField(max_length=15, null=True, blank=True)
    phone = models.CharField(max_length=15, null=True, blank=True)  
    passout_year = models.IntegerField(null=True, blank=True)
    gender = models.CharField(
        max_length=10,
        choices=(('male', 'Male'), ('female', 'Female'), ('other', 'Other')),
        null=True,
        blank=True
    )
    profile_img = models.ImageField(upload_to='profileImages/', null=True, blank=True)
