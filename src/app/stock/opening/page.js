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
import CreateOpeningStock from '../../../components/Stock Management/OpeningStock/Create';
import EditOpeningStock from '../../../components/Stock Management/OpeningStock/Edit';
import ViewOpeningStock from '../../../components/Stock Management/OpeningStock/View';
import DeleteOpeningStock from '../../../components/Stock Management/OpeningStock/Delete';

const OpeningStock = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  const [openData, setOpenData] = useState(false);
  const [viewShow, setViewShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);

  // Opening stock data
  const [openingStockData, setOpeningStockData] = useState([
    {
      id: "OS001",
      stockId: "OS001",
      productName: "Samsung Galaxy S24",
      warehouseName: "Electronics Warehouse",
      openingQuantity: 50,
      unitPrice: 45000,
      totalValue: 2250000,
      openingDate: "2024-01-01"
    },
    {
      id: "OS002",
      stockId: "OS002",
      productName: "Dell Laptop Inspiron 15",
      warehouseName: "Electronics Warehouse",
      openingQuantity: 30,
      unitPrice: 48000,
      totalValue: 1440000,
      openingDate: "2024-01-01"
    },
    {
      id: "OS003",
      stockId: "OS003",
      productName: "Office Chair Ergonomic",
      warehouseName: "Furniture Warehouse",
      openingQuantity: 20,
      unitPrice: 12000,
      totalValue: 240000,
      openingDate: "2024-01-01"
    }
  ]);

  const filteredStock = openingStockData.filter(stock =>
    stock.productName.toLowerCase().includes(search.toLowerCase()) ||
    stock.warehouseName.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "hrms-badge-success";
      case "Inactive":
        return "hrms-badge-error";
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
      setOpeningStockData(openingStockData.map(stock => 
        stock.id === selectedStock.id 
          ? { ...stock, ...formData, lastUpdated: new Date().toLocaleDateString() }
          : stock
      ));
    } else {
      const newStock = {
        id: Date.now().toString(),
        stockId: `OS${String(openingStockData.length + 1).padStart(3, '0')}`,
        ...formData,
        createdDate: new Date().toLocaleDateString(),
        lastUpdated: new Date().toLocaleDateString()
      };
      setOpeningStockData([...openingStockData, newStock]);
    }
    handleClose();
  };

  const handleDeleteConfirm = () => {
    setOpeningStockData(openingStockData.filter(s => s.id !== selectedStock.id));
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
          placeholder="Search opening stock..."
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
          Add Opening Stock
        </button>
      </Box>

      {/* Opening Stock Table */}
      <Box className="hrms-card">
        <Box className="hrms-card-content" sx={{ padding: 0 }}>
          <Table className="hrms-table">
            <TableHead>
              <TableRow>
                <TableCell>S. No.</TableCell>
                <TableCell>Stock ID</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>Warehouse</TableCell>
                <TableCell>Opening Quantity</TableCell>
                <TableCell>Unit Price</TableCell>
                <TableCell>Total Value</TableCell>
                <TableCell>Opening Date</TableCell>
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
                    <TableCell>{stock.openingQuantity}</TableCell>
                    <TableCell>₹{stock.unitPrice.toLocaleString()}</TableCell>
                    <TableCell>₹{stock.totalValue.toLocaleString()}</TableCell>
                    <TableCell>{stock.openingDate}</TableCell>
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
              Showing {page * rowsPerPage + 1} to {Math.min((page + 1) * rowsPerPage, filteredStock.length)} of {filteredStock.length} opening stock items
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
          openData ? "Add Opening Stock" :
          viewShow ? "Opening Stock Details" :
          editShow ? "Edit Opening Stock" :
          deleteShow ? "Delete Opening Stock" : ""
        }
        dialogContent={
          openData ? (
            <CreateOpeningStock
              onClose={handleClose}
              onSave={handleSaveStock}
            />
          ) : viewShow ? (
            <ViewOpeningStock
              stockData={selectedStock}
            />
          ) : editShow ? (
            <EditOpeningStock
              stockData={selectedStock}
              onClose={handleClose}
              onSave={handleSaveStock}
            />
          ) : deleteShow ? (
            <DeleteOpeningStock
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

export default OpeningStock;