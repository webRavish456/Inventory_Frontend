"use client";
import { Button, Grid, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";

const EditHSN = ({ hsnData, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    hsnCode: "",
    description: "",
    taxRate: "",
    category: "",
    subCategory: "",
    status: "Active"
  });

  const categories = [
    "Electronics",
    "Furniture", 
    "Clothing",
    "Books",
    "Home & Garden",
    "Sports",
    "Automotive",
    "Health & Beauty"
  ];

  const subCategories = {
    "Electronics": ["Smartphones", "Laptops", "Tablets", "Accessories"],
    "Furniture": ["Office Chairs", "Desks", "Storage", "Lighting"],
    "Clothing": ["Men's Wear", "Women's Wear", "Kids Wear", "Accessories"],
    "Books": ["Fiction", "Non-Fiction", "Educational", "Reference"],
    "Home & Garden": ["Kitchen", "Bathroom", "Garden Tools", "Decor"],
    "Sports": ["Fitness", "Outdoor", "Team Sports", "Equipment"],
    "Automotive": ["Parts", "Accessories", "Tools", "Maintenance"],
    "Health & Beauty": ["Skincare", "Haircare", "Supplements", "Tools"]
  };

  useEffect(() => {
    if (hsnData) {
      setFormData({
        hsnCode: hsnData.hsnCode || "",
        description: hsnData.description || "",
        taxRate: hsnData.taxRate || "",
        category: hsnData.category || "",
        subCategory: hsnData.subCategory || "",
        status: hsnData.status || "Active"
      });
    }
  }, [hsnData]);

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
          label="HSN/SAC Code"
          name="hsnCode"
          value={formData.hsnCode}
          onChange={handleChange}
          required
          placeholder="e.g., 8517, 8471"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Tax Rate (%)"
          name="taxRate"
          type="number"
          value={formData.taxRate}
          onChange={handleChange}
          required
          placeholder="e.g., 18, 12, 0"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FormControl fullWidth required>
          <InputLabel>Category</InputLabel>
          <Select
            name="category"
            value={formData.category}
            onChange={handleChange}
            label="Category"
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FormControl fullWidth required>
          <InputLabel>Subcategory</InputLabel>
          <Select
            name="subCategory"
            value={formData.subCategory}
            onChange={handleChange}
            label="Subcategory"
            disabled={!formData.category}
          >
            {formData.category && subCategories[formData.category]?.map((subCategory) => (
              <MenuItem key={subCategory} value={subCategory}>
                {subCategory}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <TextField
          fullWidth
          label="Description"
          name="description"
          multiline
          rows={3}
          value={formData.description}
          onChange={handleChange}
          required
          placeholder="Detailed description of the HSN code"
        />
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

export default EditHSN;