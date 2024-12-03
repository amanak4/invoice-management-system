import React, { useState, useEffect } from "react";
import { TextField, Button, IconButton, Divider, Box, Grid } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import axios from "axios";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { base_url } from "../../../base_url";
const AddInvoice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    invoice_number: "",
    customer_name: "",
    date: "",
    details: [{ description: "", quantity: 1, unit_price: 0.0 }],
  });
  const [isInvoiceNumberValid, setIsInvoiceNumberValid] = useState(true);
  const [debounceTimer, setDebounceTimer] = useState(null);

  const fetchInvoice = async () => {
    // console.log("hnama",location.state);
  
     if (id){
      try {
        const response = await axios.get(`${base_url}/${id}`);
        const { invoice_number, customer_name, date, details } = response.data.data;
        const detailsArray = Array.isArray(details)
          ? details
          : Object.keys(details).map((key) => ({
              description: details[key]?.description || "",
              quantity: details[key]?.quantity || 0,
              unit_price: details[key]?.unit_price || 0.0,
            }));
        setFormData({
          invoice_number,
          customer_name,
          date: new Date(date).toISOString().split("T")[0],
          details: detailsArray,
        });
      } catch (error) {
        toast.error("Failed to fetch invoice data.",{style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
      }});
      }
    }
    else if(location.state){
      setFormData(location.state);
      return;
    }
  };

  useEffect(() => {
    fetchInvoice();
  }, [id, location.state,formData]);

  const handleInvoiceNumberValidation = async (invoiceNumber) => {
    try {
      const response = await axios.post(`${base_url}/checkInvoiceNumber`, {
        invoice_number: invoiceNumber,
      });
      setIsInvoiceNumberValid(true);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setIsInvoiceNumberValid(false);
      } else {
        toast.error("Error checking invoice number.",{style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
      }});
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "invoice_number") {
      setFormData({ ...formData, [name]: value.toUpperCase() });

      clearTimeout(debounceTimer); 
      const timer = setTimeout(() => {
        handleInvoiceNumberValidation(value.toUpperCase()); 
      }, 500); 
      setDebounceTimer(timer);
    }
    else{
      setFormData({ ...formData, [name]: value });

    }
  };

  const handleDetailChange = (index, field, value) => {
    const newDetails = [...formData.details];
    newDetails[index][field] = field === "quantity" || field === "unit_price" ? parseFloat(value) : value;
    setFormData({ ...formData, details: newDetails });
  };

  const addLineItem = () => {
    setFormData({
      ...formData,
      details: [...formData.details, { description: "", quantity: 1, unit_price: 0.0 }],
    });
  };

  const removeLineItem = (index) => {
    const newDetails = formData.details.filter((_, i) => i !== index);
    setFormData({ ...formData, details: newDetails });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.invoice_number || !formData.customer_name || !formData.date) {
      toast.error("Please fill in all required fields.",{style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
    }});
      return;
    }

    if (!isInvoiceNumberValid) {
      toast.error("Invoice number already exists.",{style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
    }});
      return;
    }

    if (formData.details.some((item) => !item.description || item.quantity <= 0 || item.unit_price <= 0)) {
      toast.error("Invalid line items.",{style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
    }});
      return;
    }

    navigate("/review", { state: { ...formData, id } });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-1/4 bg-white p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-4">Steps</h2>
        <ul className="space-y-2">
          <li className="text-blue-600 font-bold">{id ? "Edit Invoice" : "Add Invoice"}</li>
          <li>2. Review</li>
          <li>3. Submit</li>
        </ul>
      </aside>

      <main className="flex-1 bg-white shadow-md p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold mb-6">{id ? "Edit Invoice" : "Add Invoice"}</h1>
          <Box component="form" onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <TextField
                fullWidth
                label="Invoice Number"
                name="invoice_number"
                value={formData.invoice_number.toUpperCase()}
                onChange={handleInputChange}
                variant="outlined"
                error={!isInvoiceNumberValid}
                helperText={!isInvoiceNumberValid ? "Invoice number already exists." : "Unique invoice number."}
              />
              <TextField
                fullWidth
                label="Customer Name"
                name="customer_name"
                value={formData.customer_name}
                onChange={handleInputChange}
                variant="outlined"
              />
            </div>
            <TextField
              fullWidth
              label="Date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />

            <Divider className="my-6" />

            <h2 className="text-xl font-semibold mb-4">Line Items</h2>
            {formData.details.map((detail, index) => (
              <Grid container spacing={2} key={index} alignItems="center">
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Description"
                    value={detail.description}
                    onChange={(e) => handleDetailChange(index, "description", e.target.value)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Quantity"
                    type="number"
                    value={detail.quantity}
                    onChange={(e) => handleDetailChange(index, "quantity", e.target.value)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Unit Price"
                    type="number"
                    value={detail.unit_price}
                    onChange={(e) => handleDetailChange(index, "unit_price", e.target.value)}
                  />
                </Grid>
                <Grid item>
                  <IconButton color="error" onClick={() => removeLineItem(index)} disabled={formData.details.length === 1}>
                    <Remove />
                  </IconButton>
                  <IconButton color="primary" onClick={addLineItem}>
                    <Add />
                  </IconButton>
                </Grid>
              </Grid>
            ))}

            <Button type="submit" variant="contained" color="primary" fullWidth className="mt-4">
              {id ? "Update Invoice" : "Add Invoice"}
            </Button>
          </Box>
        </motion.div>
      </main>
    </div>
  );
};

export default AddInvoice;
