"use client";
import { Button, Grid, TextField, FormControl, InputLabel, Select, MenuItem, CircularProgress, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { fetchItems } from "@/lib/itemApi";
import { fetchWarehouses } from "@/lib/warehouseApi";
import { createStockTransfer } from "@/lib/stockApi";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const CreateStockTransfer = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    fromWarehouse: "",
    toWarehouse: "",
    items: [{
      itemId: "",
      quantity: "",
      unit: "",
      batchNumber: "",
      costPrice: ""
    }],
    transferDate: new Date().toISOString().split('T')[0],
    expectedDeliveryDate: "",
    reason: "",
    notes: ""
  });
  const [items, setItems] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    setFormData({ ...formData, [name]: value });
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index][field] = value;
    setFormData({ ...formData, items: updatedItems });
  };

  const addItemRow = () => {
    setFormData({
      ...formData,
      items: [...formData.items, {
        itemId: "",
        quantity: "",
        unit: "",
        batchNumber: "",
        costPrice: ""
      }]
    });
  };

  const removeItemRow = (index) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: updatedItems });
  };

  const handleSave = () => {
    if (!formData.fromWarehouse || !formData.toWarehouse || formData.items.length === 0) {
      setError("Please fill in all required fields and add at least one item");
      return;
    }
    if (onSave) {
      onSave(formData);
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
          <InputLabel>From Warehouse</InputLabel>
          <Select
            name="fromWarehouse"
            value={formData.fromWarehouse}
            onChange={handleChange}
            label="From Warehouse"
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
        <FormControl fullWidth required>
          <InputLabel>To Warehouse</InputLabel>
          <Select
            name="toWarehouse"
            value={formData.toWarehouse}
            onChange={handleChange}
            label="To Warehouse"
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
        <TextField
          fullWidth
          label="Transfer Date"
          name="transferDate"
          type="date"
          value={formData.transferDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Expected Delivery Date"
          name="expectedDeliveryDate"
          type="date"
          value={formData.expectedDeliveryDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Reason"
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          placeholder="Enter transfer reason"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Enter additional notes"
          multiline
          rows={2}
        />
      </Grid>
      
      <Grid size={{ xs: 12 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Items to Transfer</Typography>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell>Item</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Unit</TableCell>
                <TableCell>Batch #</TableCell>
                <TableCell>Cost Price</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {formData.items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <FormControl fullWidth size="small" required>
                      <Select
                        value={item.itemId}
                        onChange={(e) => handleItemChange(index, "itemId", e.target.value)}
                      >
                        {items.map((i) => (
                          <MenuItem key={i.id} value={i.id}>
                            {i.productName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <TextField
                      size="small"
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                      required
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      size="small"
                      value={item.unit}
                      onChange={(e) => handleItemChange(index, "unit", e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      size="small"
                      value={item.batchNumber}
                      onChange={(e) => handleItemChange(index, "batchNumber", e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      size="small"
                      type="number"
                      value={item.costPrice}
                      onChange={(e) => handleItemChange(index, "costPrice", e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => removeItemRow(index)}
                      color="error"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Button
          startIcon={<AddIcon />}
          onClick={addItemRow}
          variant="outlined"
          sx={{ textTransform: 'none' }}
        >
          Add Item
        </Button>
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

export default CreateStockTransfer;
