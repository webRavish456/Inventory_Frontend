'use client';

import React, { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Typography,
  TextField,
  InputAdornment,
  Pagination,
  Stack,
} from "@mui/material";
import { Search, Add, VisibilityOutlined, EditOutlined, DeleteOutlined } from "@mui/icons-material";

const Stock = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);

  // Stock data based on spreadsheet specifications
  const [stockData, setStockData] = useState([
    {
      id: "STK001",
      stockId: "STK001",
      productName: "Samsung Galaxy S24",
      skuCode: "SGS24-128GB",
      warehouseName: "Electronics Warehouse",
      currentStock: 25,
      reservedStock: 5,
      availableStock: 20,
      reorderLevel: 5,
      maxStock: 50,
      unitPrice: 45000,
      totalValue: 1125000,
      lastUpdated: "2024-09-20",
      batchNumber: "BATCH001",
      expiryDate: "2025-12-31",
      status: "In Stock"
    },
    {
      id: "STK002",
      stockId: "STK002",
      productName: "Dell Laptop Inspiron 15",
      skuCode: "DLI15-512GB",
      warehouseName: "Electronics Warehouse",
      currentStock: 15,
      reservedStock: 2,
      availableStock: 13,
      reorderLevel: 3,
      maxStock: 30,
      unitPrice: 55000,
      totalValue: 825000,
      lastUpdated: "2024-09-18",
      batchNumber: "BATCH002",
      expiryDate: "2025-06-30",
      status: "In Stock"
    },
    {
      id: "STK003",
      stockId: "STK003",
      productName: "Office Chair Ergonomic",
      skuCode: "OCE-001",
      warehouseName: "Furniture Warehouse",
      currentStock: 8,
      reservedStock: 1,
      availableStock: 7,
      reorderLevel: 2,
      maxStock: 20,
      unitPrice: 12000,
      totalValue: 96000,
      lastUpdated: "2024-09-15",
      batchNumber: "BATCH003",
      expiryDate: "2026-03-31",
      status: "Low Stock"
    },
    {
      id: "STK004",
      stockId: "STK004",
      productName: "Coffee Mug Ceramic",
      skuCode: "CMC-001",
      warehouseName: "Main Warehouse",
      currentStock: 50,
      reservedStock: 10,
      availableStock: 40,
      reorderLevel: 10,
      maxStock: 100,
      unitPrice: 150,
      totalValue: 7500,
      lastUpdated: "2024-09-20",
      batchNumber: "BATCH004",
      expiryDate: "2025-12-31",
      status: "In Stock"
    },
    {
      id: "STK005",
      stockId: "STK005",
      productName: "LED TV 55 inch",
      skuCode: "LTV55-4K",
      warehouseName: "Electronics Warehouse",
      currentStock: 12,
      reservedStock: 3,
      availableStock: 9,
      reorderLevel: 2,
      maxStock: 25,
      unitPrice: 35000,
      totalValue: 420000,
      lastUpdated: "2024-09-18",
      batchNumber: "BATCH005",
      expiryDate: "2025-08-31",
      status: "In Stock"
    }
  ]);

  const filteredStock = stockData.filter(stock =>
    stock.productName.toLowerCase().includes(search.toLowerCase()) ||
    stock.skuCode.toLowerCase().includes(search.toLowerCase()) ||
    stock.warehouseName.toLowerCase().includes(search.toLowerCase()) ||
    stock.batchNumber.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "In Stock":
        return "hrms-badge-success";
      case "Low Stock":
        return "hrms-badge-warning";
      case "Out of Stock":
        return "hrms-badge-error";
      default:
        return "hrms-badge-neutral";
    }
  };

  const getStockLevelColor = (current, reorder) => {
    if (current <= reorder) return "hrms-badge-error";
    if (current <= reorder * 2) return "hrms-badge-warning";
    return "hrms-badge-success";
  };

  return (
    <div className="content-area">
      
      {/* Search and Create Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
        <TextField
          placeholder="Search stock..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{ width: "300px", "& .MuiOutlinedInput-root": { height: "40px" } }}
        />
        <button
          className="hrms-btn hrms-btn-primary"
          style={{ height: "40px" }}
        >
          <Add />
          Add Stock Entry
        </button>
      </Box>

      {/* Stock Table */}
      <Box className="hrms-card">
        <Box className="hrms-card-content" sx={{ padding: 0 }}>
          <Table className="hrms-table">
            <TableHead>
              <TableRow>
                <TableCell>S. No.</TableCell>
                <TableCell>Stock Id</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>SKU Code</TableCell>
                <TableCell>Warehouse Name</TableCell>
                <TableCell>Current Stock</TableCell>
                <TableCell>Reserved Stock</TableCell>
                <TableCell>Available Stock</TableCell>
                <TableCell>Reorder Level</TableCell>
                <TableCell>Max Stock</TableCell>
                <TableCell>Unit Price</TableCell>
                <TableCell>Total Value</TableCell>
                <TableCell>Batch Number</TableCell>
                <TableCell>Expiry Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Last Updated</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStock
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((stock, index) => (
                  <TableRow key={stock.id}>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>{stock.stockId}</TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {stock.productName}
                      </Typography>
                    </TableCell>
                    <TableCell>{stock.skuCode}</TableCell>
                    <TableCell>{stock.warehouseName}</TableCell>
                    <TableCell>
                      <Box className={`hrms-badge ${getStockLevelColor(stock.currentStock, stock.reorderLevel)}`}>
                        {stock.currentStock}
                      </Box>
                    </TableCell>
                    <TableCell>{stock.reservedStock}</TableCell>
                    <TableCell>{stock.availableStock}</TableCell>
                    <TableCell>{stock.reorderLevel}</TableCell>
                    <TableCell>{stock.maxStock}</TableCell>
                    <TableCell>₹{stock.unitPrice.toLocaleString()}</TableCell>
                    <TableCell>₹{stock.totalValue.toLocaleString()}</TableCell>
                    <TableCell>{stock.batchNumber}</TableCell>
                    <TableCell>{stock.expiryDate}</TableCell>
                    <TableCell>
                      <Box className={`hrms-badge ${getStatusColor(stock.status)}`}>
                        {stock.status}
                      </Box>
                    </TableCell>
                    <TableCell>{stock.lastUpdated}</TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: "0.25rem" }}>
                        <IconButton 
                          size="small"
                          sx={{ color: "#1976D2", fontSize: "16px" }}
                        >
                          <VisibilityOutlined />
                        </IconButton>
                        <IconButton 
                          size="small"
                          sx={{ color: "#000", fontSize: "16px" }}
                        >
                          <EditOutlined />
                        </IconButton>
                        <IconButton 
                          size="small"
                          sx={{ color: "#d32f2f", fontSize: "16px" }}
                        >
                          <DeleteOutlined />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>

        <Box sx={{ padding: "0.75rem 1rem", borderTop: "1px solid #e5e5e5", backgroundColor: "#fafafa" }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" sx={{ color: "#333", fontWeight: 500, fontSize: "0.875rem" }}>
              Showing {page * rowsPerPage + 1} to {Math.min((page + 1) * rowsPerPage, filteredStock.length)} of {filteredStock.length} stock items
            </Typography>
            <Pagination
              count={Math.ceil(filteredStock.length / rowsPerPage)}
              page={page + 1}
              onChange={(_, newPage) => setPage(newPage - 1)}
              color="primary"
              size="small"
            />
          </Stack>
        </Box>
      </Box>
    </div>
  );
};

export default Stock;
