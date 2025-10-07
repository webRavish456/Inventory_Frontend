"use client";
import { Button, Grid, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";

const EditStockOut = ({ stockData, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    productName: "",
    quantityOut: "",
    sellingPrice: "",
    totalSale: "",
    transactionType: "Sale",
    customerId: "",
    customerName: "",
    invoice: "",
    dateOfStockOut: "",
    paymentMode: "Cash"
  });

  const products = [
    "Samsung Galaxy S24",
    "Dell Laptop Inspiron 15",
    "Office Chair Ergonomic",
    "iPhone 15 Pro",
    "MacBook Air M2",
    "Gaming Chair Pro"
  ];

  const customers = [
    "CUST001 - John Doe",
    "CUST002 - Jane Smith",
    "CUST003 - Mike Johnson",
    "CUST004 - Sarah Wilson",
    "CUST005 - David Brown"
  ];

  const transactionTypes = [
    "Sale",
    "Return to Supplier"
  ];

  const paymentModes = [
    "Cash",
    "Credit Card",
    "Bank Transfer",
    "UPI",
    "Cheque"
  ];

  useEffect(() => {
    if (stockData) {
      setFormData({
        productName: stockData.productName || "",
        quantityOut: stockData.quantityOut || "",
        sellingPrice: stockData.sellingPrice || "",
        totalSale: stockData.totalSale || "",
        transactionType: stockData.transactionType || "Sale",
        customerId: stockData.customerId || "",
        customerName: stockData.customerName || "",
        invoice: stockData.invoice || "",
        dateOfStockOut: stockData.dateOfStockOut || "",
        paymentMode: stockData.paymentMode || "Cash"
      });
    }
  }, [stockData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Auto-calculate total sale
    if (name === "quantityOut" || name === "sellingPrice") {
      const quantity = name === "quantityOut" ? value : formData.quantityOut;
      const price = name === "sellingPrice" ? value : formData.sellingPrice;
      if (quantity && price) {
        setFormData(prev => ({ ...prev, totalSale: (parseFloat(quantity) * parseFloat(price)).toString() }));
      }
    }

    // Auto-populate customer name when customer ID is selected
    if (name === "customerId") {
      const selectedCustomer = customers.find(c => c === value);
      if (selectedCustomer) {
        const customerName = selectedCustomer.split(' - ')[1];
        setFormData(prev => ({ ...prev, customerName }));
      }
    }
  };

  const handleSave = () => {
    if (onSave) {
      onSave(formData);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 6 }}>
        <FormControl fullWidth required>
          <InputLabel>Product Name</InputLabel>
          <Select
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            label="Product Name"
          >
            {products.map((product) => (
              <MenuItem key={product} value={product}>
                {product}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Quantity Out"
          name="quantityOut"
          type="number"
          value={formData.quantityOut}
          onChange={handleChange}
          required
          placeholder="Enter quantity"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Selling Price (per)"
          name="sellingPrice"
          type="number"
          value={formData.sellingPrice}
          onChange={handleChange}
          required
          placeholder="Enter selling price per unit"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Total Sale"
          name="totalSale"
          value={formData.totalSale}
          onChange={handleChange}
          required
          placeholder="Auto-calculated"
          InputProps={{ readOnly: true }}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FormControl fullWidth required>
          <InputLabel>Transaction Type</InputLabel>
          <Select
            name="transactionType"
            value={formData.transactionType}
            onChange={handleChange}
            label="Transaction Type"
          >
            {transactionTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FormControl fullWidth required>
          <InputLabel>Customer ID/Name</InputLabel>
          <Select
            name="customerId"
            value={formData.customerId}
            onChange={handleChange}
            label="Customer ID/Name"
          >
            {customers.map((customer) => (
              <MenuItem key={customer} value={customer}>
                {customer}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Invoice"
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
          label="Date of Stock Out"
          name="dateOfStockOut"
          type="date"
          value={formData.dateOfStockOut}
          onChange={handleChange}
          required
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <FormControl fullWidth required>
          <InputLabel>Payment Mode</InputLabel>
          <Select
            name="paymentMode"
            value={formData.paymentMode}
            onChange={handleChange}
            label="Payment Mode"
          >
            {paymentModes.map((mode) => (
              <MenuItem key={mode} value={mode}>
                {mode}
              </MenuItem>
            ))}
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

export default EditStockOut;
