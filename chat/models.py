from django.db import models

class Mensagem(models.Model):

    # Armazena mensagem enviada
    texto = models.TextField() 
    
    # Armazenar qual usuário a enviou (A ou B).
    USUARIO_CHOICES = [
        ('A', 'Usuário A'),
        ('B', 'Usuário B'),
    ]
    usuario = models.CharField(
        max_length=1, 
        choices=USUARIO_CHOICES
    )
    
    # Variavel com a mensagem que o bot respondera
    resposta_chatbot = models.TextField() 

    # Controle de quando foi adicionado 
    data_envio = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Mensagem de {self.get_usuario_display()} em {self.data_envio.strftime('%Y-%m-%d %H:%M')}"

    class Meta:
        ordering = ['data_envio']