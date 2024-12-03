from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import InvoiceDetail
from .serializers import InvoiceDetailSerializer

@api_view(['GET'])
def get_invoice_by_id(request, id):
    try:
        # Fetch all details for the given invoice ID
        invoice_details = InvoiceDetail.objects.filter(invoice=id)

        if not invoice_details.exists():
            return Response({'error': 'Invoice not found.'}, status=404)

        # Format the response
        data = {
            'invoice_number': id,
            'customer_name': 'John Doe',  # Example static data
            'date': '2024-12-03',        # Example static data
            'details': InvoiceDetailSerializer(invoice_details, many=True).data,
        }
        return Response(data, status=200)

    except Exception as e:
        return Response({'error': str(e)}, status=500)
