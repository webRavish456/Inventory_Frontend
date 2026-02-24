"use client";
import { Button, Grid, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";

const EditBranch = ({ branchData, onClose, onSave, saving }) => {
  const [formData, setFormData] = useState({
    branchName: "",
    branchCode: "",
    branchType: "Branch",
    managerName: "",
    managerEmail: "",
    phone: "",
    alternatePhone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    gstNumber: "",
    panNumber: "",
    establishedDate: "",
    employeeCount: "",
    area: "",
    rentAmount: "",
    status: "Active"
  });

  const branchTypes = ["Head Office", "Regional Office", "Branch", "Warehouse"];
  
  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Chandigarh"
  ];

  useEffect(() => {
    if (branchData) {
      setFormData({
        branchName: branchData.branchName || "",
        branchCode: branchData.branchCode || "",
        branchType: branchData.branchType || "Branch",
        managerName: branchData.managerName || "",
        managerEmail: branchData.managerEmail || "",
        phone: branchData.phone || "",
        alternatePhone: branchData.alternatePhone || "",
        email: branchData.email || "",
        address: branchData.address || "",
        city: branchData.city || "",
        state: branchData.state || "",
        pincode: branchData.pincode || "",
        country: branchData.country || "India",
        gstNumber: branchData.gstNumber || "",
        panNumber: branchData.panNumber || "",
        establishedDate: branchData.establishedDate || "",
        employeeCount: branchData.employeeCount != null ? branchData.employeeCount : "",
        area: branchData.area != null ? branchData.area : "",
        rentAmount: branchData.rentAmount != null ? branchData.rentAmount : "",
        status: branchData.status || "Active"
      });
    }
  }, [branchData]);

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
          label="Branch Name"
          name="branchName"
          value={formData.branchName}
          onChange={handleChange}
          required
          placeholder="Enter branch name"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Branch Code"
          name="branchCode"
          value={formData.branchCode}
          onChange={handleChange}
          required
          placeholder="e.g., BR001"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FormControl fullWidth required>
          <InputLabel>Branch Type</InputLabel>
          <Select
            name="branchType"
            value={formData.branchType}
            onChange={handleChange}
            label="Branch Type"
          >
            {branchTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Manager Name"
          name="managerName"
          value={formData.managerName}
          onChange={handleChange}
          required
          placeholder="Enter manager name"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Manager Email"
          name="managerEmail"
          type="email"
          value={formData.managerEmail}
          onChange={handleChange}
          required
          placeholder="manager@example.com"
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
          label="Alternate Phone"
          name="alternatePhone"
          value={formData.alternatePhone}
          onChange={handleChange}
          placeholder="Enter alternate phone (optional)"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Branch Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="branch@example.com"
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
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          required
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="GST Number"
          name="gstNumber"
          value={formData.gstNumber}
          onChange={handleChange}
          placeholder="Enter GST number (optional)"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="PAN Number"
          name="panNumber"
          value={formData.panNumber}
          onChange={handleChange}
          placeholder="Enter PAN number (optional)"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Established Date"
          name="establishedDate"
          type="date"
          value={formData.establishedDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Employee Count"
          name="employeeCount"
          type="number"
          value={formData.employeeCount}
          onChange={handleChange}
          placeholder="0"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Area (sq ft)"
          name="area"
          type="number"
          value={formData.area}
          onChange={handleChange}
          placeholder="0"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Rent Amount"
          name="rentAmount"
          type="number"
          value={formData.rentAmount}
          onChange={handleChange}
          placeholder="0"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={formData.status}
            onChange={handleChange}
            label="Status"
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
            <MenuItem value="Under Maintenance">Under Maintenance</MenuItem>
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
          disabled={saving}
          sx={{ 
            backgroundColor: '#1976D2',
            '&:hover': { backgroundColor: '#1565C0' },
            transform: 'none', 
            textTransform: 'none' 
          }}
        >
          {saving ? "Updating..." : "Update"}
        </Button>
      </Grid>
    </Grid>
  );
};

export default EditBranch;