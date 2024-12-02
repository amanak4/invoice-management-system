const Invoice = require('../models/invoice');
const InvoiceDetail = require('../models/invoiceDetail');

// Create or Update Invoice
exports.createInvoice = async (req, res) => {
    try {
        const { invoice_number, customer_name, date, details } = req.body;

           //invoice_no. should be unique
           const lowerCaseInvoiceNumber = invoice_number.toLowerCase();
        const existingInvoice = await Invoice.findOne({ invoice_number: lowerCaseInvoiceNumber });
        if (existingInvoice) {
            return res.status(400).json({ error: "Invoice number already exists." });
        }

        if (!details || !details.length) {
            return res.status(400).json({ error: "Invoice must have at least one detail." });
        }

        // Compute total amount and line totals
        let totalAmount = 0;
        const invoiceDetails = details.map(detail => {
            const lineTotal = detail.quantity * detail.unit_price;
            totalAmount += lineTotal;
            return {
                description: detail.description,
                quantity: detail.quantity,
                unit_price: detail.unit_price,
                line_total: lineTotal
            };
        });

        // Find or create invoice
        let invoice = await Invoice.findOneAndUpdate(
            { invoice_number },
            { customer_name, date, total_amount: totalAmount },
            { new: true, upsert: true }
        );

        // Clear old details if updating
        await InvoiceDetail.deleteMany({ invoice: invoice._id });

        // Save new details
        for (let detail of invoiceDetails) {
            await InvoiceDetail.create({ ...detail, invoice: invoice._id });
        }

        res.status(201).json({ message: "Invoice saved successfully.", invoice });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Invoice with id
exports.getIDInvoice = async (req, res) => {
    try {
      const { id } = req.params; // Extract invoice ID from params
  
      // Validate the provided ID
    //   if (!mongoose.Types.ObjectId.isValid(id)) {
    //     return res.status(400).json({ error: "Invalid Invoice ID." });
    //   }
  
      // Retrieve invoice header data
      const invoiceHeader = await Invoice.findById(id);
      if (!invoiceHeader) {
        return res.status(404).json({ error: "Invoice not found." });
      }
  
      // Retrieve all line items for the given invoice ID
      const invoiceDetails = await InvoiceDetail.find({ invoice: id });
  
      // Format response data
      const formattedResponse = {
        invoice_number: invoiceHeader.invoice_number || "",
        customer_name: invoiceHeader.customer_name || "",
        date: invoiceHeader.date || "",
        details: invoiceDetails.map((detail) => ({
          description: detail.description,
          quantity: detail.quantity,
          unit_price: detail.unit_price,
          line_total: detail.line_total,
        })),
      };
  
      // Respond with formatted data
      res.status(200).json({data:formattedResponse});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


// Get Invoices with Pagination
exports.getInvoices = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const invoices = await Invoice.find()
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .sort({ date: -1 });
        const total = await Invoice.countDocuments();

        res.status(200).json({ total, page: parseInt(page), invoices });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//update invoice
exports.updateInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        const { invoice_number, customer_name, date, details } = req.body;

        const lowerCaseInvoiceNumber = invoice_number.toLowerCase();
        const existingInvoice = await Invoice.findOne({ invoice_number: lowerCaseInvoiceNumber });
        if (existingInvoice) {
            return res.status(400).json({ error: "Invoice number already exists." });
        }

        if (!details || !details.length) {
            return res.status(400).json({ error: "Invoice must have at least one detail." });
        }

        // Compute total amount and line totals
        let totalAmount = 0;
        const invoiceDetails = details.map(detail => {
            const lineTotal = detail.quantity * detail.unit_price;
            totalAmount += lineTotal;
            return {
                description: detail.description,
                quantity: detail.quantity,
                unit_price: detail.unit_price,
                line_total: lineTotal
            };
        });

        // Find or create invoice
        let invoice = await Invoice.findOneAndUpdate(
            { invoice_number },
            { customer_name, date, total_amount: totalAmount },
            { new: true, upsert: true }
        );

        // Clear old details if updating    
        await InvoiceDetail.deleteMany({ invoice: invoice._id });

        // Save new details
        for (let detail of invoiceDetails) {
            await InvoiceDetail.create({ ...detail, invoice: invoice._id });
        }

        res.status(201).json({ message: "Invoice updated successfully.", invoice });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete Invoice
exports.deleteInvoice = async (req, res) => {
    try {
        const { id } = req.params;

        await InvoiceDetail.deleteMany({ invoice: id });
        await Invoice.findByIdAndDelete(id);

        res.status(200).json({ message: "Invoice deleted successfully." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.checkInvoiceNumber = async (req, res) => {
    try {
        const { invoice_number } = req.body;
        const lowerCaseInvoiceNumber = invoice_number.toLowerCase();
        const existingInvoice = await Invoice.findOne({ invoice_number: lowerCaseInvoiceNumber });
        if (existingInvoice) {
            return res.status(400).json({ error: "Invoice number already exists." });
        }
        res.status(200).json({ message: "Invoice number is unique." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};