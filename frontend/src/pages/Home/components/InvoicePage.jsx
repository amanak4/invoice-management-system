import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Card, CardContent } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";
import PaginationComponent from "../../../components/Pagination/Pagination";
import { base_url } from "../../../base_url";
const InvoicesPage = ({ invoices, onRefresh ,handleDelete,setInvoices}) => {
  const siteName = "InvoicePro";
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); 

const navigateTo = useNavigate();
  return (
    <div>
      {/* Main Content */}
      <div style={{ padding: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <Typography variant="h5" gutterBottom>
            Invoices
          </Typography>
          <IconButton color="primary" onClick={onRefresh}>
            <RefreshIcon />
          </IconButton>
        </div>

        {/* Cards */}
        <div style={{ display: "grid", gap: "20px", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
          {invoices.map((invoice, index) => (
            <Card key={index} style={{ borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Invoice Number: <strong>{invoice.invoice_number}</strong>
                </Typography>
                <Typography>Customer: {invoice.customer_name}</Typography>
                <Typography>Date:  {new Date(invoice.date).toLocaleDateString()}</Typography>
                <Typography>Total: ${invoice.total_amount}</Typography>
                <div style={{ marginTop: "10px", display: "flex", justifyContent: "space-between" }}>
                  <Button variant="text" color="error" onClick={() => handleDelete(invoice._id)}>
                    <DeleteIcon />
                  </Button>
                  <Button variant="text" color="primary" onClick={() => navigateTo(`/edit-invoice/${invoice._id}`)}>
                    <EditIcon />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
       <PaginationComponent baseUrl={base_url} setInvoices={setInvoices} page={page} setPage={setPage} totalPages={totalPages} setTotalPages={setTotalPages} />
    </div>
  );
};

export default InvoicesPage;
