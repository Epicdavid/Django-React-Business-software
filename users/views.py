from django.shortcuts import render
from django.views.generic.base import TemplateView
from allauth.account.signals import email_confirmed
from django.dispatch import receiver
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from allauth.account.utils import send_email_confirmation
from rest_framework.views import APIView

from . import models
from . import serializers

from rest_framework.authentication import TokenAuthentication
from rest_framework import status
from rest_framework.response import Response

# Create your views here.

class EmailView(TemplateView):

    template_name = "account/email/email_confirmation_signup_message.html"

@receiver(email_confirmed)
def email_confirmed_(request, email_address, **kwargs):
    user = email_address.user
    user.email_verified = True

    user.save()

# request a new confirmation email
class EmailConfirmation(APIView):
     

    def post(self, request):
        if request.user.email_verified:
            return Response({'message': 'Email already verified'}, status=status.HTTP_201_CREATED)

        send_email_confirmation(request, request.user)
        return Response({'message': 'Email confirmation sent'}, status=status.HTTP_201_CREATED)    