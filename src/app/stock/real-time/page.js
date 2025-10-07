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
import CommonDialog from '../../../components/CommonDialog';
import CreateRealTimeStock from '../../../components/Stock Management/RealTimeStock/Create';
import EditRealTimeStock from '../../../components/Stock Management/RealTimeStock/Edit';
import ViewRealTimeStock from '../../../components/Stock Management/RealTimeStock/View';
import DeleteRealTimeStock from '../../../components/Stock Management/RealTimeStock/Delete';

const RealTimeStock = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  const [openData, setOpenData] = useState(false);
  const [viewShow, setViewShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);

  // Real-time stock data
  const [realTimeStockData, setRealTimeStockData] = useState([
    {
      id: "RT001",
      stockId: "RT001",
      productName: "Samsung Galaxy S24",
      warehouseName: "Electronics Warehouse",
      currentStock: 25,
      reservedStock: 5,
      availableStock: 20,
      lastMovement: "Stock In",
      movementQuantity: 10,
      movementDate: "2024-09-20 14:30:00"
    },
    {
      id: "RT002",
      stockId: "RT002",
      productName: "Dell Laptop Inspiron 15",
      warehouseName: "Electronics Warehouse",
      currentStock: 15,
      reservedStock: 3,
      availableStock: 12,
      lastMovement: "Stock Out",
      movementQuantity: 5,
      movementDate: "2024-09-20 12:15:00"
    },
    {
      id: "RT003",
      stockId: "RT003",
      productName: "Office Chair Ergonomic",
      warehouseName: "Furniture Warehouse",
      currentStock: 8,
      reservedStock: 2,
      availableStock: 6,
      lastMovement: "Stock Transfer",
      movementQuantity: 3,
      movementDate: "2024-09-20 10:45:00"
    }
  ]);

  const filteredStock = realTimeStockData.filter(stock =>
    stock.productName.toLowerCase().includes(search.toLowerCase()) ||
    stock.warehouseName.toLowerCase().includes(search.toLowerCase()) ||
    stock.lastMovement.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Updated":
        return "hrms-badge-success";
      case "Pending":
        return "hrms-badge-warning";
      case "Error":
        return "hrms-badge-error";
      default:
        return "hrms-badge-neutral";
    }
  };

  const getMovementColor = (movement) => {
    switch (movement) {
      case "Stock In":
        return "hrms-badge-success";
      case "Stock Out":
        return "hrms-badge-error";
      case "Stock Transfer":
        return "hrms-badge-primary";
      default:
        return "hrms-badge-neutral";
    }
  };

  const handleCreateStock = () => {
    setSelectedStock(null);
    setOpenData(true);
  };

  const handleViewStock = (stock) => {
    setSelectedStock(stock);
    setViewShow(true);
  };

  const handleEditStock = (stock) => {
    setSelectedStock(stock);
    setEditShow(true);
  };

  const handleDeleteStock = (stock) => {
    setSelectedStock(stock);
    setDeleteShow(true);
  };

  const handleSaveStock = (formData) => {
    if (editShow) {
      setRealTimeStockData(realTimeStockData.map(stock => 
        stock.id === selectedStock.id 
          ? { ...stock, ...formData, movementDate: new Date().toLocaleString() }
          : stock
      ));
    } else {
      const newStock = {
        id: Date.now().toString(),
        stockId: `RT${String(realTimeStockData.length + 1).padStart(3, '0')}`,
        ...formData,
        createdDate: new Date().toLocaleDateString(),
        movementDate: new Date().toLocaleString()
      };
      setRealTimeStockData([...realTimeStockData, newStock]);
    }
    handleClose();
  };

  const handleDeleteConfirm = () => {
    setRealTimeStockData(realTimeStockData.filter(s => s.id !== selectedStock.id));
    handleClose();
  };

  const handleClose = () => {
    setOpenData(false);
    setViewShow(false);
    setEditShow(false);
    setDeleteShow(false);
    setTimeout(() => {
      setSelectedStock(null);
    }, 100);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage - 1);
  };

  return (
    <div className="content-area">
      {/* Search and Create Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '10px', mb: 3 }}>
        <TextField
          placeholder="Search real-time stock..."
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
          onClick={handleCreateStock}
        >
          <Add />
          Add Stock Update
        </button>
      </Box>

      {/* Real-Time Stock Table */}
      <Box className="hrms-card">
        <Box className="hrms-card-content" sx={{ padding: 0 }}>
          <Table className="hrms-table">
            <TableHead>
              <TableRow>
                <TableCell>S. No.</TableCell>
                <TableCell>Stock ID</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>Warehouse</TableCell>
                <TableCell>Current Stock</TableCell>
                <TableCell>Available Stock</TableCell>
                <TableCell>Movement</TableCell>
                <TableCell>Movement Qty</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStock
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((stock, index) => (
                  <TableRow key={stock.id}>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1976d2' }}>
                        {stock.stockId}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {stock.productName}
                      </Typography>
                    </TableCell>
                    <TableCell>{stock.warehouseName}</TableCell>
                    <TableCell>{stock.currentStock}</TableCell>
                    <TableCell>{stock.availableStock}</TableCell>
                    <TableCell>
                      <Box className={`hrms-badge ${getMovementColor(stock.lastMovement)}`}>
                        {stock.lastMovement}
                      </Box>
                    </TableCell>
                    <TableCell>{stock.movementQuantity}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                          size="small"
                          onClick={() => handleViewStock(stock)}
                          sx={{ color: '#1976d2' }}
                        >
                          <VisibilityOutlined />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleEditStock(stock)}
                          sx={{ color: '#000' }}
                        >
                          <EditOutlined />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteStock(stock)}
                          sx={{ color: '#f44336' }}
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
              Showing {page * rowsPerPage + 1} to {Math.min((page + 1) * rowsPerPage, filteredStock.length)} of {filteredStock.length} real-time stock items
            </Typography>
            <Pagination
              count={Math.ceil(filteredStock.length / rowsPerPage)}
              page={page + 1}
              onChange={handlePageChange}
              color="primary"
              size="small"
            />
          </Stack>
        </Box>
      </Box>

      {/* Common Dialog */}
      <CommonDialog
        key={selectedStock?.id || 'create'}
        open={openData || viewShow || editShow || deleteShow}
        onClose={handleClose}
        dialogTitle={
          openData ? "Add Stock Update" :
          viewShow ? "Real-Time Stock Details" :
          editShow ? "Edit Stock Update" :
          deleteShow ? "Delete Stock Update" : ""
        }
        dialogContent={
          openData ? (
            <CreateRealTimeStock
              onClose={handleClose}
              onSave={handleSaveStock}
            />
          ) : viewShow ? (
            <ViewRealTimeStock
              stockData={selectedStock}
            />
          ) : editShow ? (
            <EditRealTimeStock
              stockData={selectedStock}
              onClose={handleClose}
              onSave={handleSaveStock}
            />
          ) : deleteShow ? (
            <DeleteRealTimeStock
              stockData={selectedStock}
              onClose={handleClose}
              onDelete={handleDeleteConfirm}
            />
          ) : null
        }
        maxWidth={deleteShow ? "sm" : "md"}
        fullWidth={!deleteShow}
      />
    </div>
  );
};

export default RealTimeStock;