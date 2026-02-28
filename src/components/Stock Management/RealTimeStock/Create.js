"use client";
import { Button, Grid, TextField, FormControl, InputLabel, Select, MenuItem, CircularProgress, Alert } from "@mui/material";
import { useState, useEffect } from "react";
import { fetchItems } from "@/lib/itemApi";
import { fetchWarehouses } from "@/lib/warehouseApi";

const CreateRealTimeStock = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    itemId: "",
    warehouseId: "",
    currentStock: "",
    availableStock: "",
    reservedStock: "",
    movement: "",
    movementQuantity: ""
  });
  const [items, setItems] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const movements = ["Stock In", "Stock Out", "Stock Transfer"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const itemsRes = await fetchItems();
        const warehousesRes = await fetchWarehouses();
        
        setItems(itemsRes || []);
        setWarehouses(warehousesRes || []);
      } catch (err) {
        setError(err.message);
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

  const handleSave = () => {
    if (
      !formData.itemId ||
      !formData.warehouseId ||
      !formData.currentStock ||
      !formData.availableStock ||
      !formData.movement ||
      !formData.movementQuantity
    ) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");
    onSave(formData);
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

      {/* Item/Product */}
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

      {/* Warehouse */}
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

      {/* Current Stock */}
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

      {/* Available Stock */}
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

      {/* Reserved Stock */}
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Reserved Stock"
          name="reservedStock"
          type="number"
          value={formData.reservedStock}
          onChange={handleChange}
          placeholder="Enter reserved stock"
        />
      </Grid>

      {/* Movement Type */}
      <Grid size={{ xs: 12, md: 6 }}>
        <FormControl fullWidth required>
          <InputLabel>Movement Type</InputLabel>
          <Select
            name="movement"
            value={formData.movement}
            onChange={handleChange}
            label="Movement Type"
          >
            {movements.map((movement) => (
              <MenuItem key={movement} value={movement}>
                {movement}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* Movement Quantity */}
      <Grid size={{ xs: 12 }}>
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

      {/* Actions */}
      <Grid size={{ xs: 12 }} display="flex" justifyContent="flex-end" gap={2}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{ textTransform: 'none' }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          sx={{
            backgroundColor: '#1976D2',
            '&:hover': { backgroundColor: '#1565C0' },
            textTransform: 'none'
          }}
        >
          Save
        </Button>
      </Grid>

    </Grid>
  );
};

export default CreateRealTimeStock;