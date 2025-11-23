from django.urls import path
from .views import ChatMessageListCreateView

urlpatterns = [
    path('mensagens/', ChatMessageListCreateView.as_view(), name='chat-list-create'),
]