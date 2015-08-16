from django.conf.urls import *

urlpatterns = patterns(
    'accounts.views',
    url(r'^$', 'home', name='home'),
)
