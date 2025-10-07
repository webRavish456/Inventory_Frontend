"use client";
import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

const EditFIFO = ({ editData, handleUpdate, handleClose }) => {
  const [formData, setFormData] = useState({
    productName: "",
    method: "",
    openingStock: "",
    purchases: "",
    sales: "",
    unitCost: "",
    warehouse: ""
  });

  const products = ["Samsung Galaxy S24", "Office Chair", "LED TV 43", "Wireless Mouse", "Keyboard", "Monitor 24"];
  const methods = ["FIFO", "LIFO", "Weighted Average"];
  const warehouses = ["Main Warehouse", "North Warehouse", "South Warehouse", "East Warehouse", "West Warehouse"];

  useEffect(() => {
    if (editData) {
      setFormData({
        productName: editData.productName || '',
        method: editData.method || '',
        openingStock: editData.openingStock || '',
        purchases: editData.purchases || '',
        sales: editData.sales || '',
        unitCost: editData.unitCost || '',
        warehouse: editData.warehouse || ''
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    if (!formData.productName || !formData.method || !formData.openingStock || !formData.purchases || !formData.sales || !formData.unitCost || !formData.warehouse) {
      alert('Please fill all required fields');
      return;
    }
    handleUpdate({ ...editData, ...formData });
    handleClose();
  };

  return (
    <Grid container spacing={3}>
      <Grid size={6}>
        <FormControl fullWidth required>
          <InputLabel>Product Name</InputLabel>
          <Select
            name="productName"
            value={formData.productName}
            onChange={handleChange}
          >
            {products.map((product) => (
              <MenuItem key={product} value={product}>
                {product}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid size={6}>
        <FormControl fullWidth required>
          <InputLabel>Method</InputLabel>
          <Select
            name="method"
            value={formData.method}
            onChange={handleChange}
          >
            {methods.map((method) => (
              <MenuItem key={method} value={method}>
                {method}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid size={6}>
        <TextField
          fullWidth
          label="Unit Cost"
          type="number"
          name="unitCost"
          value={formData.unitCost}
          onChange={handleChange}
          required
        />
      </Grid>
      <Grid size={6}>
        <TextField
          fullWidth
          label="Opening Stock"
          type="number"
          name="openingStock"
          value={formData.openingStock}
          onChange={handleChange}
          required
        />
      </Grid>
      <Grid size={6}>
        <TextField
          fullWidth
          label="Purchases"
          type="number"
          name="purchases"
          value={formData.purchases}
          onChange={handleChange}
          required
        />
      </Grid>
      <Grid size={6}>
        <TextField
          fullWidth
          label="Sales"
          type="number"
          name="sales"
          value={formData.sales}
          onChange={handleChange}
          required
        />
      </Grid>
      <Grid size={12}>
        <FormControl fullWidth required>
          <InputLabel>Warehouse</InputLabel>
          <Select
            name="warehouse"
            value={formData.warehouse}
            onChange={handleChange}
          >
            {warehouses.map((warehouse) => (
              <MenuItem key={warehouse} value={warehouse}>
                {warehouse}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid size={12} display="flex" justifyContent="flex-end" gap={2}>
        <Button 
          onClick={handleClose} 
          variant="outlined"
          sx={{ transform: 'none', textTransform: 'none' }}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSave} 
          variant="contained"
          sx={{ transform: 'none', textTransform: 'none' }}
        >
          Update
        </Button>
      </Grid>
    </Grid>
  );
};

export default EditFIFO;
