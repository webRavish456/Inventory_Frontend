import React from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Box
} from "@mui/material";

const Create = ({ formData, handleInputChange, handleCreate, handleClose }) => {
  return (
    <Grid container spacing={2}>
      <Grid size={{xs:12, sm:6}}>
        <TextField
          label="Income Name"
          fullWidth
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
        />
      </Grid>
      <Grid size={{xs:12, sm:6}}>
        <FormControl fullWidth>
          <InputLabel>Income Type</InputLabel>
          <Select
            value={formData.type}
            onChange={(e) => handleInputChange("type", e.target.value)}
            label="Income Type"
          >
            <MenuItem value="Training Services">Training Services</MenuItem>
            <MenuItem value="Consulting Services">Consulting Services</MenuItem>
            <MenuItem value="Software Services">Software Services</MenuItem>
            <MenuItem value="Design Services">Design Services</MenuItem>
            <MenuItem value="Evaluation Services">Evaluation Services</MenuItem>
            <MenuItem value="Setup Services">Setup Services</MenuItem>
            <MenuItem value="Compliance Services">Compliance Services</MenuItem>
            <MenuItem value="Development Services">Development Services</MenuItem>
            <MenuItem value="Analysis Services">Analysis Services</MenuItem>
            <MenuItem value="Report Services">Report Services</MenuItem>
            <MenuItem value="Analytics Services">Analytics Services</MenuItem>
            <MenuItem value="Maintenance Services">Maintenance Services</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid size={{xs:12, sm:6}}>
        <TextField
          label="Amount"
          type="number"
          fullWidth
          value={formData.amount}
          onChange={(e) => handleInputChange("amount", e.target.value)}
        />
      </Grid>
      <Grid size={{xs:12, sm:6}}>
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={formData.category}
            onChange={(e) => handleInputChange("category", e.target.value)}
            label="Category"
          >
            <MenuItem value="Training Services">Training Services</MenuItem>
            <MenuItem value="Consulting Services">Consulting Services</MenuItem>
            <MenuItem value="Software Services">Software Services</MenuItem>
            <MenuItem value="Design Services">Design Services</MenuItem>
            <MenuItem value="Evaluation Services">Evaluation Services</MenuItem>
            <MenuItem value="Setup Services">Setup Services</MenuItem>
            <MenuItem value="Compliance Services">Compliance Services</MenuItem>
            <MenuItem value="Development Services">Development Services</MenuItem>
            <MenuItem value="Analysis Services">Analysis Services</MenuItem>
            <MenuItem value="Report Services">Report Services</MenuItem>
            <MenuItem value="Analytics Services">Analytics Services</MenuItem>
            <MenuItem value="Maintenance Services">Maintenance Services</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid size={{xs:12, sm:6}}>
        <FormControl fullWidth>
          <InputLabel>Warehouse</InputLabel>
          <Select
            value={formData.warehouse}
            onChange={(e) => handleInputChange("warehouse", e.target.value)}
            label="Warehouse"
          >
            <MenuItem value="Main Warehouse">Main Warehouse</MenuItem>
            <MenuItem value="Branch Warehouse">Branch Warehouse</MenuItem>
            <MenuItem value="Storage Facility A">Storage Facility A</MenuItem>
            <MenuItem value="Storage Facility B">Storage Facility B</MenuItem>
            <MenuItem value="Cold Storage">Cold Storage</MenuItem>
            <MenuItem value="Distribution Center">Distribution Center</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid size={{xs:12, sm:6}}>
        <TextField
          label="Date"
          type="date"
          fullWidth
          value={formData.date}
          onChange={(e) => handleInputChange("date", e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid size={{xs:12, sm:6}}>
        <TextField
          label="Customer Name"
          fullWidth
          value={formData.client}
          onChange={(e) => handleInputChange("client", e.target.value)}
        />
      </Grid>
      <Grid size={{xs:12, sm:6}}>
      </Grid>
      <Grid size={{xs:12, sm:6}}>
        <FormControl fullWidth>
          <InputLabel>Payment Method</InputLabel>
          <Select 
            value={formData.paymentMethod}
            onChange={(e) => handleInputChange("paymentMethod", e.target.value)}
            label="Payment Method"
          >
            <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
            <MenuItem value="Cheque">Cheque</MenuItem>
            <MenuItem value="Cash">Cash</MenuItem>
            <MenuItem value="UPI">UPI</MenuItem>
            <MenuItem value="Credit Card">Credit Card</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid size={{xs:12, sm:6}}>
        <TextField
          label="Due Date"
          type="date"
          fullWidth
          value={formData.dueDate}
          onChange={(e) => handleInputChange("dueDate", e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid size={{xs:12, sm:6}}>
        <TextField
          label="Received Date"
          type="date"
          fullWidth
          value={formData.receivedDate}
          onChange={(e) => handleInputChange("receivedDate", e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid size={{xs:12}}>
        <TextField
          label="Description"
          multiline
          rows={3}
          fullWidth
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
        />
      </Grid>
      <Grid size={{xs:12}}>
        <Box sx={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end", marginTop: "1rem" }}>
          <button className="hrms-btn hrms-btn-secondary" onClick={handleClose}>
            Cancel
          </button>
          <button className="hrms-btn hrms-btn-primary" onClick={handleCreate}>
            Save
          </button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Create;