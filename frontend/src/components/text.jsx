import React from "react";
import { TextField, Button, IconButton, Divider, Box } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { motion } from "framer-motion";

const AddInvoice = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/4 bg-white p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-4">Steps</h2>
        <ul className="space-y-2">
          <li className="text-blue-600 font-bold">1. Add Invoice</li>
          <li>2. Review</li>
          <li>3. Submit</li>
        </ul>
      </aside>

      {/* Main Form */}
      <main className="flex-1 bg-white shadow-md p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold mb-6">Add Invoice</h1>

          {/* Form */}
          <Box component="form" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <TextField fullWidth label="Invoice Number" variant="outlined" />
              <TextField fullWidth label="Customer Name" variant="outlined" />
            </div>

            <TextField
              fullWidth
              label="Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />

            <Divider className="my-6" />

            <h2 className="text-xl font-semibold mb-4">Line Items</h2>

            <div className="grid grid-cols-4 gap-4 items-center">
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                className="col-span-2"
              />
              <TextField
                type="number"
                label="Quantity"
                defaultValue={1}
                variant="outlined"
              />
              <TextField
                type="number"
                label="Unit Price"
                defaultValue={0}
                variant="outlined"
              />
              <div className="flex space-x-2">
                <IconButton>
                  <Remove />
                </IconButton>
                <IconButton color="primary">
                  <Add />
                </IconButton>
              </div>
            </div>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              className="mt-6"
            >
              Add Invoice
            </Button>
          </Box>
        </motion.div>
      </main>
    </div>
  );
};

export default AddInvoice;
