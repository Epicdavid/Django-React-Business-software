from django.shortcuts import render
from django.views.generic.base import TemplateView
from allauth.account.signals import email_confirmed
from django.dispatch import receiver
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated,AllowAny
from django.views.decorators.csrf import csrf_exempt

from allauth.account.utils import send_email_confirmation
from rest_framework.decorators import api_view, APIView
from .models import * 
from . import serializers
import json
from rest_framework.authentication import TokenAuthentication
from rest_framework import status
from rest_framework.response import Response

from allauth.account.models import EmailConfirmation, EmailConfirmationHMAC
from django.contrib.auth import get_user_model
from django.utils.translation import ugettext_lazy as _
from rest_auth.registration.serializers import VerifyEmailSerializer
from rest_framework import status
from rest_framework.response import Response




# Create your views here.
@api_view()
def django_rest_auth_null():
    return Response(status=status.HTTP_400_BAD_REQUEST)

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

@csrf_exempt
def validateEmailToken(request):
    d = json.loads(request.body)
    data = d['body']
    print(data['token'])
    token = data['token']
    res = {
        'status': 'success',
        'message': 'Valid',
    }
    
    if User.objects.filter(email_verified_hash=token, email_verified=0).exists():
        tokenExists = User.objects.get(email_verified_hash=token, email_verified=0)

        tokenExists.email_verified = 1
        tokenExists.save()

    else:
        res = {
            'status': 'failed',
            'message': 'Invalid',
        }
    
    return JsonResponse(res) 


class VerifyEmailView(APIView):

    def get_serializer(self, *args, **kwargs):
        return VerifyEmailSerializer(*args, **kwargs)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        print(self.kwargs)
        self.kwargs['key'] = serializer.validated_data['key']
        try:
            confirmation = self.get_object()
            confirmation.confirm(self.request)
            return Response({'detail': _('Successfully confirmed email.')}, status=status.HTTP_200_OK)
        except EmailConfirmation.DoesNotExist:
            return Response({'detail': _('Error. Incorrect key.')}, status=status.HTTP_404_NOT_FOUND)

    def get_object(self, queryset=None):
        key = self.kwargs['key']
        emailconfirmation = EmailConfirmationHMAC.from_key(key)
        if not emailconfirmation:
            if queryset is None:
                queryset = self.get_queryset()
            try:
                emailconfirmation = queryset.get(key=key.lower())
            except EmailConfirmation.DoesNotExist:
                raise EmailConfirmation.DoesNotExist
        return emailconfirmation

    def get_queryset(self):
        qs = EmailConfirmation.objects.all_valid()
        qs = qs.select_related("email_address__user")
        return qs    