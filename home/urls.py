from django.contrib import admin
from django.urls import path, include, re_path
from allauth.account.views import confirm_email
from users.views import EmailView,EmailConfirmation
from rest_auth.registration.views import VerifyEmailView, RegisterView



urlpatterns = [
    
    path('api-auth/', include('rest_framework.urls')),
    path('sendconfirmationemail/', EmailConfirmation.as_view(), name='send-email-confirmation'),
    path('mail/', EmailView.as_view()),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('api/', include('users.api.urls')),
    path('listApi/',include('users.api.order.urls')),
    re_path(r'^account-confirm-email/(?P<key>[-:\w]+)/$', VerifyEmailView.as_view(),
     name='account_confirm_email'),
    re_path(r'^account-confirm-email/', VerifyEmailView.as_view(),
     name='account_email_verification_sent'),
    path('admin/', admin.site.urls),
    re_path(r"^referrals/", include("pinax.referrals.urls", namespace="pinax_referrals")),
    re_path(r'^.*', TemplateView.as_view(template_name='index.html')),
]
