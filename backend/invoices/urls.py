from django.urls import path
from .views import get_invoice_by_id

urlpatterns = [
    path('<str:id>/', get_invoice_by_id, name='get_invoice_by_id'),
]
