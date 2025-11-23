from django.shortcuts import render
from rest_framework import generics
from .models import Mensagem
from .serializers import MensagemSerializer

class ChatMessageListCreateView(generics.ListCreateAPIView):
    
    serializer_class = MensagemSerializer


    def get_queryset(self):

        usuario_ativo = self.request.query_params.get('usuario', None)
        
        if usuario_ativo:

            return Mensagem.objects.filter(usuario=usuario_ativo).order_by('data_envio')
        
        return Mensagem.objects.none()

    def perform_create(self, serializer):

        usuario_ativo = serializer.validated_data.get('usuario')
        
        if usuario_ativo == 'A':
            mocked_response = "Obrigado por seu contato, Usuário A. Em breve responderemos."
        else: 
            mocked_response = "Obrigado por seu contato, Usuário B. Em breve responderemos."

        # Salva a mesnagem no banco
        serializer.save(resposta_chatbot=mocked_response)