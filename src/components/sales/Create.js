"use client";
import { Button, Grid, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useState } from "react";

const CreateSales = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    orderDate: "",
    deliveryDate: "",
    totalAmount: "",
    paidAmount: "",
    paymentStatus: "Pending",
    orderStatus: "Pending",
    paymentMethod: "Cash",
    notes: "",
    salesPerson: "",
    deliveryAddress: ""
  });

  const paymentStatuses = [
    "Paid",
    "Partial",
    "Pending"
  ];

  const orderStatuses = [
    "Pending",
    "Processing",
    "Delivered",
    "Cancelled"
  ];

  const paymentMethods = [
    "Cash",
    "UPI",
    "Credit",
    "Bank Transfer",
    "Cash on Delivery"
  ];

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
          label="Customer Name"
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
          required
          placeholder="Enter customer name"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Customer Email"
          name="customerEmail"
          type="email"
          value={formData.customerEmail}
          onChange={handleChange}
          required
          placeholder="Enter customer email"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Customer Phone"
          name="customerPhone"
          value={formData.customerPhone}
          onChange={handleChange}
          required
          placeholder="Enter customer phone"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Order Date"
          name="orderDate"
          type="date"
          value={formData.orderDate}
          onChange={handleChange}
          required
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Delivery Date"
          name="deliveryDate"
          type="date"
          value={formData.deliveryDate}
          onChange={handleChange}
          required
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Total Amount"
          name="totalAmount"
          type="number"
          value={formData.totalAmount}
          onChange={handleChange}
          required
          placeholder="Enter total amount"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Paid Amount"
          name="paidAmount"
          type="number"
          value={formData.paidAmount}
          onChange={handleChange}
          required
          placeholder="Enter paid amount"
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
      <Grid size={{ xs: 12, md: 6 }}>
        <FormControl fullWidth required>
          <InputLabel>Order Status</InputLabel>
          <Select
            name="orderStatus"
            value={formData.orderStatus}
            onChange={handleChange}
            label="Order Status"
          >
            {orderStatuses.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FormControl fullWidth required>
          <InputLabel>Payment Method</InputLabel>
          <Select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            label="Payment Method"
          >
            {paymentMethods.map((method) => (
              <MenuItem key={method} value={method}>
                {method}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Sales Person"
          name="salesPerson"
          value={formData.salesPerson}
          onChange={handleChange}
          required
          placeholder="Enter sales person"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 12 }}>
        <TextField
          fullWidth
          label="Delivery Address"
          name="deliveryAddress"
          value={formData.deliveryAddress}
          onChange={handleChange}
          required
          placeholder="Enter delivery address"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 12 }}>
        <TextField
          fullWidth
          label="Notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          multiline
          rows={3}
          placeholder="Enter notes"
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

export default CreateSales;
