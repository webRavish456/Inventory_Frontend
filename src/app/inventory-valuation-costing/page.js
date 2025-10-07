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
import CreateValuation from '../../../components/valuation/Create';
import EditValuation from '../../../components/valuation/Edit';
import ViewValuation from '../../../components/valuation/View';
import DeleteValuation from '../../../components/valuation/Delete';

const Valuation = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  const [openData, setOpenData] = useState(false);
  const [viewShow, setViewShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [selectedValuation, setSelectedValuation] = useState(null);

  // Inventory Valuation data based on spreadsheet specifications
  const [valuationData, setValuationData] = useState([
    {
      id: "VAL001",
      productName: "Samsung Galaxy S24",
      skuCode: "SGS24-128GB",
      category: "Electronics",
      currentStock: 25,
      unitCost: 42000,
      totalCost: 1050000,
      sellingPrice: 45000,
      totalValue: 1125000,
      profitMargin: 7.14,
      valuationMethod: "Weighted Average",
      lastUpdated: "2024-09-20",
      deadStockDays: 0,
      status: "Active"
    },
    {
      id: "VAL002",
      productName: "Dell Laptop Inspiron 15",
      skuCode: "DLI15-512GB",
      category: "Electronics",
      currentStock: 15,
      unitCost: 52000,
      totalCost: 780000,
      sellingPrice: 55000,
      totalValue: 825000,
      profitMargin: 5.77,
      valuationMethod: "FIFO",
      lastUpdated: "2024-09-18",
      deadStockDays: 0,
      status: "Active"
    },
    {
      id: "VAL003",
      productName: "Office Chair Ergonomic",
      skuCode: "OCE-001",
      category: "Furniture",
      currentStock: 8,
      unitCost: 10000,
      totalCost: 80000,
      sellingPrice: 12000,
      totalValue: 96000,
      profitMargin: 20.00,
      valuationMethod: "LIFO",
      lastUpdated: "2024-09-15",
      deadStockDays: 0,
      status: "Active"
    },
    {
      id: "VAL004",
      productName: "Coffee Mug Ceramic",
      skuCode: "CMC-001",
      category: "Kitchenware",
      currentStock: 50,
      unitCost: 120,
      totalCost: 6000,
      sellingPrice: 150,
      totalValue: 7500,
      profitMargin: 25.00,
      valuationMethod: "Weighted Average",
      lastUpdated: "2024-09-20",
      deadStockDays: 0,
      status: "Active"
    },
    {
      id: "VAL005",
      productName: "LED TV 55 inch",
      skuCode: "LTV55-4K",
      category: "Electronics",
      currentStock: 12,
      unitCost: 32000,
      totalCost: 384000,
      sellingPrice: 35000,
      totalValue: 420000,
      profitMargin: 9.38,
      valuationMethod: "FIFO",
      lastUpdated: "2024-09-18",
      deadStockDays: 0,
      status: "Active"
    },
    {
      id: "VAL006",
      productName: "Old Model Phone",
      skuCode: "OMP-001",
      category: "Electronics",
      currentStock: 5,
      unitCost: 15000,
      totalCost: 75000,
      sellingPrice: 12000,
      totalValue: 60000,
      profitMargin: -20.00,
      valuationMethod: "Weighted Average",
      lastUpdated: "2024-08-15",
      deadStockDays: 45,
      status: "Dead Stock"
    }
  ]);

  const filteredValuations = valuationData.filter(valuation =>
    valuation.productName.toLowerCase().includes(search.toLowerCase()) ||
    valuation.skuCode.toLowerCase().includes(search.toLowerCase()) ||
    valuation.category.toLowerCase().includes(search.toLowerCase()) ||
    valuation.valuationMethod.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "hrms-badge-success";
      case "Dead Stock":
        return "hrms-badge-error";
      case "Low Stock":
        return "hrms-badge-warning";
      default:
        return "hrms-badge-neutral";
    }
  };

  const getValuationMethodColor = (method) => {
    switch (method) {
      case "Weighted Average":
        return "hrms-badge-primary";
      case "FIFO":
        return "hrms-badge-success";
      case "LIFO":
        return "hrms-badge-warning";
      default:
        return "hrms-badge-neutral";
    }
  };

  const getProfitMarginColor = (margin) => {
    if (margin < 0) return "hrms-badge-error";
    if (margin < 10) return "hrms-badge-warning";
    return "hrms-badge-success";
  };

  const handleCreateValuation = () => {
    setSelectedValuation(null);
    setOpenData(true);
  };

  const handleViewValuation = (valuation) => {
    setSelectedValuation(valuation);
    setViewShow(true);
  };

  const handleEditValuation = (valuation) => {
    setSelectedValuation(valuation);
    setEditShow(true);
  };

  const handleDeleteValuation = (valuation) => {
    setSelectedValuation(valuation);
    setDeleteShow(true);
  };

  const handleSaveValuation = (formData) => {
    if (editShow) {
      setValuationData(valuationData.map(valuation => 
        valuation.id === selectedValuation.id 
          ? { ...valuation, ...formData, lastUpdated: new Date().toLocaleDateString() }
          : valuation
      ));
    } else {
      const newValuation = {
        id: Date.now().toString(),
        ...formData,
        createdDate: new Date().toLocaleDateString(),
        lastUpdated: new Date().toLocaleDateString()
      };
      setValuationData([...valuationData, newValuation]);
    }
    handleClose();
  };

  const handleDeleteConfirm = () => {
    setValuationData(valuationData.filter(v => v.id !== selectedValuation.id));
    handleClose();
  };

  const handleClose = () => {
    setOpenData(false);
    setViewShow(false);
    setEditShow(false);
    setDeleteShow(false);
    setTimeout(() => {
      setSelectedValuation(null);
    }, 100);
  };

  return (
    <div className="content-area">
      
      {/* Search and Create Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
        <TextField
          placeholder="Search valuations..."
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
          onClick={handleCreateValuation}
        >
          <Add />
          Add Valuation
        </button>
      </Box>

      {/* Valuation Table */}
      <Box className="hrms-card">
        <Box className="hrms-card-content" sx={{ padding: 0 }}>
          <Table className="hrms-table">
            <TableHead>
              <TableRow>
                <TableCell>S. No.</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Current Stock</TableCell>
                <TableCell>Unit Cost</TableCell>
                <TableCell>Total Value</TableCell>
                <TableCell>Profit Margin</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredValuations
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((valuation, index) => (
                  <TableRow key={valuation.id}>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {valuation.productName}
                      </Typography>
                    </TableCell>
                    <TableCell>{valuation.category}</TableCell>
                    <TableCell>{valuation.currentStock}</TableCell>
                    <TableCell>₹{valuation.unitCost.toLocaleString()}</TableCell>
                    <TableCell>₹{valuation.totalValue.toLocaleString()}</TableCell>
                    <TableCell>
                      <Box className={`hrms-badge ${getProfitMarginColor(valuation.profitMargin)}`}>
                        {valuation.profitMargin.toFixed(2)}%
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box className={`hrms-badge ${getStatusColor(valuation.status)}`}>
                        {valuation.status}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: "0.25rem" }}>
                        <IconButton 
                          size="small"
                          sx={{ color: "#1976D2", fontSize: "16px" }}
                          onClick={() => handleViewValuation(valuation)}
                        >
                          <VisibilityOutlined />
                        </IconButton>
                        <IconButton 
                          size="small"
                          sx={{ color: "#000", fontSize: "16px" }}
                          onClick={() => handleEditValuation(valuation)}
                        >
                          <EditOutlined />
                        </IconButton>
                        <IconButton 
                          size="small"
                          sx={{ color: "#d32f2f", fontSize: "16px" }}
                          onClick={() => handleDeleteValuation(valuation)}
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
              Showing {page * rowsPerPage + 1} to {Math.min((page + 1) * rowsPerPage, filteredValuations.length)} of {filteredValuations.length} valuation items
            </Typography>
            <Pagination
              count={Math.ceil(filteredValuations.length / rowsPerPage)}
              page={page + 1}
              onChange={(_, newPage) => setPage(newPage - 1)}
              color="primary"
              size="small"
            />
          </Stack>
        </Box>
      </Box>

      {/* Common Dialog */}
      <CommonDialog
        key={selectedValuation?.id || 'create'}
        open={openData || viewShow || editShow || deleteShow}
        onClose={handleClose}
        dialogTitle={
          openData ? "Add Valuation" :
          viewShow ? "Valuation Details" :
          editShow ? "Edit Valuation" :
          deleteShow ? "Delete Valuation" : ""
        }
        dialogContent={
          openData ? (
            <CreateValuation
              onClose={handleClose}
              onSave={handleSaveValuation}
            />
          ) : viewShow ? (
            <ViewValuation
              valuationData={selectedValuation}
            />
          ) : editShow ? (
            <EditValuation
              valuationData={selectedValuation}
              onClose={handleClose}
              onSave={handleSaveValuation}
            />
          ) : deleteShow ? (
            <DeleteValuation
              valuationData={selectedValuation}
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

export default Valuation;
