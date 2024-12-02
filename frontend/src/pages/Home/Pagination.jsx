import React, { useState, useEffect } from "react";
import { Box, Button, Pagination, Stack } from "@mui/material";
import axios from "axios";

const PaginationComponent = ({ baseUrl, setInvoices,page, setPage, totalPages, setTotalPages }) => {

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}?page=${page}`);
        setInvoices(response.data.invoices);
        const totalPages = response.data.total;
        const r=totalPages%10;
        if(r==0){
          setTotalPages(totalPages/10);
        }
        else{
          setTotalPages(Math.floor(totalPages/10)+1);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [page, baseUrl, setInvoices]);

  // Handle page change
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 20,
        left: "50%",
        transform: "translateX(-50%)",
        bgcolor: "#333",
        p: 1,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Stack spacing={2} alignItems="center"
       sx={{
        "& .MuiPaginationItem-root": {
          color: "#fff",
        },
       }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
          variant="outlined"
        />
      </Stack>
    </Box>
  );
};

export default PaginationComponent;
