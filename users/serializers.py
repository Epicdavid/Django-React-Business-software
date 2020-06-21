from rest_framework import serializers
from rest_auth.registration.serializers import RegisterSerializer
from rest_auth.serializers import LoginSerializer
from .models import *
from allauth.account.adapter import get_adapter
from rest_framework.authtoken.models import Token
from pinax.referrals.models import Referral
from datetime import datetime
from allauth.account.views import SignupView



class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = '__all__'

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'        



class SignupSerializer(RegisterSerializer):
    btc_wallet = serializers.CharField(max_length=300)    

    class Meta:
        model = User
        fields = ('email','username','password','btc_wallet','user') 


    def get_cleaned_data(self):
        return {
            'username': self.validated_data.get('username', ''),
            'password1': self.validated_data.get('password1', ''),
            'password2': self.validated_data.get('password2', ''),
            'btc_wallet': self.validated_data.get('btc_wallet', ''),
            'email': self.validated_data.get('email', '')
        }



    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        user.is_student = True  
        adapter.save_user(request, user, self)
        return user

    def after_signup():
        action = Referral.record_response(self.request, "USER_SIGNUP")
        makp = action.referral.id
        super(SignupView,self).after_signup()
        if action is not None:
            referral = Referral.objects.get(id=action.referral.id)
            profile = Profile.objects.get(user=self.created_user)
            profile.parent = Profile.objects.get(user=referral.user)
            profile.save()


class TokenSerializer(serializers.ModelSerializer):
    user_detail = serializers.SerializerMethodField()
   
    
    class Meta:
        model= Token 
        fields = ('key','user','user_detail')

    def get_user_detail(self, obj):
        serializer_data = UserSerializer(obj.user).data
        usern =  serializer_data.get('username')
        user = User.objects.get(username=usern)
        ref = user.profile.referral.url
        if user.profile.referredBy is not None:
            reff = user.profile.referredBy
            referral = reff.username
        else:
            referral = ""
        is_student = serializer_data.get('is_student')
        is_staff = serializer_data.get('is_staff')
        username = serializer_data.get('username')
        btc_wallet = serializer_data.get('btc_wallet')
        time = serializer_data.get('date_joined')
        date = datetime.strptime(time, '%Y-%m-%dT%H:%M:%S.%fZ').strftime('%B')
        urlhash = serializer_data.get('urlhash')
        balance = serializer_data.get('account_balance')
        last = serializer_data.get('last_login')
        last_login = datetime.strptime(last, '%Y-%m-%dT%H:%M:%S.%fZ').strftime('%I:%M%p on %d %B %Y')
        
        
        return{
            'is_client': is_student,
            'is_staff': is_staff,
            'username': username,
            'btc_wallet': btc_wallet,
            'monthjoined': date,
            'hash': urlhash,
            'balance': balance,
            'last_login': last_login,
            'Link':ref,
            "referral": referral
            
        }

    