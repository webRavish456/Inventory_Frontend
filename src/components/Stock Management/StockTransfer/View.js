import { Grid, Typography, Chip } from "@mui/material";

const ViewStockTransfer = ({ transferData }) => {
  if (!transferData) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "success";
      case "In Transit":
        return "warning";
      case "Pending":
        return "default";
      case "Cancelled":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="body2" sx={{ fontWeight: 600, color: '#666', mb: 0.5 }}>
          Transfer ID
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 500, color: '#1976d2' }}>
          {transferData.transferId}
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="body2" sx={{ fontWeight: 600, color: '#666', mb: 0.5 }}>
          Status
        </Typography>
        <Chip 
          label={transferData.status} 
          color={getStatusColor(transferData.status)}
          size="small"
          sx={{ fontWeight: 500 }}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="body2" sx={{ fontWeight: 600, color: '#666', mb: 0.5 }}>
          Product Name
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          {transferData.productName}
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="body2" sx={{ fontWeight: 600, color: '#666', mb: 0.5 }}>
          From Warehouse
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          {transferData.fromWarehouse}
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="body2" sx={{ fontWeight: 600, color: '#666', mb: 0.5 }}>
          To Warehouse
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          {transferData.toWarehouse}
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="body2" sx={{ fontWeight: 600, color: '#666', mb: 0.5 }}>
          Transfer Quantity
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          {transferData.transferQuantity}
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="body2" sx={{ fontWeight: 600, color: '#666', mb: 0.5 }}>
          Transfer Date
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          {transferData.transferDate}
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="body2" sx={{ fontWeight: 600, color: '#666', mb: 0.5 }}>
          Transfer Reason
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          {transferData.transferReason}
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="body2" sx={{ fontWeight: 600, color: '#666', mb: 0.5 }}>
          Transfer By
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          {transferData.transferBy}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ViewStockTransfer;
