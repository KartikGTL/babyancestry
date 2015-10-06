from django.conf.urls import include, url
from django.contrib import admin
from django.views.generic.base import RedirectView

urlpatterns = [
    # Examples:
    # url(r'^$', 'babyancestry.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    
    url(r'^', include('ancestry.urls', namespace="ancestry")),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^feedback/$', 'ancestry.views.feedback', name='feedback'),

    # Familysearch redirects here in the little popup window. Show something
    # rather than just a 400 error
    url(r'^fs/callback/$', RedirectView.as_view(url='/static/app/img/elephant.png', permanent=False)),
]
