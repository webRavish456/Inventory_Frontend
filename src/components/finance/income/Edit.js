"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, MenuItem
} from "@mui/material";

export default function EditIncome({ open, onClose, income, onUpdate }) {
  const [formData, setFormData] = useState(income || {});

  useEffect(() => {
    if (income) setFormData(income);
  }, [income]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    onUpdate(formData);
    onClose();
  };

  if (!income) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Income</DialogTitle>
      <DialogContent>
        <TextField fullWidth margin="dense" label="Income Type" name="incomeType" value={formData.incomeType} onChange={handleChange} />
        <TextField fullWidth margin="dense" type="date" label="Date" name="date" value={formData.date} InputLabelProps={{ shrink: true }} onChange={handleChange} />
        <TextField fullWidth margin="dense" label="Received From" name="receivedFrom" value={formData.receivedFrom} onChange={handleChange} />
        <TextField fullWidth margin="dense" label="Amount" type="number" name="amount" value={formData.amount} onChange={handleChange} />
        <TextField fullWidth margin="dense" select label="Payment Mode" name="paymentMode" value={formData.paymentMode} onChange={handleChange}>
          <MenuItem value="Cash">Cash</MenuItem>
          <MenuItem value="UPI">UPI</MenuItem>
          <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
        </TextField>
        <TextField fullWidth margin="dense" label="Reference No." name="referenceNo" value={formData.referenceNo} onChange={handleChange} />
        <TextField fullWidth margin="dense" select label="Status" name="status" value={formData.status} onChange={handleChange}>
          <MenuItem value="Received">Received</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleUpdate}>Update</Button>
      </DialogActions>
    </Dialog>
  );
}