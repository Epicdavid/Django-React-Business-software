'''Use this for development'''

from .base import *
from .privatekeys import *

ALLOWED_HOSTS += ['127.0.0.1','localhost:8000','localhost:3000']
DEBUG = True
SITE_ID = 2
WSGI_APPLICATION = 'home.wsgi.dev.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

CORS_ORIGIN_WHITELIST = (
    'http://localhost:3000','http://127.0.0.1:3000','http://localhost:3001'
)

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
EMAIL_HOST = config(EMAIL_HOST)
EMAIL_PORT = config(EMAIL_PORT)
EMAIL_USE_TLS = config(EMAIL_USE_TLS)
EMAIL_HOST_USER = config(EMAIL_HOST_USER)
EMAIL_HOST_PASSWORD = config(EMAIL_HOST_PASSWORD)
DEFAULT_FROM_EMAIL = config(EMAIL_HOST_USER)