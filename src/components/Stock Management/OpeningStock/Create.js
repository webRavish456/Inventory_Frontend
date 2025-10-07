"use client";
import { Button, Grid, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useState } from "react";

const CreateOpeningStock = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    productName: "",
    warehouseName: "",
    supplierName: "",
    openingQuantity: "",
    unitPrice: "",
    openingDate: ""
  });

  const warehouses = [
    "Electronics Warehouse",
    "Furniture Warehouse",
    "Clothing Warehouse",
    "Food Warehouse"
  ];

  const products = [
    "Samsung Galaxy S24",
    "Dell Laptop Inspiron 15",
    "Office Chair Ergonomic",
    "iPhone 15 Pro",
    "MacBook Air M2"
  ];

  const suppliers = [
    "Tech Solutions Ltd",
    "Computer World",
    "Furniture Plus",
    "Office Supplies Co"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    if (onSave) {
      // Calculate total value
      const totalValue = formData.openingQuantity * formData.unitPrice;
      onSave({ ...formData, totalValue });
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 6 }}>
        <FormControl fullWidth required>
          <InputLabel>Product Name</InputLabel>
          <Select
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            label="Product Name"
          >
            {products.map((product) => (
              <MenuItem key={product} value={product}>
                {product}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FormControl fullWidth required>
          <InputLabel>Warehouse</InputLabel>
          <Select
            name="warehouseName"
            value={formData.warehouseName}
            onChange={handleChange}
            label="Warehouse"
          >
            {warehouses.map((warehouse) => (
              <MenuItem key={warehouse} value={warehouse}>
                {warehouse}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FormControl fullWidth required>
          <InputLabel>Supplier Name</InputLabel>
          <Select
            name="supplierName"
            value={formData.supplierName}
            onChange={handleChange}
            label="Supplier Name"
          >
            {suppliers.map((supplier) => (
              <MenuItem key={supplier} value={supplier}>
                {supplier}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Opening Quantity"
          name="openingQuantity"
          type="number"
          value={formData.openingQuantity}
          onChange={handleChange}
          required
          placeholder="Enter opening quantity"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Unit Price"
          name="unitPrice"
          type="number"
          value={formData.unitPrice}
          onChange={handleChange}
          required
          placeholder="Enter unit price"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Opening Date"
          name="openingDate"
          type="date"
          value={formData.openingDate}
          onChange={handleChange}
          required
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid size={{ xs: 12 }} display="flex" justifyContent="flex-end" gap={2}>
        <Button 
          onClick={onClose} 
          variant="outlined" 
          sx={{ transform: 'none', textTransform: 'none' }}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSave} 
          variant="contained" 
          sx={{ 
            backgroundColor: '#1976D2',
            '&:hover': { backgroundColor: '#1565C0' },
            transform: 'none', 
            textTransform: 'none' 
          }}
        >
          Save
        </Button>
      </Grid>
    </Grid>
  );
};

export default CreateOpeningStock;
