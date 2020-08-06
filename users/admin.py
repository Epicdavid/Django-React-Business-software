from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(User)
admin.site.register(Product)
admin.site.register(Order)
admin.site.register(Stat)
admin.site.register(Profile)
admin.site.register(CompletedKit)
admin.site.register(Withdraw)
admin.site.register(Compound)