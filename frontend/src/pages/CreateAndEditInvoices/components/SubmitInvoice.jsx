import React from "react";
import { Button, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { base_url } from "../../../base_url";
const SubmitInvoice = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const invoiceData = location.state;

  const handleFinalSubmit = async () => {
    // Simulate API submission
    try {
        if (invoiceData.id) {
          await axios.put(`${base_url}/${invoiceData.id}`, invoiceData);
          toast.success("Invoice updated successfully.",{style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
        }});
        } else {
          await axios.post(`${base_url}`, invoiceData);
          toast.success("Invoice added successfully.",{style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
        }});
        }
        navigate("/");
      } catch {
        toast.error("Failed to save invoice.",{style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
        }});
      }
    console.log("Invoice Submitted:", invoiceData);
    navigate("/"); // Redirect to home after submission
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   
  };
  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-2xl font-bold mb-6">Submit Invoice</h1>
      <Typography variant="body1" className="mb-4">
        Are you sure you want to submit this invoice?
      </Typography>
      <div className="flex gap-4">
        <Button variant="outlined" onClick={() => navigate(-1)}>Back</Button>
        <Button variant="contained" color="primary" onClick={handleFinalSubmit}>
          Confirm & Submit
        </Button>
      </div>
    </div>
  );
};

export default SubmitInvoice;
