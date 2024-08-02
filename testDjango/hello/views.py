from typing import Any
from django.shortcuts import render
from django.http import HttpRequest, HttpResponse
from django.views.generic import TemplateView
from .forms import HelloForm
from .forms import Sessionform

class HelloView(TemplateView):
    def __init__(self):
        self.params = {
            "title": '初期だうぃっす！',
            "message": 'どるうぇえ！',
            "form": HelloForm(),
            "sessionForm": Sessionform(),
            "result": None,
        }

    def get(self, request: HttpRequest):
        self.params["result"] = request.session.get("last_msg", "なんもないよ");
        return render(request, 'hello/index.html', self.params)
    
    def post(self, request: HttpRequest):
        ses = request.POST["session"]
        self.params["result"] = "これおくった？" + ses
        self.params["last_msg"] = ses
        msg = 'お前さんは' + request.POST['name'] + \
              '<br> 幾つかというと' + request.POST['age'] + \
              '<br> じゃろ？' + request.POST['mail']
        self.params["message"]  = msg
        # self.params["form"] = HelloForm(request.POST)
        return render(request, 'hello/index.html', self.params)