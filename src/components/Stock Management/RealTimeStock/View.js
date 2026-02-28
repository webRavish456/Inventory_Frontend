import { Grid, Typography, Chip } from "@mui/material";

const ViewRealTimeStock = ({ stockData }) => {
  if (!stockData) return null;

  const getMovementColor = (movement) => {
    switch (movement) {
      case "Stock In":
        return "success";
      case "Stock Out":
        return "error";
      case "Stock Transfer":
        return "primary";
      default:
        return "default";
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="body2" sx={{ fontWeight: 600, color: '#666', mb: 0.5 }}>
          Item ID
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 500, color: '#1976d2' }}>
          {stockData._id}
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="body2" sx={{ fontWeight: 600, color: '#666', mb: 0.5 }}>
          Item Name
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          {stockData.itemId?.name || "N/A"}
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="body2" sx={{ fontWeight: 600, color: '#666', mb: 0.5 }}>
          SKU Code
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          {stockData.itemId?.sku || "N/A"}
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="body2" sx={{ fontWeight: 600, color: '#666', mb: 0.5 }}>
          Warehouse
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          {stockData.warehouseId?.name || "N/A"}
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="body2" sx={{ fontWeight: 600, color: '#666', mb: 0.5 }}>
          Current Stock
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          {stockData.currentStock}
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="body2" sx={{ fontWeight: 600, color: '#666', mb: 0.5 }}>
          Reserved Stock
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          {stockData.reservedStock || 0}
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="body2" sx={{ fontWeight: 600, color: '#666', mb: 0.5 }}>
          Available Stock
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          {stockData.availableStock}
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="body2" sx={{ fontWeight: 600, color: '#666', mb: 0.5 }}>
          Last Movement
        </Typography>
        <Chip 
          label={stockData.movement} 
          color={getMovementColor(stockData.movement)}
          size="small"
          sx={{ fontWeight: 500 }}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="body2" sx={{ fontWeight: 600, color: '#666', mb: 0.5 }}>
          Movement Quantity
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          {stockData.movementQuantity || 0}
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="body2" sx={{ fontWeight: 600, color: '#666', mb: 0.5 }}>
          Last Updated
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          {new Date(stockData.updatedAt).toLocaleString()}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ViewRealTimeStock;
