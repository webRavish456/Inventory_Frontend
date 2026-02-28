'use client';

import React, { useState, useEffect } from 'react';
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
  Tabs,
  Tab,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Search, Add, VisibilityOutlined, EditOutlined, DeleteOutlined } from "@mui/icons-material";
import CommonDialog from '../../../components/CommonDialog';
import CreateStockIn from '../../../components/Stock Management/StockInOut/CreateStockIn';
import EditStockIn from '../../../components/Stock Management/StockInOut/EditStockIn';
import ViewStockIn from '../../../components/Stock Management/StockInOut/ViewStockIn';
import DeleteStockIn from '../../../components/Stock Management/StockInOut/DeleteStockIn';
import CreateStockOut from '../../../components/Stock Management/StockInOut/CreateStockOut';
import EditStockOut from '../../../components/Stock Management/StockInOut/EditStockOut';
import ViewStockOut from '../../../components/Stock Management/StockInOut/ViewStockOut';
import DeleteStockOut from '../../../components/Stock Management/StockInOut/DeleteStockOut';
import { getAllStockInOut, updateStockInOut, deleteStockInOut } from '../../../lib/stockApi';

const StockInOut = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  const [tabValue, setTabValue] = useState(0); // Default to Stock In (0)
  const [openData, setOpenData] = useState(false);
  const [viewShow, setViewShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Stock In/Out data from API
  const [stockInData, setStockInData] = useState([]);
  const [stockOutData, setStockOutData] = useState([]);

  // Fetch data on mount
  useEffect(() => {
    fetchStockData();
  }, []);

  const fetchStockData = async () => {
    try {
      setLoading(true);
      const response = await getAllStockInOut();
      
      if (response?.data) {
        // Separate Stock In and Stock Out
        const inData = response.data.filter(item => item.transactionType === 'Stock In');
        const outData = response.data.filter(item => item.transactionType === 'Stock Out');
        
        setStockInData(inData || []);
        setStockOutData(outData || []);
        setError("");
      } else {
        setError("Failed to fetch stock data");
        setStockInData([]);
        setStockOutData([]);
      }
    } catch (err) {
      setError("Error loading stock data: " + (err.message || "Unknown error"));
      console.error(err);
      setStockInData([]);
      setStockOutData([]);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get product name from itemId
  const getProductName = (item) => {
    if (typeof item.itemId === 'object' && item.itemId?.productName) {
      return item.itemId.productName;
    }
    return item.productName || 'N/A';
  };

  // Helper function to get supplier name from supplierId
  const getSupplierName = (item) => {
    if (typeof item.supplierId === 'object' && item.supplierId?.name) {
      return item.supplierId.name;
    }
    return item.supplierName || 'N/A';
  };

  // Helper function to format data for display
  const formatStockInData = (rawData) => {
    return rawData.map(item => ({
      ...item,
      id: item._id || item.id,
      stockInId: item._id?.slice(-6) || 'SI-AUTO',
      productName: getProductName(item),
      supplierName: getSupplierName(item),
      quantityIn: item.quantity || 0,
      totalCost: item.totalCost || 0,
      dateOfStockIn: item.entryDate ? new Date(item.entryDate).toLocaleDateString() : 'N/A',
    }));
  };

  const formattedStockIn = formatStockInData(stockInData);

  // Filter with null checks
  const filteredStockIn = formattedStockIn.filter(stock => {
    if (!stock || !search) return true;
    const productName = stock.productName || '';
    const supplierName = stock.supplierName || '';
    const searchLower = search.toLowerCase();
    return (
      productName.toLowerCase().includes(searchLower) ||
      supplierName.toLowerCase().includes(searchLower)
    );
  });

  const filteredStockOut = stockOutData.filter(stock => {
    if (!stock || !search) return true;
    const productName = stock.productName || '';
    const customerName = stock.customerName || '';
    const searchLower = search.toLowerCase();
    return (
      productName.toLowerCase().includes(searchLower) ||
      customerName.toLowerCase().includes(searchLower)
    );
  });

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "hrms-badge-success";
      case "Pending":
        return "hrms-badge-warning";
      case "Overdue":
        return "hrms-badge-error";
      default:
        return "hrms-badge-neutral";
    }
  };

  const getTransactionTypeColor = (type) => {
    switch (type) {
      case "Sale":
        return "hrms-badge-success";
      case "Return to Supplier":
        return "hrms-badge-warning";
      default:
        return "hrms-badge-neutral";
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setPage(0);
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

  const handleSaveStock = async (formData) => {
    try {
      if (editShow) {
        // Update existing stock
        const response = await updateStockInOut(selectedStock.id || selectedStock._id, formData);
        if (response?.success) {
          // Refresh data after successful update
          fetchStockData();
        } else {
          setError(response?.message || "Failed to update stock");
        }
      } else {
        // Create is handled by CreateStockIn component which calls API directly
        // This branch is for completeness but creation is handled elsewhere
      }
    } catch (err) {
      setError("Error saving stock: " + (err.message || "Unknown error"));
      console.error(err);
    }
    handleClose();
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await deleteStockInOut(selectedStock.id || selectedStock._id);
      if (response?.success) {
        // Refresh data after successful delete
        fetchStockData();
      } else {
        setError(response?.message || "Failed to delete stock");
      }
    } catch (err) {
      setError("Error deleting stock: " + (err.message || "Unknown error"));
      console.error(err);
    }
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

  const currentData = tabValue === 0 ? filteredStockIn : filteredStockOut;
  const currentPageData = currentData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  if (loading) {
    return (
      <div className="content-area">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          <CircularProgress />
        </Box>
      </div>
    );
  }

  return (
    <div className="content-area">
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {/* Tabs, Search and Create Button - Single Line */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        {/* Tabs - Left Side */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Box
            onClick={() => handleTabChange(null, 0)}
            sx={{
              px: 4,
              py: 0.5,
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              borderRadius: '6px',
              cursor: 'pointer',
              backgroundColor: tabValue === 0 ? '#1976D2' : 'transparent',
              color: tabValue === 0 ? 'white' : '#666',
              fontWeight: tabValue === 0 ? 600 : 400,
              border: '1px solid #e0e0e0',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: tabValue === 0 ? '#1565C0' : '#f5f5f5',
              }
            }}
          >
            Stock In
          </Box>
          <Box
            onClick={() => handleTabChange(null, 1)}
            sx={{
              px: 4,
              py: 0.5,
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              borderRadius: '6px',
              cursor: 'pointer',
              backgroundColor: tabValue === 1 ? '#1976D2' : 'transparent',
              color: tabValue === 1 ? 'white' : '#666',
              fontWeight: tabValue === 1 ? 600 : 400,
              border: '1px solid #e0e0e0',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: tabValue === 1 ? '#1565C0' : '#f5f5f5',
              }
            }}
          >
            Stock Out
          </Box>
        </Box>

        {/* Search and Create Button - Right Side */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <TextField
            placeholder={`Search ${tabValue === 0 ? 'stock in' : 'stock out'}...`}
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
            Add {tabValue === 0 ? 'Stock In' : 'Stock Out'}
          </button>
        </Box>
      </Box>

      {/* Table Card */}
      <Box className="hrms-card">

        {/* Stock In Table */}
        {tabValue === 0 && (
          <Box className="hrms-card-content" sx={{ padding: 0 }}>
            <Table className="hrms-table">
              <TableHead>
                <TableRow>
                  <TableCell>S. No.</TableCell>
                  <TableCell>Stock In ID</TableCell>
                  <TableCell>Product Name</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Total Cost</TableCell>
                  <TableCell>Supplier Name</TableCell>
                  <TableCell>Date of Stock In</TableCell>
                  <TableCell>Payment Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentPageData.map((stock, index) => (
                  <TableRow key={stock.id}>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1976d2' }}>
                        {stock.stockInId}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {stock.productName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {stock.quantityIn}
                      </Typography>
                    </TableCell>
                    <TableCell>₹{stock.totalCost.toLocaleString()}</TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {stock.supplierName}
                      </Typography>
                    </TableCell>
                    <TableCell>{stock.dateOfStockIn}</TableCell>
                    <TableCell>
                      <Box className={`hrms-badge ${getPaymentStatusColor(stock.paymentStatus)}`}>
                        {stock.paymentStatus}
                      </Box>
                    </TableCell>
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
        )}

        {/* Stock Out Table */}
        {tabValue === 1 && (
          <Box className="hrms-card-content" sx={{ padding: 0 }}>
            <Table className="hrms-table">
              <TableHead>
                <TableRow>
                  <TableCell>S. No.</TableCell>
                  <TableCell>Stock Out ID</TableCell>
                  <TableCell>Product Name</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Total Sale</TableCell>
                  <TableCell>Customer Name</TableCell>
                  <TableCell>Date of Stock Out</TableCell>
                  <TableCell>Transaction Type</TableCell>
                  <TableCell>Payment Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentPageData.map((stock, index) => (
                  <TableRow key={stock.id}>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1976d2' }}>
                        {stock.stockOutId}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {stock.productName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {stock.quantityOut}
                      </Typography>
                    </TableCell>
                    <TableCell>₹{stock.totalSale.toLocaleString()}</TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {stock.customerName}
                      </Typography>
                    </TableCell>
                    <TableCell>{stock.dateOfStockOut}</TableCell>
                    <TableCell>
                      <Box className={`hrms-badge ${getTransactionTypeColor(stock.transactionType)}`}>
                        {stock.transactionType}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box className={`hrms-badge ${getPaymentStatusColor(stock.paymentStatus)}`}>
                        {stock.paymentStatus}
                      </Box>
                    </TableCell>
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
        )}

        {/* Pagination */}
        <Box sx={{ padding: "0.75rem 1rem", borderTop: "1px solid #e5e5e5", backgroundColor: "#fafafa" }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" sx={{ color: "#333", fontWeight: 500, fontSize: "0.875rem" }}>
              Showing {page * rowsPerPage + 1} to {Math.min((page + 1) * rowsPerPage, currentData.length)} of {currentData.length} {tabValue === 0 ? 'stock in' : 'stock out'} records
            </Typography>
            <Pagination
              count={Math.ceil(currentData.length / rowsPerPage)}
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
          openData ? `Add ${tabValue === 0 ? 'Stock In' : 'Stock Out'}` :
          viewShow ? `${tabValue === 0 ? 'Stock In' : 'Stock Out'} Details` :
          editShow ? `Edit ${tabValue === 0 ? 'Stock In' : 'Stock Out'}` :
          deleteShow ? `Delete ${tabValue === 0 ? 'Stock In' : 'Stock Out'}` : ""
        }
        dialogContent={
          openData ? (
            tabValue === 0 ? (
              <CreateStockIn
                onClose={handleClose}
                onSave={handleSaveStock}
              />
            ) : (
              <CreateStockOut
                onClose={handleClose}
                onSave={handleSaveStock}
              />
            )
          ) : viewShow ? (
            tabValue === 0 ? (
              <ViewStockIn
                stockData={selectedStock}
              />
            ) : (
              <ViewStockOut
                stockData={selectedStock}
              />
            )
          ) : editShow ? (
            tabValue === 0 ? (
              <EditStockIn
                stockData={selectedStock}
                onClose={handleClose}
                onSave={handleSaveStock}
              />
            ) : (
              <EditStockOut
                stockData={selectedStock}
                onClose={handleClose}
                onSave={handleSaveStock}
              />
            )
          ) : deleteShow ? (
            tabValue === 0 ? (
              <DeleteStockIn
                stockData={selectedStock}
                onClose={handleClose}
                onDelete={handleDeleteConfirm}
              />
            ) : (
              <DeleteStockOut
                stockData={selectedStock}
                onClose={handleClose}
                onDelete={handleDeleteConfirm}
              />
            )
          ) : null
        }
        maxWidth={deleteShow ? "sm" : "md"}
        fullWidth={!deleteShow}
      />
    </div>
  );
};

export default StockInOut;