from django.urls  import path
from .views import HelloView
from .views import FriendList
from .views import FriendDetail

urlpatterns = [
    path('', HelloView.as_view(), name = 'index'),
    path("list", FriendList.as_view()),
    path("detail/<int:pk>", FriendDetail.as_view()),
]