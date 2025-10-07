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

const EditDeadStock = ({ editData, handleUpdate, handleClose }) => {
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    lastMovement: "",
    costPrice: "",
    currentValue: "",
    status: "",
    warehouse: "",
    reason: ""
  });

  const products = ["Old Model Phone", "Seasonal Clothing", "Damaged Electronics", "Outdated Software", "Expired Products"];
  const categories = ["Electronics", "Fashion", "Software", "Food & Beverage", "Home & Garden"];
  const statuses = ["Identified", "Action Required", "Write-off"];
  const warehouses = ["Main Warehouse", "North Warehouse", "South Warehouse", "East Warehouse", "West Warehouse"];
  const reasons = ["Obsolete Technology", "Out of Season", "Physical Damage", "Expired", "Low Demand"];

  useEffect(() => {
    if (editData) {
      setFormData({
        productName: editData.productName || '',
        category: editData.category || '',
        lastMovement: editData.lastMovement || '',
        costPrice: editData.costPrice || '',
        currentValue: editData.currentValue || '',
        status: editData.status || '',
        warehouse: editData.warehouse || '',
        reason: editData.reason || ''
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    if (!formData.productName || !formData.category || !formData.lastMovement || !formData.costPrice || !formData.currentValue || !formData.status || !formData.warehouse || !formData.reason) {
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
      <Grid size={6}>
        <TextField
          fullWidth
          label="Last Movement"
          type="date"
          name="lastMovement"
          value={formData.lastMovement}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          required
        />
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
          label="Current Value"
          type="number"
          name="currentValue"
          value={formData.currentValue}
          onChange={handleChange}
          required
        />
      </Grid>
      <Grid size={6}>
        <FormControl fullWidth required>
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            {statuses.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid size={6}>
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
      <Grid size={6}>
        <FormControl fullWidth required>
          <InputLabel>Reason</InputLabel>
          <Select
            name="reason"
            value={formData.reason}
            onChange={handleChange}
          >
            {reasons.map((reason) => (
              <MenuItem key={reason} value={reason}>
                {reason}
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

export default EditDeadStock;
