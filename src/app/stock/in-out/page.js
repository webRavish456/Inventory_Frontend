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
  Tabs,
  Tab,
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

  // Stock In data
  const [stockInData, setStockInData] = useState([
    {
      id: "SI001",
      stockInId: "SI001",
      productName: "Samsung Galaxy S24",
      quantityIn: 5,
      totalCost: 450000,
      supplierName: "Tech Solutions Ltd",
      dateOfStockIn: "2024-09-20",
      paymentStatus: "Paid"
    },
    {
      id: "SI002",
      stockInId: "SI002",
      productName: "Dell Laptop Inspiron 15",
      quantityIn: 3,
      totalCost: 240000,
      supplierName: "Computer World",
      dateOfStockIn: "2024-09-19",
      paymentStatus: "Pending"
    }
  ]);

  // Stock Out data
  const [stockOutData, setStockOutData] = useState([
    {
      id: "SO001",
      stockOutId: "SO001",
      productName: "Samsung Galaxy S24",
      quantityOut: 2,
      totalSale: 50000,
      customerName: "John Doe",
      dateOfStockOut: "2024-09-20",
      transactionType: "Sale",
      paymentStatus: "Paid"
    },
    {
      id: "SO002",
      stockOutId: "SO002",
      productName: "Dell Laptop Inspiron 15",
      quantityOut: 1,
      totalSale: 55000,
      customerName: "Jane Smith",
      dateOfStockOut: "2024-09-19",
      transactionType: "Return to Supplier",
      paymentStatus: "Pending"
    }
  ]);

  const filteredStockIn = stockInData.filter(stock =>
    stock.productName.toLowerCase().includes(search.toLowerCase()) ||
    stock.supplierName.toLowerCase().includes(search.toLowerCase())
  );

  const filteredStockOut = stockOutData.filter(stock =>
    stock.productName.toLowerCase().includes(search.toLowerCase()) ||
    stock.customerName.toLowerCase().includes(search.toLowerCase())
  );

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

  const handleSaveStock = (formData) => {
    if (editShow) {
      if (tabValue === 0) {
        setStockInData(stockInData.map(stock => 
          stock.id === selectedStock.id 
            ? { ...stock, ...formData, lastUpdated: new Date().toLocaleDateString() }
            : stock
        ));
      } else {
        setStockOutData(stockOutData.map(stock => 
          stock.id === selectedStock.id 
            ? { ...stock, ...formData, lastUpdated: new Date().toLocaleDateString() }
            : stock
        ));
      }
    } else {
      if (tabValue === 0) {
        const newStock = {
          id: Date.now().toString(),
          stockInId: `SI${String(stockInData.length + 1).padStart(3, '0')}`,
          ...formData,
          createdDate: new Date().toLocaleDateString(),
          lastUpdated: new Date().toLocaleDateString()
        };
        setStockInData([...stockInData, newStock]);
      } else {
        const newStock = {
          id: Date.now().toString(),
          stockOutId: `SO${String(stockOutData.length + 1).padStart(3, '0')}`,
          ...formData,
          createdDate: new Date().toLocaleDateString(),
          lastUpdated: new Date().toLocaleDateString()
        };
        setStockOutData([...stockOutData, newStock]);
      }
    }
    handleClose();
  };

  const handleDeleteConfirm = () => {
    if (tabValue === 0) {
      setStockInData(stockInData.filter(s => s.id !== selectedStock.id));
    } else {
      setStockOutData(stockOutData.filter(s => s.id !== selectedStock.id));
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

  return (
    <div className="content-area">
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