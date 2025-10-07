"use client";
import { Button, Grid, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";

const EditCustomer = ({ customerData, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    gstNumber: "",
    customerType: "",
    status: "Active"
  });

  const customerTypes = [
    "Regular",
    "Premium",
    "VIP"
  ];

  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Chandigarh"
  ];

  useEffect(() => {
    if (customerData) {
      setFormData({
        customerName: customerData.customerName || "",
        email: customerData.email || "",
        phone: customerData.phone || "",
        address: customerData.address || "",
        city: customerData.city || "",
        state: customerData.state || "",
        pincode: customerData.pincode || "",
        gstNumber: customerData.gstNumber || "",
        customerType: customerData.customerType || "",
        status: customerData.status || "Active"
      });
    }
  }, [customerData]);

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
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Enter email address"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          placeholder="Enter phone number"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
          placeholder="Enter city"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FormControl fullWidth required>
          <InputLabel>State</InputLabel>
          <Select
            name="state"
            value={formData.state}
            onChange={handleChange}
            label="State"
          >
            {states.map((state) => (
              <MenuItem key={state} value={state}>
                {state}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Pincode"
          name="pincode"
          value={formData.pincode}
          onChange={handleChange}
          required
          placeholder="Enter pincode"
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <TextField
          fullWidth
          label="Address"
          name="address"
          multiline
          rows={2}
          value={formData.address}
          onChange={handleChange}
          required
          placeholder="Enter complete address"
        />
      </Grid>
    
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="GST Number"
          name="gstNumber"
          value={formData.gstNumber}
          onChange={handleChange}
          required
          placeholder="Enter GST number"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FormControl fullWidth required>
          <InputLabel>Customer Type</InputLabel>
          <Select
            name="customerType"
            value={formData.customerType}
            onChange={handleChange}
            label="Customer Type"
          >
            {customerTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <FormControl fullWidth required>
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={formData.status}
            onChange={handleChange}
            label="Status"
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
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

export default EditCustomer;