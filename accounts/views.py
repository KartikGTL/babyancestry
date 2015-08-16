from django.conf import settings

from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect, HttpResponse, Http404
from django.core.urlresolvers import reverse


def home(request):
    """
    This is the base page for our Single Page Application that uses AngularJS
    in the client to query ancestors and manipulate the DOM... 
    """
   
    return render(request, 'accounts/home.html')
