"use client";
import { Button, Grid, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useState } from "react";

const CreateStockIn = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    productName: "",
    quantityIn: "",
    purchasePrice: "",
    totalCost: "",
    supplierId: "",
    invoice: "",
    dateOfStockIn: "",
    paymentStatus: "Pending"
  });

  const products = [
    "Samsung Galaxy S24",
    "Dell Laptop Inspiron 15",
    "Office Chair Ergonomic",
    "iPhone 15 Pro",
    "MacBook Air M2",
    "Gaming Chair Pro"
  ];

  const suppliers = [
    "SUP001 - Samsung Electronics",
    "SUP002 - Dell Technologies",
    "SUP003 - Office Furniture Co",
    "SUP004 - Apple Inc",
    "SUP005 - Gaming Accessories Ltd"
  ];

  const paymentStatuses = [
    "Paid",
    "Pending",
    "Overdue"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Auto-calculate total cost
    if (name === "quantityIn" || name === "purchasePrice") {
      const quantity = name === "quantityIn" ? value : formData.quantityIn;
      const price = name === "purchasePrice" ? value : formData.purchasePrice;
      if (quantity && price) {
        setFormData(prev => ({ ...prev, totalCost: (parseFloat(quantity) * parseFloat(price)).toString() }));
      }
    }
  };

  const handleSave = () => {
    if (onSave) {
      onSave(formData);
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
        <TextField
          fullWidth
          label="Quantity In"
          name="quantityIn"
          type="number"
          value={formData.quantityIn}
          onChange={handleChange}
          required
          placeholder="Enter quantity"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Purchase Price (per)"
          name="purchasePrice"
          type="number"
          value={formData.purchasePrice}
          onChange={handleChange}
          required
          placeholder="Enter purchase price per unit"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Total Cost"
          name="totalCost"
          value={formData.totalCost}
          onChange={handleChange}
          required
          placeholder="Auto-calculated"
          InputProps={{ readOnly: true }}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FormControl fullWidth required>
          <InputLabel>Supplier ID</InputLabel>
          <Select
            name="supplierId"
            value={formData.supplierId}
            onChange={handleChange}
            label="Supplier ID"
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
          label="Invoice"
          name="invoice"
          value={formData.invoice}
          onChange={handleChange}
          required
          placeholder="Enter invoice number"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Date of Stock In"
          name="dateOfStockIn"
          type="date"
          value={formData.dateOfStockIn}
          onChange={handleChange}
          required
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FormControl fullWidth required>
          <InputLabel>Payment Status</InputLabel>
          <Select
            name="paymentStatus"
            value={formData.paymentStatus}
            onChange={handleChange}
            label="Payment Status"
          >
            {paymentStatuses.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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

export default CreateStockIn;
