"use client";
import { Button, Grid, TextField, FormControl, InputLabel, Select, MenuItem, CircularProgress, Alert } from "@mui/material";
import { useState, useEffect } from "react";
import { fetchItems } from "@/lib/itemApi";
import { fetchSuppliers } from "@/lib/supplierApi";
import { createStockInOut } from "@/lib/stockApi";

const CreateStockIn = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    itemId: "",
    transactionType: "Stock In",
    quantity: "",
    perPiecePrice: "",
    totalCost: "",
    supplierId: "",
    invoice: "",
    entryDate: new Date().toISOString().split('T')[0],
    paymentStatus: "pending"
  });
  const [items, setItems] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const paymentStatuses = ["Paid", "Pending", "Overdue"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const itemsRes = await fetchItems();
        const suppliersRes = await fetchSuppliers();
        
        setItems(itemsRes || []);
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

    // Auto-calculate total cost when quantity or price changes
    if (name === "quantity" || name === "perPiecePrice") {
      const quantity = name === "quantity" ? value : formData.quantity;
      const price = name === "perPiecePrice" ? value : formData.perPiecePrice;
      if (quantity && price) {
        const total = (parseFloat(quantity) * parseFloat(price)).toString();
        setFormData((prev) => ({ ...prev, totalCost: total }));
      }
    }
  };

  const handleSave = async () => {
    if (!formData.itemId || !formData.quantity || !formData.perPiecePrice) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        itemId: formData.itemId,
        transactionType: formData.transactionType,
        quantity: parseInt(formData.quantity),
        perPiecePrice: parseFloat(formData.perPiecePrice),
        totalCost: parseFloat(formData.totalCost),
        supplierId: formData.supplierId || null,
        invoice: formData.invoice,
        entryDate: formData.entryDate,
        paymentStatus: formData.paymentStatus
      };

      const response = await createStockInOut(payload);
      if (response?.success) {
        setError("");
        if (onSave) {
          onSave(response.data);
        }
        onClose();
      } else {
        setError(response?.message || "Failed to save stock in record");
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
          <InputLabel>Product/Item</InputLabel>
          <Select
            name="itemId"
            value={formData.itemId}
            onChange={handleChange}
            label="Product/Item"
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
        <TextField
          fullWidth
          label="Quantity In"
          name="quantity"
          type="number"
          value={formData.quantity}
          onChange={handleChange}
          required
          placeholder="Enter quantity"
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Per Piece Price"
          name="perPiecePrice"
          type="number"
          value={formData.perPiecePrice}
          onChange={handleChange}
          required
          placeholder="Enter purchase price per unit"
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Total Cost"
          name="totalCost"
          type="number"
          value={formData.totalCost}
          onChange={handleChange}
          disabled
          placeholder="Auto-calculated"
        />
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
          label="Invoice Number"
          name="invoice"
          value={formData.invoice}
          onChange={handleChange}
          required
          placeholder="Enter invoice number"
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Entry Date"
          name="entryDate"
          type="date"
          value={formData.entryDate}
          onChange={handleChange}
          required
          InputLabelProps={{ shrink: true }}
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
              <MenuItem key={status} value={status.toLowerCase()}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid size={{ xs: 12 }} display="flex" justifyContent="flex-end" gap={2}>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained" sx={{ backgroundColor: "#1976D2" }}>
          Save Stock In
        </Button>
      </Grid>
    </Grid>
  );
};

export default CreateStockIn;
