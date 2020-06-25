'''Use this for development'''

from .base import *

ALLOWED_HOSTS += ['127.0.0.1','localhost:8000', 'dippace.com']
DEBUG = True
SITE_ID = 3
WSGI_APPLICATION = 'home.wsgi.dev.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

CORS_ORIGIN_WHITELIST = (
    'http://localhost:3000',
)

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'mail.dippace.com'
EMAIL_PORT = 26
EMAIL_USE_TLS = False
EMAIL_HOST_USER = 'care@dippace.com'
EMAIL_HOST_PASSWORD = 'Hernandez14!?'


DEFAULT_FROM_EMAIL = EMAIL_HOST_USER