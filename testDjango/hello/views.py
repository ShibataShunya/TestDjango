from typing import Any
from django.shortcuts import render
from django.http import HttpRequest, HttpResponse
from django.views.generic import TemplateView
from .models import Friend
# from .forms import HelloForm
# from .forms import Sessionform

class HelloView(TemplateView):
    def __init__(self):
        data = Friend.objects.all()
        self.params = {
            "title": '初期だうぃっす！',
            "message": 'どるうぇえ！',
            "data" : data,
        }

    def get(self, request: HttpRequest):
        return render(request, 'hello/index.html', self.params)