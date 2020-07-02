from django.contrib import admin
from django.urls import path, include, re_path
from allauth.account.views import confirm_email
from users.views import EmailView,EmailConfirmation,django_rest_auth_null,validateEmailToken
from dj_rest_auth.registration.views import VerifyEmailView, RegisterView
from django.views.generic import TemplateView


urlpatterns = [
    
    path('api-auth/', include('rest_framework.urls')),
    path('sendconfirmationemail/', EmailConfirmation.as_view(), name='send-email-confirmation'),
    path('mail/', EmailView.as_view()),
    path('registration/verify-email/', VerifyEmailView.as_view(), name='rest_verify_email'),
    path('verify/', validateEmailToken),
    re_path(r'^dj-rest-auth/', include('dj_rest_auth.urls')),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),
    path('api/', include('users.api.urls')),
    path('listApi/',include('users.api.order.urls')),
    re_path(r'^account-confirm-email/', VerifyEmailView.as_view(),
     name='account_email_verification_sent'),
    path('admin/', admin.site.urls),
    re_path(r"^referrals/", include("pinax.referrals.urls", namespace="pinax_referrals")),
    #re_path(r'^.*', TemplateView.as_view(template_name='index.html')),
]
