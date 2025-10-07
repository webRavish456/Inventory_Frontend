'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";

const EditBinRack = ({ onClose, binRackData, onSave }) => {
  const [formData, setFormData] = useState({
    warehouseName: '',
    zone: '',
    binRackNumber: '',
    binType: '',
    location: '',
    capacity: '',
    occupancy: '',
    productCategory: '',
    status: 'Active'
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (binRackData) {
      setFormData({
        warehouseName: binRackData.warehouseName || '',
        zone: binRackData.zone || '',
        binRackNumber: binRackData.binRackNumber || binRackData.binNumber || binRackData.rackNumber || '',
        binType: binRackData.binType || '',
        location: binRackData.location || '',
        capacity: binRackData.capacity || '',
        occupancy: binRackData.occupancy || binRackData.currentStock || '',
        productCategory: binRackData.productCategory || '',
        status: binRackData.status || 'Active'
      });
    }
  }, [binRackData]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.warehouseName.trim()) newErrors.warehouseName = 'Warehouse name is required';
    if (!formData.zone.trim()) newErrors.zone = 'Zone is required';
    if (!formData.binRackNumber.trim()) newErrors.binRackNumber = 'Bin/Rack number is required';
    if (!formData.binType.trim()) newErrors.binType = 'Bin type is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.capacity || formData.capacity <= 0) newErrors.capacity = 'Valid capacity is required';
    if (!formData.productCategory.trim()) newErrors.productCategory = 'Product category is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      const updatedBinRack = {
        ...formData,
        currentStock: formData.occupancy, // Map occupancy to currentStock for compatibility
        utilization: Math.round((formData.occupancy / formData.capacity) * 100)
      };
      onSave(updatedBinRack);
      onClose();
    }
  };


  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={3}>

        <Grid size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            <InputLabel>Warehouse Name</InputLabel>
            <Select
              value={formData.warehouseName}
              onChange={(e) => handleInputChange('warehouseName', e.target.value)}
              label="Warehouse Name"
            >
              <MenuItem value="Main Warehouse">Main Warehouse</MenuItem>
              <MenuItem value="Electronics Warehouse">Electronics Warehouse</MenuItem>
              <MenuItem value="Furniture Warehouse">Furniture Warehouse</MenuItem>
              <MenuItem value="Cold Storage Warehouse">Cold Storage Warehouse</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Zone"
            value={formData.zone}
            onChange={(e) => handleInputChange('zone', e.target.value)}
            error={!!errors.zone}
            helperText={errors.zone}
            required
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Bin/Rack Number"
            value={formData.binRackNumber}
            onChange={(e) => handleInputChange('binRackNumber', e.target.value)}
            error={!!errors.binRackNumber}
            helperText={errors.binRackNumber}
            required
            placeholder="e.g., BR001, RACK-A1"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            <InputLabel>Bin Type</InputLabel>
            <Select
              value={formData.binType}
              onChange={(e) => handleInputChange('binType', e.target.value)}
              label="Bin Type"
              error={!!errors.binType}
              required
            >
              <MenuItem value="Pallet Bin">Pallet Bin</MenuItem>
              <MenuItem value="Shelf Bin">Shelf Bin</MenuItem>
              <MenuItem value="Bulk Bin">Bulk Bin</MenuItem>
              <MenuItem value="Carton Bin">Carton Bin</MenuItem>
              <MenuItem value="Small Parts Bin">Small Parts Bin</MenuItem>
              <MenuItem value="Cold Storage Bin">Cold Storage Bin</MenuItem>
              <MenuItem value="Hazardous Bin">Hazardous Bin</MenuItem>
              <MenuItem value="Floor Bin">Floor Bin</MenuItem>
            </Select>
            {errors.binType && (
              <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.75 }}>
                {errors.binType}
              </Typography>
            )}
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Location Code"
            value={formData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            error={!!errors.location}
            helperText={errors.location}
            placeholder="e.g., A-1-1"
            required
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            <InputLabel>Product Category</InputLabel>
            <Select
              value={formData.productCategory}
              onChange={(e) => handleInputChange('productCategory', e.target.value)}
              label="Product Category"
            >
              <MenuItem value="Electronics">Electronics</MenuItem>
              <MenuItem value="Furniture">Furniture</MenuItem>
              <MenuItem value="Clothing">Clothing</MenuItem>
              <MenuItem value="Food & Beverages">Food & Beverages</MenuItem>
              <MenuItem value="Pharmaceuticals">Pharmaceuticals</MenuItem>
              <MenuItem value="Automotive">Automotive</MenuItem>
              <MenuItem value="Books & Media">Books & Media</MenuItem>
              <MenuItem value="Home & Garden">Home & Garden</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Total Capacity"
            type="number"
            value={formData.capacity}
            onChange={(e) => handleInputChange('capacity', e.target.value)}
            error={!!errors.capacity}
            helperText={errors.capacity}
            required
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Occupancy (kg)"
            type="number"
            value={formData.occupancy}
            onChange={(e) => handleInputChange('occupancy', e.target.value)}
            placeholder="Enter weight in kg"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 12 }}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={formData.status}
              onChange={(e) => handleInputChange('status', e.target.value)}
              label="Status"
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
              <MenuItem value="Maintenance">Maintenance</MenuItem>
              <MenuItem value="Reserved">Reserved</MenuItem>
            </Select>
          </FormControl>
        </Grid>

      </Grid>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 3 }}>
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{ transform: 'none', textTransform: 'none' }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          sx={{ transform: 'none', textTransform: 'none' }}
        >
          Update
        </Button>
      </Box>
    </Box>
  );
};

export default EditBinRack;
