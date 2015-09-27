from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
    # Examples:
    # url(r'^$', 'babyancestry.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    
    url(r'^', include('ancestry.urls', namespace="ancestry")),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^feedback/$', 'ancestry.views.feedback', name='feedback'),
]
