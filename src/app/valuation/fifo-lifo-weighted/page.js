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
import CreateFIFO from "@/components/valuation/fifo/Create";
import ViewFIFO from "@/components/valuation/fifo/View";
import EditFIFO from "@/components/valuation/fifo/Edit";
import DeleteFIFO from "@/components/valuation/fifo/Delete";

const FIFOLIFOWeighted = () => {
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

  // FIFO/LIFO/Weighted Average data - real market fields
  const [fifoData, setFifoData] = useState([
    {
      id: "FIFO001",
      valuationId: "FIFO001",
      productName: "Samsung Galaxy S24",
      sku: "SAM-S24-128GB",
      method: "FIFO",
      openingStock: 50,
      purchases: 30,
      sales: 25,
      closingStock: 55,
      unitCost: 45000,
      totalValue: 2475000,
      lastUpdated: "2024-09-25",
      warehouse: "Main Warehouse"
    },
    {
      id: "FIFO002",
      valuationId: "FIFO002",
      productName: "Office Chair",
      sku: "CHAIR-001",
      method: "LIFO",
      openingStock: 20,
      purchases: 15,
      sales: 10,
      closingStock: 25,
      unitCost: 8000,
      totalValue: 200000,
      lastUpdated: "2024-09-24",
      warehouse: "North Warehouse"
    },
    {
      id: "FIFO003",
      valuationId: "FIFO003",
      productName: "LED TV 43",
      sku: "TV-LED-43",
      method: "Weighted Average",
      openingStock: 15,
      purchases: 10,
      sales: 8,
      closingStock: 17,
      unitCost: 25000,
      totalValue: 425000,
      lastUpdated: "2024-09-23",
      warehouse: "South Warehouse"
    }
  ]);

  // Handlers
  const handleView = (row) => { setViewData(row); setViewShow(true); };
  const handleEdit = (row) => { setEditData(row); setEditShow(true); };
  const handleShowDelete = (id) => { 
    const rowData = fifoData.find(row => row.valuationId === id);
    setDeleteId(id); 
    setDeleteData(rowData);
    setDeleteShow(true); 
  };
  const handleCreateOpen = () => setCreateShow(true);
  const handleClose = () => { setViewShow(false); setEditShow(false); setDeleteShow(false); setCreateShow(false); };

  const handleCreate = (newFifo) => {
    const nextId = fifoData.length + 1;
    const newFifoData = {
      ...newFifo,
      id: `FIFO${String(nextId).padStart(3, '0')}`,
      valuationId: `FIFO${String(nextId).padStart(3, '0')}`
    };
    setFifoData([...fifoData, newFifoData]);
    setCreateShow(false);
  };

  const handleUpdate = (updatedFifo) => {
    setFifoData(fifoData.map(row => 
      row.valuationId === updatedFifo.valuationId 
        ? { ...updatedFifo }
        : row
    ));
  };

  const handleDelete = () => {
    setFifoData(fifoData.filter(row => row.valuationId !== deleteId));
    setDeleteShow(false);
    setDeleteData(null);
    setDeleteId(null);
  };

  // Filter data
  const filteredData = fifoData.filter(row =>
    row.valuationId.toLowerCase().includes(search.toLowerCase()) ||
    row.productName.toLowerCase().includes(search.toLowerCase()) ||
    row.method.toLowerCase().includes(search.toLowerCase())
  );

  const currentPageData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handlePageChange = (event, newPage) => {
    setPage(newPage - 1);
  };

  const getMethodColor = (method) => {
    switch (method) {
      case "FIFO":
        return { backgroundColor: "#e8f5e8", color: "#2e7d32" };
      case "LIFO":
        return { backgroundColor: "#e3f2fd", color: "#1976d2" };
      case "Weighted Average":
        return { backgroundColor: "#fff3e0", color: "#f57c00" };
      default:
        return { backgroundColor: "#f5f5f5", color: "#666" };
    }
  };

  return (
    <div className="content-area">
      {/* Header with Search and Create Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 2, mb: 3 }}>
        <TextField
          placeholder="Search inventory valuation..."
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
          Add Valuation Entry
        </Button>
      </Box>

      {/* Table */}
      <Box sx={{ backgroundColor: 'white', borderRadius: '0.75rem', boxShadow: 1 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>SI</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Valuation ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Product Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Method</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Opening Stock</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Closing Stock</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Unit Cost</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Total Value</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPageData.map((row, index) => (
              <TableRow key={row.id} sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
                <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                <TableCell align="left">
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1976d2' }}>
                    {row.valuationId}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {row.productName}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Chip
                    label={row.method}
                    size="small"
                    sx={{
                      ...getMethodColor(row.method),
                      fontWeight: 500
                    }}
                  />
                </TableCell>
                <TableCell align="left">{row.openingStock}</TableCell>
                <TableCell align="left">{row.closingStock}</TableCell>
                <TableCell align="left">₹{row.unitCost.toLocaleString()}</TableCell>
                <TableCell align="left">₹{row.totalValue.toLocaleString()}</TableCell>
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
                      onClick={() => handleShowDelete(row.valuationId)}
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
            Showing {page * rowsPerPage + 1} to {Math.min((page + 1) * rowsPerPage, filteredData.length)} of {filteredData.length} valuation records
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
          createShow ? "Create New Valuation Entry" :
          viewShow ? "View Valuation Entry" :
          editShow ? "Edit Valuation Entry" :
          deleteShow ? "Delete Valuation Entry" : ""
        }
        dialogContent={
          createShow ? <CreateFIFO handleClose={handleClose} handleCreate={handleCreate} /> :
          viewShow ? <ViewFIFO viewData={viewData} handleClose={handleClose} /> :
          editShow ? <EditFIFO editData={editData} handleUpdate={handleUpdate} handleClose={handleClose} /> :
          deleteShow ? <DeleteFIFO fifoData={deleteData} onClose={handleClose} onDelete={handleDelete} /> : null
        }
      />
    </div>
  );
};

export default FIFOLIFOWeighted;
