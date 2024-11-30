import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';

const InvoiceContext = createContext();

export const useInvoiceContext = () => useContext(InvoiceContext);

export const InvoiceProvider = ({ children }) => {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchInvoices = async (page = 1) => {
        setLoading(true);
    
        try {
            const response = await axios.get(`http://localhost:3000/api/invoices?page=${page}`);
            setInvoices(response.data.invoices); // No need for `response.json()` as Axios handles JSON parsing
        } catch (error) {
            console.error("Error fetching invoices:", error);
        } finally {
            setLoading(false);
        }
    };
    const deleteInvoice = async (id) => {
        setLoading(true);
        try {
            const res=await axios.delete(`http://localhost:3000/api/invoices/${id}`);
            console.log(res);
            setInvoices((prev) => prev.filter((invoice) => invoice._id !== id));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <InvoiceContext.Provider value={{ invoices, fetchInvoices, deleteInvoice, loading }}>
            {children}
        </InvoiceContext.Provider>
    );
};
