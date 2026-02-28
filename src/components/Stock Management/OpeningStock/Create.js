"use client";
import { Button, Grid, TextField, FormControl, InputLabel, Select, MenuItem, CircularProgress, Alert } from "@mui/material";
import { useState, useEffect } from "react";
import { fetchItems } from "@/lib/itemApi";
import { fetchWarehouses } from "@/lib/warehouseApi";
import { fetchSuppliers } from "@/lib/supplierApi";
import { createOpeningStock } from "@/lib/stockApi";

const CreateOpeningStock = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    itemId: "",
    warehouseId: "",
    supplierId: "",
    quantity: "",
    unitPrice: "",
    openingDate: new Date().toISOString().split('T')[0]
  });
  const [items, setItems] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const itemsRes = await fetchItems();
        const warehousesRes = await fetchWarehouses();
        const suppliersRes = await fetchSuppliers();
        
        setItems(itemsRes || []);
        setWarehouses(warehousesRes || []);
        setSuppliers(suppliersRes || []);
        setError("");
      } catch (err) {
        setError("Failed to load data: " + (err.message || "Unknown error"));
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!formData.itemId || !formData.warehouseId || !formData.quantity || !formData.unitPrice) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        itemId: formData.itemId,
        warehouseId: formData.warehouseId,
        supplierId: formData.supplierId || null,
        quantity: parseInt(formData.quantity),
        unitPrice: parseFloat(formData.unitPrice),
        openingDate: formData.openingDate
      };

      const response = await createOpeningStock(payload);
      if (response?.success) {
        setError("");
        if (onSave) {
          onSave(response.data);
        }
        onClose();
      } else {
        setError(response?.message || "Failed to save opening stock");
      }
    } catch (err) {
      setError("Error saving: " + (err.message || "Unknown error"));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ minHeight: "200px" }}>
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <Grid container spacing={2}>
      {error && (
        <Grid size={{ xs: 12 }}>
          <Alert severity="error">{error}</Alert>
        </Grid>
      )}
      <Grid size={{ xs: 12, md: 6 }}>
        <FormControl fullWidth required>
          <InputLabel>Item/Product</InputLabel>
          <Select
            name="itemId"
            value={formData.itemId}
            onChange={handleChange}
            label="Item/Product"
          >
            {items.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.productName} (SKU: {item.skuCode})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FormControl fullWidth required>
          <InputLabel>Warehouse</InputLabel>
          <Select
            name="warehouseId"
            value={formData.warehouseId}
            onChange={handleChange}
            label="Warehouse"
          >
            {warehouses.map((warehouse) => (
              <MenuItem key={warehouse.id} value={warehouse.id}>
                {warehouse.warehouseName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FormControl fullWidth>
          <InputLabel>Supplier</InputLabel>
          <Select
            name="supplierId"
            value={formData.supplierId}
            onChange={handleChange}
            label="Supplier"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {suppliers.map((supplier) => (
              <MenuItem key={supplier.id} value={supplier.id}>
                {supplier.supplierName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Opening Quantity"
          name="quantity"
          type="number"
          value={formData.quantity}
          onChange={handleChange}
          required
          placeholder="Enter opening quantity"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Unit Price"
          name="unitPrice"
          type="number"
          value={formData.unitPrice}
          onChange={handleChange}
          required
          placeholder="Enter unit price"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Opening Date"
          name="openingDate"
          type="date"
          value={formData.openingDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
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

export default CreateOpeningStock;
