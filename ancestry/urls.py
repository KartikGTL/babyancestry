from django.conf.urls import *

urlpatterns = patterns(
    'ancestry.views',
    url(r'^$', 'home', name='home'),
)
