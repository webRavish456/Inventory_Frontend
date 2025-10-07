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
  Button,
  Chip,
  Stack,
} from "@mui/material";
import { Search, Add, VisibilityOutlined, EditOutlined, DeleteOutlined } from "@mui/icons-material";
import CommonDialog from "@/components/CommonDialog";
import CreateDeadStock from "@/components/valuation/dead-stock/Create";
import ViewDeadStock from "@/components/valuation/dead-stock/View";
import EditDeadStock from "@/components/valuation/dead-stock/Edit";
import DeleteDeadStock from "@/components/valuation/dead-stock/Delete";

const DeadStock = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);

  // Dialog states
  const [createShow, setCreateShow] = useState(false);
  const [viewShow, setViewShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [viewData, setViewData] = useState(null);
  const [editData, setEditData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteData, setDeleteData] = useState(null);

  // Dead Stock data - real market fields
  const [deadStockData, setDeadStockData] = useState([
    {
      id: "DS001",
      deadStockId: "DS001",
      productName: "Old Model Phone",
      sku: "PHONE-OLD-001",
      category: "Electronics",
      lastMovement: "2023-12-15",
      daysInStock: 285,
      costPrice: 15000,
      currentValue: 5000,
      depreciation: 66.67,
      status: "Identified",
      warehouse: "Main Warehouse",
      reason: "Obsolete Technology"
    },
    {
      id: "DS002",
      deadStockId: "DS002",
      productName: "Seasonal Clothing",
      sku: "CLOTH-SEASON-001",
      category: "Fashion",
      lastMovement: "2023-08-20",
      daysInStock: 400,
      costPrice: 2000,
      currentValue: 400,
      depreciation: 80.00,
      status: "Action Required",
      warehouse: "North Warehouse",
      reason: "Out of Season"
    },
    {
      id: "DS003",
      deadStockId: "DS003",
      productName: "Damaged Electronics",
      sku: "ELEC-DAM-001",
      category: "Electronics",
      lastMovement: "2023-06-10",
      daysInStock: 470,
      costPrice: 8000,
      currentValue: 800,
      depreciation: 90.00,
      status: "Write-off",
      warehouse: "South Warehouse",
      reason: "Physical Damage"
    }
  ]);

  // Handlers
  const handleView = (row) => { setViewData(row); setViewShow(true); };
  const handleEdit = (row) => { setEditData(row); setEditShow(true); };
  const handleShowDelete = (id) => { 
    const rowData = deadStockData.find(row => row.deadStockId === id);
    setDeleteId(id); 
    setDeleteData(rowData);
    setDeleteShow(true); 
  };
  const handleCreateOpen = () => setCreateShow(true);
  const handleClose = () => { setViewShow(false); setEditShow(false); setDeleteShow(false); setCreateShow(false); };

  const handleCreate = (newDeadStock) => {
    const nextId = deadStockData.length + 1;
    const newDeadStockData = {
      ...newDeadStock,
      id: `DS${String(nextId).padStart(3, '0')}`,
      deadStockId: `DS${String(nextId).padStart(3, '0')}`
    };
    setDeadStockData([...deadStockData, newDeadStockData]);
    setCreateShow(false);
  };

  const handleUpdate = (updatedDeadStock) => {
    setDeadStockData(deadStockData.map(row => 
      row.deadStockId === updatedDeadStock.deadStockId 
        ? { ...updatedDeadStock }
        : row
    ));
  };

  const handleDelete = () => {
    setDeadStockData(deadStockData.filter(row => row.deadStockId !== deleteId));
    setDeleteShow(false);
    setDeleteData(null);
    setDeleteId(null);
  };

  // Filter data
  const filteredData = deadStockData.filter(row =>
    row.deadStockId.toLowerCase().includes(search.toLowerCase()) ||
    row.productName.toLowerCase().includes(search.toLowerCase()) ||
    row.category.toLowerCase().includes(search.toLowerCase())
  );

  const currentPageData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handlePageChange = (event, newPage) => {
    setPage(newPage - 1);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Identified":
        return { backgroundColor: "#fff3e0", color: "#f57c00" };
      case "Action Required":
        return { backgroundColor: "#ffebee", color: "#d32f2f" };
      case "Write-off":
        return { backgroundColor: "#f5f5f5", color: "#666" };
      default:
        return { backgroundColor: "#f5f5f5", color: "#666" };
    }
  };

  return (
    <div className="content-area">
      {/* Header with Search and Create Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 2, mb: 3 }}>
        <TextField
          placeholder="Search dead stock..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          sx={{ width: 300 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleCreateOpen}
          sx={{ 
            backgroundColor: '#1976d2',
            '&:hover': { backgroundColor: '#1565c0' },
            transform: 'none',
            textTransform: 'none'
          }}
        >
          Add Dead Stock Entry
        </Button>
      </Box>

      {/* Table */}
      <Box sx={{ backgroundColor: 'white', borderRadius: '0.75rem', boxShadow: 1 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>SI</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Dead Stock ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Product Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Days in Stock</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Cost Price</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Current Value</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Depreciation %</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPageData.map((row, index) => (
              <TableRow key={row.id} sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
                <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                <TableCell align="left">
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1976d2' }}>
                    {row.deadStockId}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {row.productName}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {row.category}
                  </Typography>
                </TableCell>
                <TableCell align="left">{row.daysInStock}</TableCell>
                <TableCell align="left">₹{row.costPrice.toLocaleString()}</TableCell>
                <TableCell align="left">₹{row.currentValue.toLocaleString()}</TableCell>
                <TableCell align="left">{row.depreciation}%</TableCell>
                <TableCell align="left">
                  <Chip
                    label={row.status}
                    size="small"
                    sx={{
                      ...getStatusColor(row.status),
                      fontWeight: 500
                    }}
                  />
                </TableCell>
                <TableCell align="center">
                  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                    <IconButton
                      size="small"
                      onClick={() => handleView(row)}
                      sx={{ color: '#1976d2' }}
                    >
                      <VisibilityOutlined />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleEdit(row)}
                      sx={{ color: '#000' }}
                    >
                      <EditOutlined />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleShowDelete(row.deadStockId)}
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
     
      {/* Pagination */}
      <Box sx={{ borderTop: 1, borderColor: 'divider', backgroundColor: '#fafafa', p: 2, }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" color="text.secondary">
            Showing {page * rowsPerPage + 1} to {Math.min((page + 1) * rowsPerPage, filteredData.length)} of {filteredData.length} dead stock records
          </Typography>
          <Pagination
            count={Math.ceil(filteredData.length / rowsPerPage)}
            page={page + 1}
            onChange={handlePageChange}
            size="small"
            color="primary"
          />
        </Stack>
      </Box>
      </Box>

      {/* Common Dialog */}
      <CommonDialog
        open={createShow || viewShow || editShow || deleteShow}
        onClose={handleClose}
        maxWidth={deleteShow ? "sm" : "md"}
        fullWidth={deleteShow ? false : true}
        dialogTitle={
          createShow ? "Create New Dead Stock Entry" :
          viewShow ? "View Dead Stock Entry" :
          editShow ? "Edit Dead Stock Entry" :
          deleteShow ? "Delete Dead Stock Entry" : ""
        }
        dialogContent={
          createShow ? <CreateDeadStock handleClose={handleClose} handleCreate={handleCreate} /> :
          viewShow ? <ViewDeadStock viewData={viewData} handleClose={handleClose} /> :
          editShow ? <EditDeadStock editData={editData} handleUpdate={handleUpdate} handleClose={handleClose} /> :
          deleteShow ? <DeleteDeadStock deadStockData={deleteData} onClose={handleClose} onDelete={handleDelete} /> : null
        }
      />
    </div>
  );
};

export default DeadStock;
