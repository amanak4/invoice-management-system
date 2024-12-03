from rest_framework import serializers
from .models import InvoiceDetail

class InvoiceDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = InvoiceDetail
        fields = ['invoice', 'description', 'quantity', 'unit_price', 'line_total']
