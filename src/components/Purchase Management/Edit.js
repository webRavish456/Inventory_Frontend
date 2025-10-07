"use client";
import { Button, Grid, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";

const EditPurchase = ({ purchaseData, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    supplierName: "",
    supplierContact: "",
    orderDate: "",
    expectedDeliveryDate: "",
    actualDeliveryDate: "",
    totalAmount: "",
    paidAmount: "",
    paymentStatus: "Pending",
    orderStatus: "Pending",
    paymentTerms: "30 Days",
    notes: "",
    createdBy: "",
    approvedBy: ""
  });

  const paymentStatuses = [
    "Paid",
    "Partial",
    "Pending"
  ];

  const orderStatuses = [
    "Pending",
    "Processing",
    "Delivered",
    "Cancelled"
  ];

  const paymentTermsOptions = [
    "15 Days",
    "30 Days",
    "45 Days",
    "60 Days"
  ];

  useEffect(() => {
    if (purchaseData) {
      setFormData({
        supplierName: purchaseData.supplierName || "",
        supplierContact: purchaseData.supplierContact || "",
        orderDate: purchaseData.orderDate || "",
        expectedDeliveryDate: purchaseData.expectedDeliveryDate || "",
        actualDeliveryDate: purchaseData.actualDeliveryDate || "",
        totalAmount: purchaseData.totalAmount || "",
        paidAmount: purchaseData.paidAmount || "",
        paymentStatus: purchaseData.paymentStatus || "Pending",
        orderStatus: purchaseData.orderStatus || "Pending",
        paymentTerms: purchaseData.paymentTerms || "30 Days",
        notes: purchaseData.notes || "",
        createdBy: purchaseData.createdBy || "",
        approvedBy: purchaseData.approvedBy || ""
      });
    }
  }, [purchaseData]);

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
          label="Supplier Name"
          name="supplierName"
          value={formData.supplierName}
          onChange={handleChange}
          required
          placeholder="Enter supplier name"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Supplier Contact"
          name="supplierContact"
          value={formData.supplierContact}
          onChange={handleChange}
          required
          placeholder="Enter supplier contact"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Order Date"
          name="orderDate"
          type="date"
          value={formData.orderDate}
          onChange={handleChange}
          required
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
          required
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Actual Delivery Date"
          name="actualDeliveryDate"
          type="date"
          value={formData.actualDeliveryDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Total Amount"
          name="totalAmount"
          type="number"
          value={formData.totalAmount}
          onChange={handleChange}
          required
          placeholder="Enter total amount"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Paid Amount"
          name="paidAmount"
          type="number"
          value={formData.paidAmount}
          onChange={handleChange}
          required
          placeholder="Enter paid amount"
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
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FormControl fullWidth required>
          <InputLabel>Order Status</InputLabel>
          <Select
            name="orderStatus"
            value={formData.orderStatus}
            onChange={handleChange}
            label="Order Status"
          >
            {orderStatuses.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FormControl fullWidth required>
          <InputLabel>Payment Terms</InputLabel>
          <Select
            name="paymentTerms"
            value={formData.paymentTerms}
            onChange={handleChange}
            label="Payment Terms"
          >
            {paymentTermsOptions.map((term) => (
              <MenuItem key={term} value={term}>
                {term}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Created By"
          name="createdBy"
          value={formData.createdBy}
          onChange={handleChange}
          required
          placeholder="Enter created by"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Approved By"
          name="approvedBy"
          value={formData.approvedBy}
          onChange={handleChange}
          required
          placeholder="Enter approved by"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 12 }}>
        <TextField
          fullWidth
          label="Notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          multiline
          rows={3}
          placeholder="Enter notes"
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
          Update
        </Button>
      </Grid>
    </Grid>
  );
};

export default EditPurchase;
