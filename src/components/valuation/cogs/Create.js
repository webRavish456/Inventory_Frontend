"use client";
import React, { useState } from "react";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

const CreateCOGS = ({ handleClose, handleCreate }) => {
  const [formData, setFormData] = useState({
    productName: "",
    costPrice: "",
    sellingPrice: "",
    quantitySold: "",
    period: "",
    category: ""
  });

  const products = ["Samsung Galaxy S24", "Office Chair", "LED TV 43", "Wireless Mouse", "Keyboard", "Monitor 24"];
  const categories = ["Electronics", "Furniture", "Clothing", "Books", "Home & Garden"];
  const periods = ["2024-Q1", "2024-Q2", "2024-Q3", "2024-Q4"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    if (!formData.productName || !formData.costPrice || !formData.sellingPrice || !formData.quantitySold || !formData.period || !formData.category) {
      alert('Please fill all required fields');
      return;
    }
    handleCreate(formData);
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
        <TextField
          fullWidth
          label="Cost Price"
          type="number"
          name="costPrice"
          value={formData.costPrice}
          onChange={handleChange}
          required
        />
      </Grid>
      <Grid size={6}>
        <TextField
          fullWidth
          label="Selling Price"
          type="number"
          name="sellingPrice"
          value={formData.sellingPrice}
          onChange={handleChange}
          required
        />
      </Grid>
      <Grid size={6}>
        <TextField
          fullWidth
          label="Quantity Sold"
          type="number"
          name="quantitySold"
          value={formData.quantitySold}
          onChange={handleChange}
          required
        />
      </Grid>
      <Grid size={6}>
        <FormControl fullWidth required>
          <InputLabel>Period</InputLabel>
          <Select
            name="period"
            value={formData.period}
            onChange={handleChange}
          >
            {periods.map((period) => (
              <MenuItem key={period} value={period}>
                {period}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid size={6}>
        <FormControl fullWidth required>
          <InputLabel>Category</InputLabel>
          <Select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
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
          Save
        </Button>
      </Grid>
    </Grid>
  );
};

export default CreateCOGS;
