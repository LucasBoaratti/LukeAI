from django.urls import path
from .views import TextoGenerativoLCAPIView, DeleteTextoGenerativo

urlpatterns = [
    path("prompt", view=TextoGenerativoLCAPIView.as_view(), name="Prompt do usuário."),
    path("apagarMensagens", view=DeleteTextoGenerativo.as_view(), name="Apagar todas as mensagens."),
]