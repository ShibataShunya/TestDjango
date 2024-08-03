from typing import Any
from django.shortcuts import render
from django.http import HttpRequest, HttpResponse
from django.views.generic import TemplateView
from .models import Friend
from django.views.generic import ListView
from django.views.generic import DetailView
# from .forms import HelloForm
# from .forms import Sessionform
from .forms import FriendForm
from .forms import FindForm

class HelloView(TemplateView):
    def __init__(self):
        data = Friend.objects.all()
        self.params = {
            "title": '初期だうぃっす！',
            "message": 'どるうぇえ！',
            "form" : FriendForm(),
            "data" : data,
            "findForm": FindForm(),
        }

    def get(self, request: HttpRequest):
        return render(request, 'hello/index.html', self.params)
    
    def post(self, request: HttpRequest):
        obj = Friend()
        friend = FriendForm(request.POST , instance=obj)
        if friend.is_valid():
            friend.save()
        return render(request, 'hello/index.html', self.params)
    
class FriendList(ListView):
    model = Friend

class FriendDetail(DetailView):
    model = Friend

def find(request):
    if request.method == 'POST':
        findform = FindForm(request.POST)
        find = request.POST.get('find', '')  # エラーハンドリング
        data = Friend.objects.filter(name=find)
    else:
        findform = FindForm()
        data = Friend.objects.all()

    params = {
        "title": '初期だうぃっす！',
        "message": 'どるうぇえ！',
        "form": FriendForm(),
        "data": data,
        "findForm": findform,
    }
    return render(request, 'hello/index.html', params)