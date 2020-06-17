from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('api/', include('users.api.urls')),
    path('listApi/',include('users.api.order.urls')),
    path('admin/', admin.site.urls),
    path(r"^referrals/", include("pinax.referrals.urls", namespace="pinax_referrals")),
    #re_path(r'^.*', TemplateView.as_view(template_name='index.html')),
]
