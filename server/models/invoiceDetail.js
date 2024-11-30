const mongoose = require('mongoose');

const InvoiceDetailSchema = new mongoose.Schema({
    invoice: { type: mongoose.Schema.Types.ObjectId, ref: 'Invoice', required: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    unit_price: { type: Number, required: true },
    line_total: { type: Number, required: true }
});

module.exports = mongoose.model('InvoiceDetail', InvoiceDetailSchema);
