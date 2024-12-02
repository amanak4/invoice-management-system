import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/logo.webp";
function Navbar() {
    const siteName = "InvoicePro";
 const navigate = useNavigate();
  return (
    <div>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="" style={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
           <button onClick={() => navigate("/")} className='flex items-center'> 
           <img
              src={logo}
              alt="Logo"
              className='w-10 h-10 mr-2 rounded-full'
            />
            {siteName}</button>
          </Typography>
          <Button color="inherit" onClick={() => navigate("/")}>
            Home
          </Button>
          <Button color="inherit" onClick={() => navigate("/add-invoice")}>
            Create Invoice
          </Button>
        </Toolbar>
      </AppBar>

    </div>
  )
}

export default Navbar
