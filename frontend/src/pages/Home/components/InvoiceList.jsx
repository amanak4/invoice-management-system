import React, { useEffect } from 'react';
import { useInvoiceContext } from '../../../context/InvoiceContext';
import { CircularProgress } from '@mui/material';
import { toast } from 'react-hot-toast';
import InvoicesPage from './InvoicePage';

const InvoiceList = () => {
    const { invoices, fetchInvoices, deleteInvoice, loading, setInvoices } = useInvoiceContext();

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
            }});
        }
    };

    const refreshfxn = () => {
        fetchInvoices();
        toast.success("Invoices refreshed successfully!",{style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
        }})
    };
    if (loading) {
        return <CircularProgress />;
    }

    return (
        <InvoicesPage invoices={invoices} onRefresh={refreshfxn}  handleDelete={handleDelete} setInvoices={setInvoices}/>
    );
};

export default InvoiceList;
