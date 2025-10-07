import { Grid, Typography, Chip } from "@mui/material";

const ViewSupplier = ({ supplierData }) => {
  if (!supplierData) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "success";
      case "Inactive":
        return "error";
      default:
        return "default";
    }
  };

  const getSupplierTypeColor = (type) => {
    switch (type) {
      case "Electronics":
        return "primary";
      case "Furniture":
        return "success";
      case "Kitchenware":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="body2" sx={{ fontWeight: 600, color: '#666', mb: 0.5 }}>
          Supplier ID
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 500, color: '#1976d2' }}>
          {supplierData.supplierId}
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="body2" sx={{ fontWeight: 600, color: '#666', mb: 0.5 }}>
          Status
        </Typography>
        <Chip 
          label={supplierData.status} 
          color={getStatusColor(supplierData.status)}
          size="small"
          sx={{ fontWeight: 500 }}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="body2" sx={{ fontWeight: 600, color: '#666', mb: 0.5 }}>
          Supplier Name
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          {supplierData.supplierName}
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="body2" sx={{ fontWeight: 600, color: '#666', mb: 0.5 }}>
          Contact Person
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          {supplierData.contactPerson}
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="body2" sx={{ fontWeight: 600, color: '#666', mb: 0.5 }}>
          Email
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          {supplierData.email}
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="body2" sx={{ fontWeight: 600, color: '#666', mb: 0.5 }}>
          Phone
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          {supplierData.phone}
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="body2" sx={{ fontWeight: 600, color: '#666', mb: 0.5 }}>
          City
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          {supplierData.city}
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="body2" sx={{ fontWeight: 600, color: '#666', mb: 0.5 }}>
          State
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          {supplierData.state}
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="body2" sx={{ fontWeight: 600, color: '#666', mb: 0.5 }}>
          GST Number
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 500, fontFamily: 'monospace' }}>
          {supplierData.gstNumber}
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="body2" sx={{ fontWeight: 600, color: '#666', mb: 0.5 }}>
          Supplier Type
        </Typography>
        <Chip 
          label={supplierData.supplierType} 
          color={getSupplierTypeColor(supplierData.supplierType)}
          size="small"
          sx={{ fontWeight: 500 }}
        />
      </Grid>
    </Grid>
  );
};

export default ViewSupplier;