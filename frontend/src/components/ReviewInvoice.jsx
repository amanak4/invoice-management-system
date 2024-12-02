import React from "react";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const ReviewInvoice = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const invoiceData = location.state;

  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-2xl font-bold mb-6">Review Invoice</h1>
      <TableContainer component={Paper} className="w-full mb-6">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Field</strong></TableCell>
              <TableCell><strong>Value</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Invoice Number</TableCell>
              <TableCell>{invoiceData.invoice_number}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Customer Name</TableCell>
              <TableCell>{invoiceData.customer_name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>{invoiceData.date}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <h2 className="text-xl font-semibold mb-4">Line Items</h2>
      <TableContainer component={Paper} className="w-full">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Description</strong></TableCell>
              <TableCell><strong>Quantity</strong></TableCell>
              <TableCell><strong>Unit Price</strong></TableCell>
              <TableCell><strong>Total</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoiceData.details.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.unit_price}</TableCell>
                <TableCell>{(item.quantity * item.unit_price).toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="flex justify-between mt-8 w-full">
        <Button variant="outlined" onClick={() => navigate(-1, { state: invoiceData })}>Back</Button>
        <Button variant="contained" color="primary" onClick={() => navigate("/submit", { state: invoiceData })}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default ReviewInvoice;
