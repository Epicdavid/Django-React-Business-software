from django.contrib import admin
from django.urls import path, include, re_path
from allauth.account.views import confirm_email
from users.views import *
from rest_auth.registration.views import VerifyEmailView, RegisterView 
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import RedirectView

urlpatterns = [
    
    path('api-auth/', include('rest_framework.urls')),
    path('sendconfirmationemail/', EmailConfirmation.as_view(), name='send-email-confirmation'),
    path('mail/', EmailView.as_view()),
    path('registration/verify-email/', VerifyEmailView.as_view(), name='rest_verify_email'),
    path('verify/', validateEmailToken),
    re_path(r'update-profile/(?P<pk>\d+)/', UserPartialUpdateView.as_view(), name="updateProfile"),
    re_path(r'^rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('api/', include('users.api.urls')),
    re_path(r'password-reset/confirm/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/',
        TemplateView.as_view(template_name="password_reset_confirm.html"),
        name='password_reset_confirm'),
    path('listApi/',include('users.api.order.urls')),
    path('resend-verification-email/', NewEmailConfirmation.as_view(), name='resend-email-confirmation'),
    path('password/reset/', PasswordResetView.as_view(),
        name='rest_password_reset'),
    re_path(r'^account-confirm-email/', VerifyEmailView.as_view(),
     name='account_email_verification_sent'),
    path('admin/', admin.site.urls),
    re_path(r"^referrals/", include("pinax.referrals.urls", namespace="pinax_referrals")),
    re_path(r'^.*', TemplateView.as_view(template_name='indeEx.html')),
    re_path(r'^./user/*', TemplateView.as_view(template_name='user.html')),
    path('black-dashboard-react/static/media/', RedirectView.as_view(url='/user/static/media/')),
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
