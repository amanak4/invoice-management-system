import React, { useState } from "react";
import { TextField, Button, IconButton, Grid } from "@mui/material";
import { AddCircle, RemoveCircle } from "@mui/icons-material";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const InvoiceForm = () => {
    const {id} = useParams();
    console.log("sis",id);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    invoice_number: "",
    customer_name: "",
    date: "",
    details: [
      {
        description: "",
        quantity: 1,
        unit_price: 0.0,
      },
    ],
  });

  // Handle input changes for main invoice fields

  const fetchInvoice = async () => {
    if (id) {
      try {
        const response = await axios.get(`http://localhost:3000/api/invoices/${id}`);
        console.log("Fetched Invoice Data:", response.data);
  
        // Extract the actual invoice data from the response
        const { invoice_number, customer_name, date, details } = response.data.data;
  
        // if ( !Array.isArray(details)) {
        //     throw new Error("Details data is invalid or not an array");
        //   }
        console.log("Details:", details);

          const detailsArray = Array.isArray(details)
          ? details
          : Object.keys(details).map((key) => ({
              description: details[key].description || "",
              quantity: details[key].quantity || 0,
              unit_price: details[key].unit_price || 0.0,
            }));
        // Set the data correctly in formData
        setFormData({
          invoice_number,
          customer_name,
          date:new Date(date).toISOString().split("T")[0], // Format date for input
          details: detailsArray,
        });
  
        console.log("Updated Form Data:", formData);
      } catch (error) {
        toast.error("Failed to fetch invoice data.");
        console.error("Fetch Invoice Error:", error);
      }
    }
  };
  

  React.useEffect(() => {
    fetchInvoice();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle input changes for line items
  const handleDetailChange = (index, field, value) => {
    const newDetails = [...formData.details];
    newDetails[index][field] = field === "quantity" || field === "unit_price" ? parseFloat(value) : value;
    setFormData({ ...formData, details: newDetails });
  };

  // Add a new line item
  const addLineItem = () => {
    setFormData({
      ...formData,
      details: [...formData.details, { description: "", quantity: 1, unit_price: 0.0 }],
    });
  };

  // Remove a line item
  const removeLineItem = (index) => {
    const newDetails = formData.details.filter((_, i) => i !== index);
    setFormData({ ...formData, details: newDetails });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (!formData.invoice_number || !formData.customer_name || !formData.date) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (formData.details.length === 0 || formData.details.some((item) => !item.description || item.quantity <= 0 || item.unit_price <= 0)) {
      toast.error("Please ensure all line items have valid data.");
      return;
    }

    // Submit the form (make API call)
    try {
        if (id) {
            // Update existing invoice
            await axios.put(`http://localhost:3000/api/invoices/${id}`, formData);
            toast.success("Invoice updated successfully.");
        } else {
            // Add new invoice
            await axios.post(`http://localhost:3000/api/invoices`, formData);
            toast.success("Invoice added successfully.");
        }
        navigate('/');
    } catch (error) {
        toast.error("Failed to save invoice.");
    }

   

    console.log("Submitted Data:", formData);
    // Reset the form
    setFormData({
      invoice_number: "",
      customer_name: "",
      date: "",
      details: [{ description: "", quantity: 1, unit_price: 0.0 }],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      {/* Main Invoice Fields */}
      <TextField
        label="Invoice Number"
        name="invoice_number"
        value={formData.invoice_number}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Customer Name"
        name="customer_name"
        value={formData.customer_name}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Date"
        type="date"
        name="date"
        value={formData.date}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />

      {/* Line Items Section */}
      <h3 className="text-lg font-semibold mt-4 mb-2">Line Items</h3>
      {formData.details.map((detail, index) => (
        <Grid container spacing={2} alignItems="center" key={index}>
          <Grid item xs={6} sm={4}>
            <TextField
              label="Description"
              value={detail.description}
              onChange={(e) => handleDetailChange(index, "description", e.target.value)}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={3} sm={2}>
            <TextField
              label="Quantity"
              type="number"
              value={detail.quantity}
              onChange={(e) => handleDetailChange(index, "quantity", e.target.value)}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={3} sm={2}>
            <TextField
              label="Unit Price"
              type="number"
              value={detail.unit_price}
              onChange={(e) => handleDetailChange(index, "unit_price", e.target.value)}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <IconButton
              color="error"
              onClick={() => removeLineItem(index)}
              disabled={formData.details.length === 1}
            >
              <RemoveCircle />
            </IconButton>
            <IconButton color="primary" onClick={addLineItem}>
              <AddCircle />
            </IconButton>
          </Grid>
        </Grid>
      ))}

      {/* Submit Button */}
      <Button type="submit" variant="contained" color="primary" fullWidth className="mt-4">
       {id ? "Update Invoice" : "Add Invoice"}
      </Button>
    </form>
  );
};

export default InvoiceForm;
