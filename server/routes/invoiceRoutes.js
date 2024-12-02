const express = require('express');
const {
    createInvoice,
    getInvoices,
    deleteInvoice,
    getIDInvoice,
    updateInvoice,
    checkInvoiceNumber
} = require('../controllers/invoiceController');

const router = express.Router();

router.get('/', getInvoices);
router.get('/:id', getIDInvoice);
router.post('/checkInvoiceNumber',checkInvoiceNumber);
router.post('/', createInvoice);
router.put('/:id',updateInvoice);
router.delete('/:id', deleteInvoice);

module.exports = router;
