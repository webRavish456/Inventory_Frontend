'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Divider,
} from "@mui/material";
import { ArrowBack, Add, Delete, Edit } from "@mui/icons-material";

const EditProduct = () => {
  const params = useParams();
  // HSN Code to Tax Rate mapping
  const hsnTaxMapping = {
    '8517': 18, // Mobile phones, smartphones
    '8471': 18, // Laptops, computers
    '9401': 12, // Furniture, chairs
    '6911': 12, // Ceramic items
    '8518': 18, // Audio/video equipment
    '8473': 18, // Computer accessories
    '9403': 12, // Office furniture
    '7323': 18, // Kitchenware, steel items
    '8516': 18, // Electrical equipment
    '8421': 18, // Kitchen appliances
    '8510': 18, // Shaving equipment
    '8516': 18, // Electric heating equipment
    '8517': 18, // Telecommunication equipment
    '8471': 18, // Data processing machines
    '9401': 12, // Seats and furniture
    '6911': 12, // Ceramic tableware
    '7323': 18, // Table, kitchen articles
    '8518': 18, // Microphones, speakers
    '8473': 18, // Parts for computers
    '9403': 12, // Other furniture
  };

  const [formData, setFormData] = useState({
    // Basic Product Details
    productName: "Samsung Galaxy S24",
    category: "Electronics",
    subCategory: "Smartphones",
    brand: "Samsung",
    unitOfMeasure: "Pieces",
    description: "Latest Samsung Galaxy S24 with 128GB storage",
    
    // Pricing Details
    purchasePrice: 42000,
    sellingPrice: 45000,
    discountType: 'percentage',
    discountValue: 0,
    taxRate: 18,
    hsnCode: "8517",
    
    // Stock Details
    stock: 25,
    warehouseName: "Electronics Warehouse",
    batchNumber: "BATCH001",
    serialNumber: "SN001",
    
    // Additional Details
    productImageUrl: "samsung-s24.jpg",
    hasVariants: true,
    variants: [],
    attributes: []
  });

  const [variantForm, setVariantForm] = useState({
    variantType: '',
    variantValue: '',
    skuCode: '',
    purchasePrice: '',
    sellingPrice: '',
    stock: '',
    selectedAttributes: {},
    batchNumber: '',
    serialNumber: ''
  });

  const [attributeForm, setAttributeForm] = useState({
    attributeName: '',
    attributeValues: ''
  });

  useEffect(() => {
    // In real app, fetch product data by ID from API
    // For now, data is already initialized in useState
  }, [params.id]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Auto-calculate tax rate when HSN code is entered
    if (field === 'hsnCode' && value) {
      const taxRate = hsnTaxMapping[value] || '';
      if (taxRate) {
        setFormData(prev => ({
          ...prev,
          [field]: value,
          taxRate: taxRate
        }));
      }
    }

    // Reset discount value when discount type changes
    if (field === 'discountType') {
      setFormData(prev => ({
        ...prev,
        [field]: value,
        discountValue: ''
      }));
    }

    // Validate discount value
    if (field === 'discountValue' && value) {
      const numValue = parseFloat(value);
      if (formData.discountType === 'percentage' && numValue > 100) {
        setFormData(prev => ({
          ...prev,
          [field]: '100'
        }));
      } else if (formData.discountType === 'flat' && formData.sellingPrice && numValue > parseFloat(formData.sellingPrice)) {
        setFormData(prev => ({
          ...prev,
          [field]: formData.sellingPrice
        }));
      }
    }
  };

  const handleVariantInputChange = (field, value) => {
    setVariantForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAttributeInputChange = (field, value) => {
    setAttributeForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleVariantAttributeChange = (attributeName, value) => {
    setVariantForm(prev => ({
      ...prev,
      selectedAttributes: {
        ...prev.selectedAttributes,
        [attributeName]: value
      }
    }));
  };

  const addVariant = () => {
    if (variantForm.variantType && variantForm.variantValue && variantForm.skuCode) {
      const newVariant = {
        id: Date.now().toString(),
        ...variantForm
      };
      setFormData(prev => ({
        ...prev,
        variants: [...prev.variants, newVariant]
      }));
      setVariantForm({
        variantType: '',
        variantValue: '',
        skuCode: '',
        purchasePrice: '',
        sellingPrice: '',
        stock: '',
        selectedAttributes: {},
        batchNumber: '',
        serialNumber: ''
      });
    }
  };

  const removeVariant = (variantId) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.filter(v => v.id !== variantId)
    }));
  };

  const editVariant = (variant) => {
    setVariantForm(variant);
    removeVariant(variant.id);
  };

  const addAttribute = () => {
    if (attributeForm.attributeName && attributeForm.attributeValues) {
      const newAttribute = {
        id: Date.now().toString(),
        attributeName: attributeForm.attributeName,
        attributeValues: attributeForm.attributeValues.split(',').map(val => val.trim()).filter(val => val)
      };
      setFormData(prev => ({
        ...prev,
        attributes: [...prev.attributes, newAttribute]
      }));
      setAttributeForm({
        attributeName: '',
        attributeValues: ''
      });
    }
  };

  const removeAttribute = (attributeId) => {
    setFormData(prev => ({
      ...prev,
      attributes: prev.attributes.filter(a => a.id !== attributeId)
    }));
  };

  const editAttribute = (attribute) => {
    setAttributeForm({
      attributeName: attribute.attributeName,
      attributeValues: attribute.attributeValues.join(', ')
    });
    removeAttribute(attribute.id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated Product Data:', formData);
    // Here you would typically send data to API
    alert('Product updated successfully!');
    window.location.href = '/item/all-products';
  };

  const handleCancel = () => {
    window.history.back();
  };

  return (
    <div className="content-area">
      
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Basic Product Details */}
          <Grid size={{ xs: 12 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ marginBottom: 2, color: '#1976d2', fontWeight: 'bold' }}>
                  Basic Product Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Product Name *"
                      value={formData.productName}
                      onChange={(e) => handleInputChange('productName', e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth>
                      <InputLabel>Category *</InputLabel>
                      <Select
                        value={formData.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        required
                      >
                        <MenuItem value="Electronics">Electronics</MenuItem>
                        <MenuItem value="Furniture">Furniture</MenuItem>
                        <MenuItem value="Kitchenware">Kitchenware</MenuItem>
                        <MenuItem value="Clothing">Clothing</MenuItem>
                        <MenuItem value="Books">Books</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Sub Category"
                      value={formData.subCategory}
                      onChange={(e) => handleInputChange('subCategory', e.target.value)}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Brand *"
                      value={formData.brand}
                      onChange={(e) => handleInputChange('brand', e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth>
                      <InputLabel>Unit of Measure</InputLabel>
                      <Select
                        value={formData.unitOfMeasure}
                        onChange={(e) => handleInputChange('unitOfMeasure', e.target.value)}
                      >
                        <MenuItem value="Pieces">Pieces</MenuItem>
                        <MenuItem value="Kg">Kg</MenuItem>
                        <MenuItem value="Liters">Liters</MenuItem>
                        <MenuItem value="Meters">Meters</MenuItem>
                        <MenuItem value="Box">Box</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Description"
                      multiline
                      rows={3}
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Pricing Details */}
          <Grid size={{ xs: 12 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ marginBottom: 2, color: '#1976d2', fontWeight: 'bold' }}>
                  Pricing Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Purchase Price *"
                      type="number"
                      value={formData.purchasePrice}
                      onChange={(e) => handleInputChange('purchasePrice', e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Selling Price *"
                      type="number"
                      value={formData.sellingPrice}
                      onChange={(e) => handleInputChange('sellingPrice', e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth>
                      <InputLabel>Discount Type</InputLabel>
                      <Select
                        value={formData.discountType}
                        onChange={(e) => handleInputChange('discountType', e.target.value)}
                      >
                        <MenuItem value="percentage">Percentage (%)</MenuItem>
                        <MenuItem value="flat">Flat Amount (₹)</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label={formData.discountType === 'percentage' ? 'Discount %' : 'Discount Amount (₹)'}
                      type="number"
                      value={formData.discountValue}
                      onChange={(e) => handleInputChange('discountValue', e.target.value)}
                      inputProps={{
                        max: formData.discountType === 'percentage' ? 100 : formData.sellingPrice || undefined,
                        min: 0
                      }}
                      helperText={
                        formData.discountType === 'percentage' 
                          ? 'Maximum 100%' 
                          : `Maximum ₹${formData.sellingPrice || 0}`
                      }
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="HSN Code"
                      value={formData.hsnCode}
                      onChange={(e) => handleInputChange('hsnCode', e.target.value)}
                      helperText="Tax rate will be automatically calculated based on HSN code"
                      placeholder="e.g., 8517, 8471, 9401"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Tax Rate %"
                      type="number"
                      value={formData.taxRate}
                      onChange={(e) => handleInputChange('taxRate', e.target.value)}
                      helperText="Auto-calculated based on HSN code"
                      InputProps={{
                        readOnly: true,
                      }}
                      sx={{
                        '& .MuiInputBase-input': {
                          backgroundColor: '#f5f5f5',
                        }
                      }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Stock Details */}
          <Grid size={{ xs: 12 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ marginBottom: 2, color: '#1976d2', fontWeight: 'bold' }}>
                  Stock Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Stock *"
                      type="number"
                      value={formData.stock}
                      onChange={(e) => handleInputChange('stock', e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth>
                      <InputLabel>Warehouse Name</InputLabel>
                      <Select
                        value={formData.warehouseName}
                        onChange={(e) => handleInputChange('warehouseName', e.target.value)}
                      >
                        <MenuItem value="Main Warehouse">Main Warehouse</MenuItem>
                        <MenuItem value="Electronics Warehouse">Electronics Warehouse</MenuItem>
                        <MenuItem value="Furniture Warehouse">Furniture Warehouse</MenuItem>
                        <MenuItem value="Kitchenware Warehouse">Kitchenware Warehouse</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth>
                      <InputLabel>Batch Number</InputLabel>
                      <Select
                        value={formData.batchNumber}
                        onChange={(e) => handleInputChange('batchNumber', e.target.value)}
                        label="Batch Number"
                      >
                        <MenuItem value="BATCH001">BATCH001</MenuItem>
                        <MenuItem value="BATCH002">BATCH002</MenuItem>
                        <MenuItem value="BATCH003">BATCH003</MenuItem>
                        <MenuItem value="B2024001">B2024001</MenuItem>
                        <MenuItem value="B2024002">B2024002</MenuItem>
                        <MenuItem value="B2024003">B2024003</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth>
                      <InputLabel>Serial Number</InputLabel>
                      <Select
                        value={formData.serialNumber}
                        onChange={(e) => handleInputChange('serialNumber', e.target.value)}
                        label="Serial Number"
                      >
                        <MenuItem value="SN001">SN001</MenuItem>
                        <MenuItem value="SN002">SN002</MenuItem>
                        <MenuItem value="SN003">SN003</MenuItem>
                        <MenuItem value="SER2024001">SER2024001</MenuItem>
                        <MenuItem value="SER2024002">SER2024002</MenuItem>
                        <MenuItem value="SER2024003">SER2024003</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Attribute Values Section */}
            <Grid size={{ xs: 12 }}>
              <Box sx={{ backgroundColor: 'white', p: 3, borderRadius: 1, boxShadow: 1 }}>
                <Typography variant="h6" sx={{ marginBottom: 2, color: '#1976d2', fontWeight: 'bold' }}>
                  Attribute Values
                </Typography>
              <Typography variant="body2" sx={{ marginBottom: 3, color: '#666' }}>
                Configure the values for each attribute (e.g., Size: S, M, L)
              </Typography>
              
              {/* Add Attribute Form */}
              <Box sx={{ p: 2, mb: 3, backgroundColor: 'white', border: '1px solid #e0e0e0', borderRadius: 1 }}>
                    <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                      Add New Attribute
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          label="Attribute Name *"
                          value={attributeForm.attributeName}
                          onChange={(e) => handleAttributeInputChange('attributeName', e.target.value)}
                          placeholder="e.g., Size, Color, Storage"
                          required
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          label="Attribute Values *"
                          value={attributeForm.attributeValues}
                          onChange={(e) => handleAttributeInputChange('attributeValues', e.target.value)}
                          placeholder="e.g., S, M, L or Red, Blue, Green"
                          helperText="Separate multiple values with commas"
                          required
                        />
                      </Grid>
                      <Grid size={{ xs: 12 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                          <Button
                            variant="contained"
                            startIcon={<Add />}
                            onClick={addAttribute}
                            sx={{ minWidth: 150 }}
                          >
                            Add Attribute
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>

                  {/* Attributes List */}
                  {formData.attributes.length > 0 && (
                    <Box>
                      <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                        Configured Attributes ({formData.attributes.length})
                      </Typography>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Attribute Name</TableCell>
                            <TableCell>Values</TableCell>
                            <TableCell>Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {formData.attributes.map((attribute) => (
                            <TableRow key={attribute.id}>
                              <TableCell>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                  {attribute.attributeName}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                  {attribute.attributeValues.map((value, index) => (
                                    <Chip
                                      key={index}
                                      label={value}
                                      size="small"
                                      variant="outlined"
                                      color="primary"
                                    />
                                  ))}
                                </Box>
                              </TableCell>
                              <TableCell>
                                <IconButton
                                  size="small"
                                  onClick={() => editAttribute(attribute)}
                                  sx={{ color: '#ff9800', mr: 1 }}
                                >
                                  <Edit />
                                </IconButton>
                                <IconButton
                                  size="small"
                                  onClick={() => removeAttribute(attribute.id)}
                                  sx={{ color: '#f44336' }}
                                >
                                  <Delete />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Box>
                  )}
              </Box>
            </Grid>

          {/* Product Variants Management */}
            <Grid size={{ xs: 12 }}>
              <Box sx={{ backgroundColor: 'white', p: 3, borderRadius: 1, boxShadow: 1 }}>
                <Typography variant="h6" sx={{ marginBottom: 2, color: '#1976d2', fontWeight: 'bold' }}>
                  Product Variants Management
                </Typography>
              
              {/* Add Variant Form */}
              <Box sx={{ p: 2, mb: 3, backgroundColor: 'white', border: '1px solid #e0e0e0', borderRadius: 1 }}>
                    <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                      Add New Variant
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          label="Variant Name *"
                          value={variantForm.variantType}
                          onChange={(e) => handleVariantInputChange('variantType', e.target.value)}
                          placeholder="e.g., iPhone 15 Pro Max 256GB Blue"
                          required
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          label="SKU *"
                          value={variantForm.skuCode}
                          onChange={(e) => handleVariantInputChange('skuCode', e.target.value)}
                          placeholder="Unique SKU"
                          required
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          label="Stock Quantity"
                          type="number"
                          value={variantForm.stock}
                          onChange={(e) => handleVariantInputChange('stock', e.target.value)}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          label="Price (₹)"
                          type="number"
                          value={variantForm.sellingPrice}
                          onChange={(e) => handleVariantInputChange('sellingPrice', e.target.value)}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          label="Discount Price (₹)"
                          type="number"
                          value={variantForm.purchasePrice}
                          onChange={(e) => handleVariantInputChange('purchasePrice', e.target.value)}
                        />
                      </Grid>
                      
                      {/* Attributes Selection */}
                      {formData.attributes.length > 0 && (
                        <>
                          <Grid size={{ xs: 12 }}>
                            <Divider sx={{ my: 2 }}>
                              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                Attributes
                              </Typography>
                            </Divider>
                          </Grid>
                          {formData.attributes.map((attribute) => (
                            <Grid size={{ xs: 12, sm: 6 }} key={attribute.id}>
                              <FormControl fullWidth>
                                <InputLabel>{attribute.attributeName}</InputLabel>
                                <Select
                                  value={variantForm.selectedAttributes[attribute.attributeName] || ''}
                                  onChange={(e) => handleVariantAttributeChange(attribute.attributeName, e.target.value)}
                                  label={attribute.attributeName}
                                >
                                  {attribute.attributeValues.map((value) => (
                                    <MenuItem key={value} value={value}>
                                      {value}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>
                          ))}
                        </>
                      )}
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          label="Batch Number *"
                          value={variantForm.batchNumber}
                          onChange={(e) => handleVariantInputChange('batchNumber', e.target.value)}
                          placeholder="e.g., BATCH001, B2024001"
                          required
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          label="Serial Number *"
                          value={variantForm.serialNumber}
                          onChange={(e) => handleVariantInputChange('serialNumber', e.target.value)}
                          placeholder="e.g., SN001, SER2024001"
                          required
                        />
                      </Grid>
                      <Grid size={{ xs: 12 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                          <Button
                            variant="contained"
                            startIcon={<Add />}
                            onClick={addVariant}
                            sx={{ minWidth: 150 }}
                          >
                            Add Variant
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>

                  {/* Variants List */}
                  {formData.variants.length > 0 && (
                    <Box>
                      <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                        Added Variants ({formData.variants.length})
                      </Typography>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Variant Name</TableCell>
                            <TableCell>SKU Code</TableCell>
                            <TableCell>Attributes</TableCell>
                            <TableCell>Batch Number</TableCell>
                            <TableCell>Serial Number</TableCell>
                            <TableCell>Price (₹)</TableCell>
                            <TableCell>Discount Price (₹)</TableCell>
                            <TableCell>Stock</TableCell>
                            <TableCell>Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {formData.variants.map((variant) => (
                            <TableRow key={variant.id}>
                              <TableCell>{variant.variantType}</TableCell>
                              <TableCell>{variant.skuCode}</TableCell>
                              <TableCell>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                  {variant.selectedAttributes && Object.entries(variant.selectedAttributes).map(([key, value]) => (
                                    <Chip
                                      key={key}
                                      label={`${key}: ${value}`}
                                      size="small"
                                      variant="outlined"
                                      color="secondary"
                                    />
                                  ))}
                                </Box>
                              </TableCell>
                              <TableCell>{variant.batchNumber || '-'}</TableCell>
                              <TableCell>{variant.serialNumber || '-'}</TableCell>
                              <TableCell>₹{variant.sellingPrice || 0}</TableCell>
                              <TableCell>₹{variant.purchasePrice || 0}</TableCell>
                              <TableCell>{variant.stock || 0}</TableCell>
                              <TableCell>
                                <IconButton
                                  size="small"
                                  onClick={() => editVariant(variant)}
                                  sx={{ color: '#ff9800', mr: 1 }}
                                >
                                  <Edit />
                                </IconButton>
                                <IconButton
                                  size="small"
                                  onClick={() => removeVariant(variant.id)}
                                  sx={{ color: '#f44336' }}
                                >
                                  <Delete />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Box>
                  )}
              </Box>
            </Grid>

          {/* Action Buttons */}
          <Grid size={{ xs: 12 }}>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', marginTop: 2 }}>
              <Button
                variant="outlined"
                onClick={handleCancel}
                sx={{ minWidth: 120 }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{ minWidth: 120 }}
              >
                Update Product
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default EditProduct;
