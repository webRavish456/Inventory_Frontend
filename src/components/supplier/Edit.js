"use client";
import { Button, Grid, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";

const EditSupplier = ({ supplierData, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    supplierName: "",
    contactPerson: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    gstNumber: "",
    supplierType: "",
    status: "Active"
  });

  const supplierTypes = [
    "Electronics",
    "Furniture",
    "Kitchenware",
    "Clothing",
    "Books",
    "Home & Garden",
    "Sports",
    "Automotive",
    "Health & Beauty"
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
    if (supplierData) {
      setFormData({
        supplierName: supplierData.supplierName || "",
        contactPerson: supplierData.contactPerson || "",
        email: supplierData.email || "",
        phone: supplierData.phone || "",
        city: supplierData.city || "",
        state: supplierData.state || "",
        gstNumber: supplierData.gstNumber || "",
        supplierType: supplierData.supplierType || "",
        status: supplierData.status || "Active"
      });
    }
  }, [supplierData]);

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
          label="Supplier Name"
          name="supplierName"
          value={formData.supplierName}
          onChange={handleChange}
          required
          placeholder="Enter supplier name"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Contact Person"
          name="contactPerson"
          value={formData.contactPerson}
          onChange={handleChange}
          required
          placeholder="Enter contact person name"
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
          <InputLabel>Supplier Type</InputLabel>
          <Select
            name="supplierType"
            value={formData.supplierType}
            onChange={handleChange}
            label="Supplier Type"
          >
            {supplierTypes.map((type) => (
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

export default EditSupplier;