"use client";
import { Button, Grid, TextField, FormControl, InputLabel, Select, MenuItem, CircularProgress, Alert } from "@mui/material";
import { useState, useEffect } from "react";
import { fetchItems } from "@/lib/itemApi";
import { fetchCustomers } from "@/lib/customerApi";
import { updateStockInOut } from "@/lib/stockApi";

const EditStockOut = ({ stockData, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    itemId: "",
    quantity: "",
    perPiecePrice: "",
    totalCost: "",
    customerId: "",
    invoice: "",
    entryDate: "",
    paymentStatus: "pending"
  });

  const [items, setItems] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const paymentStatuses = ["Paid", "Pending", "Overdue"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const itemsRes = await fetchItems();
        const customersRes = await fetchCustomers();
        
        setItems(itemsRes || []);
        setCustomers(customersRes || []);
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

  useEffect(() => {
    if (stockData) {
      setFormData({
        itemId: stockData.itemId?._id || stockData.itemId || "",
        quantity: stockData.quantity || stockData.quantityOut || "",
        perPiecePrice: stockData.perPiecePrice || stockData.sellingPrice || "",
        totalCost: stockData.totalCost || stockData.totalSale || "",
        customerId: stockData.customerId || "",
        invoice: stockData.invoice || "",
        entryDate: stockData.entryDate ? new Date(stockData.entryDate).toISOString().split('T')[0] : "",
        paymentStatus: (stockData.paymentStatus || "pending").toLowerCase()
      });
    }
  }, [stockData]);

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
      setSaving(true);
      const payload = {
        itemId: formData.itemId,
        transactionType: "Stock Out",
        quantity: parseInt(formData.quantity),
        perPiecePrice: parseFloat(formData.perPiecePrice),
        totalCost: parseFloat(formData.totalCost),
        customerId: formData.customerId || null,
        invoice: formData.invoice,
        entryDate: formData.entryDate,
        paymentStatus: formData.paymentStatus
      };

      const response = await updateStockInOut(stockData.id || stockData._id, payload);
      if (response?.success) {
        setError("");
        if (onSave) {
          onSave(response.data);
        }
        onClose();
      } else {
        setError(response?.message || "Failed to update stock out record");
      }
    } catch (err) {
      setError("Error saving: " + (err.message || "Unknown error"));
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading || saving) {
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
          label="Quantity Out"
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
          placeholder="Enter selling price per unit"
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Total Sale"
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
          <InputLabel>Customer</InputLabel>
          <Select
            name="customerId"
            value={formData.customerId}
            onChange={handleChange}
            label="Customer"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {customers.map((customer) => (
              <MenuItem key={customer.id} value={customer.id}>
                {customer.customerName}
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
        <Button onClick={onClose} variant="outlined" disabled={saving}>
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained" sx={{ backgroundColor: "#1976D2" }} disabled={saving}>
          {saving ? "Updating..." : "Update"}
        </Button>
      </Grid>
    </Grid>
  );
};

export default EditStockOut;
