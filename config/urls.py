from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
    # Examples:
    # url(r'^$', 'babyancestry.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    
    # url(r'^', include('home.urls', namespace="home")),
    url(r'^', include('accounts.urls', namespace="accounts")),
    url(r'^admin/', include(admin.site.urls)),
]
