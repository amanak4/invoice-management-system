import React, { useEffect } from 'react';
import { useInvoiceContext } from '../context/InvoiceContext';
import { CircularProgress } from '@mui/material';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import RefreshIcon from '@mui/icons-material/Refresh';

const InvoiceList = () => {
    const { invoices, fetchInvoices, deleteInvoice, loading } = useInvoiceContext();

    useEffect(() => {
        fetchInvoices();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this invoice?")) {
            await deleteInvoice(id);
            toast.success("Invoice deleted successfully!",{style: {
      borderRadius: '10px',
      background: '#333',
      color: '#fff',
    },});
        }
    };

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
           <div className="flex items-center gap-4">
           <h1 className="text-2xl font-bold mb-4">Invoices</h1>
            <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                onClick={fetchInvoices}
            >
                <RefreshIcon color="inherit" size={20} />
            </button>

           </div>
           <a href="/add-invoice" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                Create Invoice
            </a>
            </div>
           {invoices?  <div className="grid gap-4">
                {invoices.map((invoice) => (
                    <motion.div
                        key={invoice._id}
                        className="p-4 border rounded-lg shadow-md"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <p><strong>Invoice Number:</strong> {invoice.invoice_number}</p>
                        <p><strong>Customer:</strong> {invoice.customer_name}</p>
                        <p><strong>Date:</strong> {new Date(invoice.date).toLocaleDateString()}</p>
                        <p><strong>Total:</strong> ${invoice.total_amount}</p>
                        <div>
                        <button
                            className="text-red-500 mt-2"
                            onClick={() => handleDelete(invoice._id)}
                        >
                            Delete
                        </button>
                        <a href={`/edit-invoice/${invoice._id}`} className="text-blue-500 ml-2">
                            Edit    
                        </a>
                        </div>

                    </motion.div>
                ))}
            </div>: <p>No invoices found.</p>}
        </div>
    );
};

export default InvoiceList;
