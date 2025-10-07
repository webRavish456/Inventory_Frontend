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

const EditDamage = ({ editData, handleUpdate, handleClose }) => {
  const [formData, setFormData] = useState({
    productName: "",
    damageDate: "",
    damageType: "",
    damagedQuantity: "",
    unitCost: "",
    reportedBy: "",
    warehouse: "",
    status: "",
    notes: ""
  });

  const products = ["Samsung Galaxy S24", "Office Chair", "Coffee Mug", "LED TV", "Wireless Mouse", "Keyboard"];
  const damageTypes = ["Physical Damage", "Water Damage", "Breakage", "Fire Damage", "Theft", "Expired"];
  const warehouses = ["Main Warehouse", "Electronics Warehouse", "Furniture Warehouse", "North Warehouse", "South Warehouse"];
  const staff = ["Rajesh Kumar", "Amit Patel", "Meera Joshi", "Priya Singh", "Sunita Patel"];
  const statuses = ["Pending", "Approved", "Rejected"];

  useEffect(() => {
    if (editData) {
      setFormData({
        productName: editData.productName || '',
        damageDate: editData.damageDate || '',
        damageType: editData.damageType || '',
        damagedQuantity: editData.damagedQuantity || '',
        unitCost: editData.unitCost || '',
        reportedBy: editData.reportedBy || '',
        warehouse: editData.warehouse || '',
        status: editData.status || '',
        notes: editData.notes || ''
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    if (!formData.productName || !formData.damageDate || !formData.damageType || !formData.damagedQuantity || !formData.unitCost || !formData.reportedBy || !formData.warehouse || !formData.status) {
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
        <TextField
          fullWidth
          label="Damage Date"
          type="date"
          name="damageDate"
          value={formData.damageDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          required
        />
      </Grid>
      <Grid size={6}>
        <FormControl fullWidth required>
          <InputLabel>Damage Type</InputLabel>
          <Select
            name="damageType"
            value={formData.damageType}
            onChange={handleChange}
          >
            {damageTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid size={6}>
        <TextField
          fullWidth
          label="Damaged Quantity"
          type="number"
          name="damagedQuantity"
          value={formData.damagedQuantity}
          onChange={handleChange}
          required
        />
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
        <FormControl fullWidth required>
          <InputLabel>Reported By</InputLabel>
          <Select
            name="reportedBy"
            value={formData.reportedBy}
            onChange={handleChange}
          >
            {staff.map((person) => (
              <MenuItem key={person} value={person}>
                {person}
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
      <Grid size={12}>
        <TextField
          fullWidth
          label="Notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          multiline
          rows={3}
        />
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

export default EditDamage;