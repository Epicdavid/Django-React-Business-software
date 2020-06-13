import string
import random
from django.db import models
from django.contrib.auth.models import AbstractUser
from datetime import timedelta
from dateutil.relativedelta import relativedelta
from datetime import datetime
from simple_history.models import HistoricalRecords



# Create your models here.

class User(AbstractUser):
    is_student = models.BooleanField()
    btc_wallet = models.CharField(max_length=300)
    date_joined = models.DateTimeField(auto_now_add=True)
    urlhash = models.CharField(max_length=14, null=True, blank=True, unique=True)
    account_balance = models.DecimalField(max_digits=15, decimal_places=0, default=0,)
    active_affiliates = models.CharField(max_length=200, blank=True, null=True)
    active_package = models.CharField(max_length=300,blank=True, null=True)
    
    def __str__(self):
        return self.username

    def monthjoined(self):
        return self.date_joined.strftime('%Y')
    
   
    def id_generator(size=14, chars=string.ascii_uppercase + string.digits):
        return ''.join(random.choice(chars) for _ in range(size))

    def save(self,*args, **kwargs):
        if not self.urlhash:
            # Generate ID once, then check the db. If exists, keep trying.
            self.urlhash = User.id_generator()
            while User.objects.filter(urlhash=self.urlhash).exists():
                self.urlhash = User.id_generator()
        super().save(*args, **kwargs)
        

class Product(models.Model):
    STATUS = (
        ('Pending', 'Pending'),
        ('Active', 'Active'),
        ('Completed', 'Completed')
    )
    user = models.ForeignKey(User, related_name="plans",on_delete=models.CASCADE, blank=True, null=True)
    name = models.CharField(max_length=200, blank=False)
    Price = models.FloatField(max_length=200)
    Description = models.TextField(blank=True, null=True)
    ROI = models.CharField(max_length=50, blank=False)
    Duration = models.IntegerField(default=0)
    status = models.CharField(max_length=200, choices=STATUS)
    
    def __str__(self):
        return self.name



class Order(models.Model):
    STATUS = (
        ('Pending', 'Pending'),
        ('Approved', 'Approved'),
    )
    customer = models.ForeignKey(User, related_name='orders',on_delete=models.SET_NULL, null=True)
    product = models.ForeignKey(Product,related_name='orders', on_delete=models.SET_NULL,null=True)
    status = models.CharField(max_length=200, choices=STATUS)
    amount = models.DecimalField(max_digits=15, decimal_places=2,default=0.00)
    date_ordered = models.DateTimeField(auto_now_add=True)
    expires = datetime.today()+ relativedelta(months=10)

    
    def __str__(self):
        return self.product.name


    def save(self,*args, **kwargs):

        if  self.status == "Approved":
            try:
                print(self.amount)
                acc = User.objects.get(username=self.customer) 
                acc.account_balance += self.amount
                acc.save()
            except Exception as e:
                print (e)
        super().save(*args, **kwargs)
        


class Stats(models.Model):
    user = models.ForeignKey(User, related_name="stats", on_delete=models.CASCADE)
    newprofit = models.DecimalField(max_digits=15, decimal_places=0, default=0)
    storage = models.DecimalField(max_digits=15, decimal_places=0, default=0)
    allStorage = models.DecimalField(max_digits=15, decimal_places=0, default=0)
    referral_earning = models.DecimalField(max_digits=15, decimal_places=2, default=0)
    new_refEarning = models.DecimalField(max_digits=15, decimal_places=2, default=0)
    history = HistoricalRecords()
    

    
    def __str__(self):
        return self.user.username

    def save(self,*args, **kwargs):
        self.storage += self.newprofit 
        self.allStorage += self.newprofit + self.new_refEarning
        self.referral_earning += self.new_refEarning
        self.newprofit = 0
        self.new_refEarning =  0
        
        super().save(*args, **kwargs)    

    

