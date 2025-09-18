from django.urls import path
from .views import TextoGenerativoLCAPIView

urlpatterns = [
    path("prompt", view=TextoGenerativoLCAPIView.as_view(), name="Prompt do usuário."),
]