from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class User(AbstractUser):
    is_student = models.BooleanField()
    btc_wallet = models.CharField(max_length=300)

    def __str__(self):
        return self.username

class client(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    active_package = models.CharField(max_length=300,blank=True, null=True)
    capital = models.CharField(max_length=300, blank=True, null=True)
    profits = models.CharField(max_length=300, blank=True, null=True)
    balance = models.CharField(max_length=300, blank=True, null=True)
    active_affiliates = models.CharField(max_length=200, blank=True, null=True)
    referral_earning = models.CharField(max_length=300, blank=True, null=True)

    
    def __str__(self):
        return self.user.username

    

