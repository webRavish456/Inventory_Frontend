"use client";
import { Button, Grid, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";

const EditRealTimeStock = ({ stockData, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    productName: "",
    warehouseName: "",
    currentStock: "",
    reservedStock: "",
    availableStock: "",
    lastMovement: "",
    movementQuantity: ""
  });

  const movements = [
    "Stock In",
    "Stock Out",
    "Stock Transfer"
  ];

  const warehouses = [
    "Electronics Warehouse",
    "Furniture Warehouse",
    "Clothing Warehouse",
    "Food Warehouse"
  ];

  useEffect(() => {
    if (stockData) {
      setFormData({
        productName: stockData.productName || "",
        warehouseName: stockData.warehouseName || "",
        currentStock: stockData.currentStock || "",
        reservedStock: stockData.reservedStock || "",
        availableStock: stockData.availableStock || "",
        lastMovement: stockData.lastMovement || "",
        movementQuantity: stockData.movementQuantity || ""
      });
    }
  }, [stockData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    if (onSave) {
      onSave(formData);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Product Name"
          name="productName"
          value={formData.productName}
          onChange={handleChange}
          required
          placeholder="Enter product name"
        />
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
        <TextField
          fullWidth
          label="Current Stock"
          name="currentStock"
          type="number"
          value={formData.currentStock}
          onChange={handleChange}
          required
          placeholder="Enter current stock"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Reserved Stock"
          name="reservedStock"
          type="number"
          value={formData.reservedStock}
          onChange={handleChange}
          required
          placeholder="Enter reserved stock"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Available Stock"
          name="availableStock"
          type="number"
          value={formData.availableStock}
          onChange={handleChange}
          required
          placeholder="Enter available stock"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FormControl fullWidth required>
          <InputLabel>Movement</InputLabel>
          <Select
            name="lastMovement"
            value={formData.lastMovement}
            onChange={handleChange}
            label="Movement"
          >
            {movements.map((movement) => (
              <MenuItem key={movement} value={movement}>
                {movement}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid size={{ xs: 12, md: 12 }}>
        <TextField
          fullWidth
          label="Movement Quantity"
          name="movementQuantity"
          type="number"
          value={formData.movementQuantity}
          onChange={handleChange}
          required
          placeholder="Enter movement quantity"
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
          Update
        </Button>
      </Grid>
    </Grid>
  );
};

export default EditRealTimeStock;
