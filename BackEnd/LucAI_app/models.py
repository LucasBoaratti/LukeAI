from django.db import models

class TextoGenerativo(models.Model):
    prompt = models.TextField()
    resposta = models.TextField(blank=True)
    data_criacao = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.prompt