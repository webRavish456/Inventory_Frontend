'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Pagination,
  Stack,
} from "@mui/material";
import { Search, Add, VisibilityOutlined, EditOutlined, DeleteOutlined } from "@mui/icons-material";
import CommonDialog from '../../../components/CommonDialog';
import CreateBatch from '../../../components/BatchTracking/Create';
import EditBatch from '../../../components/BatchTracking/Edit';
import ViewBatch from '../../../components/BatchTracking/View';
import DeleteBatch from '../../../components/BatchTracking/Delete';

const BatchSerialTracking = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  const [openData, setOpenData] = useState(false);
  const [viewShow, setViewShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null);

  // Sample products for dropdown
  const products = [
    { id: 'PROD001', name: 'Samsung Galaxy S24' },
    { id: 'PROD002', name: 'Dell Inspiron 15' },
    { id: 'PROD003', name: 'Office Chair' },
    { id: 'PROD004', name: 'Coffee Mug' }
  ];

  // Sample batch/serial data
  const [batchData, setBatchData] = useState([
    {
      id: 'BATCH001',
      productId: 'PROD001',
      productName: 'Samsung Galaxy S24',
      batchNumber: 'BATCH-2024-001',
      serialNumber: 'SN001-SN025',
      quantity: 25,
      expiryDate: '2025-12-31',
      manufacturingDate: '2024-01-15',
      supplier: 'Samsung India',
      status: 'Active'
    },
    {
      id: 'BATCH002',
      productId: 'PROD002',
      productName: 'Dell Inspiron 15',
      batchNumber: 'BATCH-2024-002',
      serialNumber: 'SN026-SN040',
      quantity: 15,
      expiryDate: '2026-06-30',
      manufacturingDate: '2024-02-10',
      supplier: 'Dell Technologies',
      status: 'Active'
    },
    {
      id: 'BATCH003',
      productId: 'PROD003',
      productName: 'Office Chair',
      batchNumber: 'BATCH-2024-003',
      serialNumber: 'SN041-SN048',
      quantity: 8,
      expiryDate: '2027-03-15',
      manufacturingDate: '2024-03-05',
      supplier: 'OfficePro Furniture',
      status: 'Active'
    }
  ]);

  const filteredBatches = batchData.filter(batch =>
    batch.productName.toLowerCase().includes(search.toLowerCase()) ||
    batch.batchNumber.toLowerCase().includes(search.toLowerCase()) ||
    batch.serialNumber.toLowerCase().includes(search.toLowerCase()) ||
    batch.supplier.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "hrms-badge-success";
      case "Expired":
        return "hrms-badge-error";
      case "Low Stock":
        return "hrms-badge-warning";
      default:
        return "hrms-badge-neutral";
    }
  };

  const handleCreateBatch = () => {
    setSelectedBatch(null);
    setOpenData(true);
  };

  const handleViewBatch = (batch) => {
    setSelectedBatch(batch);
    setViewShow(true);
  };

  const handleEditBatch = (batch) => {
    setSelectedBatch(batch);
    setEditShow(true);
  };

  const handleDeleteBatch = (batch) => {
    setSelectedBatch(batch);
    setDeleteShow(true);
  };

  const handleSaveBatch = (batchData) => {
    if (openData) {
      // Create new batch
      setBatchData(prev => [...prev, batchData]);
    } else if (editShow) {
      // Update existing batch
      setBatchData(prev => prev.map(b => b.id === selectedBatch.id ? batchData : b));
    }
  };

  const handleDeleteConfirm = (id) => {
    setBatchData(prev => prev.filter(b => b.id !== id));
  };

  const handleClose = () => {
    setOpenData(false);
    setViewShow(false);
    setEditShow(false);
    setDeleteShow(false);
    setTimeout(() => setSelectedBatch(null), 100);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage - 1);
  };

  return (
    <div className="content-area">

      {/* Search and Add Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <TextField
          placeholder="Search batches..."
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
          onClick={handleCreateBatch}
        >
          <Add />
          Add Batch
        </button>
      </Box>

      {/* Batch Tracking Table */}
      <Box className="hrms-card">
        <Box className="hrms-card-content" sx={{ padding: 0 }}>
          <Table className="hrms-table">
            <TableHead>
              <TableRow>
                <TableCell>S. No.</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>Batch Number</TableCell>
                <TableCell>Serial Numbers</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Manufacturing Date</TableCell>
                <TableCell>Expiry Date</TableCell>
                <TableCell>Supplier</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBatches
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((batch, index) => (
                  <TableRow key={batch.id}>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {batch.productName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ color: '#1976d2', fontWeight: 500 }}>
                        {batch.batchNumber}
                      </Typography>
                    </TableCell>
                    <TableCell>{batch.serialNumber}</TableCell>
                    <TableCell>{batch.quantity}</TableCell>
                    <TableCell>{batch.manufacturingDate}</TableCell>
                    <TableCell>{batch.expiryDate}</TableCell>
                    <TableCell>{batch.supplier}</TableCell>
                    <TableCell>
                      <Box className={`hrms-badge ${getStatusColor(batch.status)}`}>
                        {batch.status}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                          size="small"
                          onClick={() => handleViewBatch(batch)}
                          sx={{ color: '#1976d2' }}
                        >
                          <VisibilityOutlined />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleEditBatch(batch)}
                          sx={{ color: '#ff9800' }}
                        >
                          <EditOutlined />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteBatch(batch)}
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
              Showing {page * rowsPerPage + 1} to {Math.min((page + 1) * rowsPerPage, filteredBatches.length)} of {filteredBatches.length} batches
            </Typography>
            <Pagination
              count={Math.ceil(filteredBatches.length / rowsPerPage)}
              page={page + 1}
              onChange={handlePageChange}
              color="primary"
              size="small"
            />
          </Stack>
        </Box>
      </Box>

      {/* CommonDialog for all CRUD operations */}
      <CommonDialog
        key={selectedBatch?.id || 'create'}
        open={openData || viewShow || editShow || deleteShow}
        onClose={handleClose}
        dialogTitle={
          openData ? "Add Batch" :
          viewShow ? "Batch Details" :
          editShow ? "Edit Batch" :
          deleteShow ? "Delete Batch" : ""
        }
        dialogContent={
          openData ? (
            <CreateBatch
              onClose={handleClose}
              onSave={handleSaveBatch}
            />
          ) : viewShow ? (
            <ViewBatch
              batchData={selectedBatch}
            />
          ) : editShow ? (
            <EditBatch
              batchData={selectedBatch}
              onClose={handleClose}
              onSave={handleSaveBatch}
            />
          ) : deleteShow ? (
            <DeleteBatch
              batchData={selectedBatch}
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

export default BatchSerialTracking;