import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { InvoiceProvider } from './context/InvoiceContext';
import Home from './pages/Home';
import EditInvoice from './pages/EditInvoice';
import ReviewInvoice from './components/ReviewInvoice';
import SubmitInvoice from './components/SubmitInvoice';
import Navbar from './components/Navbar/Navbar';

const App = () => {
    return (
        <InvoiceProvider>
            <Router>
                <Toaster  position="bottom-right" />
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/add-invoice" element={<EditInvoice />} />
                    <Route path="/edit-invoice/:id" element={<EditInvoice />} />
                    <Route path="/review" element={<ReviewInvoice />} />
                    <Route path="/submit" element={<SubmitInvoice />} />
                </Routes>
            </Router>
        </InvoiceProvider>
    );
};

export default App;
