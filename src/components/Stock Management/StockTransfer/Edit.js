"use client";
import { Button, Grid, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";

const EditStockTransfer = ({ transferData, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    productName: "",
    fromWarehouse: "",
    toWarehouse: "",
    transferQuantity: "",
    transferDate: "",
    transferReason: "",
    transferBy: "",
    status: "Pending"
  });

  const transferStatuses = [
    "Pending",
    "In Transit",
    "Completed",
    "Cancelled"
  ];

  const warehouses = [
    "Electronics Warehouse",
    "Electronics Warehouse - Branch",
    "Furniture Warehouse",
    "Furniture Warehouse - Branch",
    "Clothing Warehouse",
    "Food Warehouse"
  ];

  const transferReasons = [
    "Branch Restocking",
    "Demand Transfer",
    "Seasonal Transfer",
    "Emergency Transfer",
    "Inventory Rebalancing"
  ];

  useEffect(() => {
    if (transferData) {
      setFormData({
        productName: transferData.productName || "",
        fromWarehouse: transferData.fromWarehouse || "",
        toWarehouse: transferData.toWarehouse || "",
        transferQuantity: transferData.transferQuantity || "",
        transferDate: transferData.transferDate || "",
        transferReason: transferData.transferReason || "",
        transferBy: transferData.transferBy || "",
        status: transferData.status || "Pending"
      });
    }
  }, [transferData]);

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
          <InputLabel>From Warehouse</InputLabel>
          <Select
            name="fromWarehouse"
            value={formData.fromWarehouse}
            onChange={handleChange}
            label="From Warehouse"
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
          <InputLabel>To Warehouse</InputLabel>
          <Select
            name="toWarehouse"
            value={formData.toWarehouse}
            onChange={handleChange}
            label="To Warehouse"
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
          label="Transfer Quantity"
          name="transferQuantity"
          type="number"
          value={formData.transferQuantity}
          onChange={handleChange}
          required
          placeholder="Enter transfer quantity"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Transfer Date"
          name="transferDate"
          type="date"
          value={formData.transferDate}
          onChange={handleChange}
          required
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FormControl fullWidth required>
          <InputLabel>Transfer Reason</InputLabel>
          <Select
            name="transferReason"
            value={formData.transferReason}
            onChange={handleChange}
            label="Transfer Reason"
          >
            {transferReasons.map((reason) => (
              <MenuItem key={reason} value={reason}>
                {reason}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Transfer By"
          name="transferBy"
          value={formData.transferBy}
          onChange={handleChange}
          required
          placeholder="Enter transfer by"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FormControl fullWidth required>
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={formData.status}
            onChange={handleChange}
            label="Status"
          >
            {transferStatuses.map((status) => (
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
          Update
        </Button>
      </Grid>
    </Grid>
  );
};

export default EditStockTransfer;
