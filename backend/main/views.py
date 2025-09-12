from django.shortcuts import render
from django.http import HttpResponse, Http404

def home(request):
    return HttpResponse('This is the HOME PAGE')