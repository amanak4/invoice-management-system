from django.db import models

class InvoiceDetail(models.Model):
    invoice = models.CharField(max_length=255)  # Invoice ID (string)
    description = models.CharField(max_length=255)
    quantity = models.IntegerField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    line_total = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Invoice {self.invoice} - {self.description}"
