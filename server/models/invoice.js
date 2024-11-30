const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
    invoice_number: { type: String, required: true, unique: true },
    customer_name: { type: String, required: true },
    date: { type: Date, required: true },
    total_amount: { type: Number, default: 0 }
});

module.exports = mongoose.model('Invoice', InvoiceSchema);
