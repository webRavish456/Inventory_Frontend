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
import CreateStockTransfer from '../../../components/Stock Management/StockTransfer/Create';
import EditStockTransfer from '../../../components/Stock Management/StockTransfer/Edit';
import ViewStockTransfer from '../../../components/Stock Management/StockTransfer/View';
import DeleteStockTransfer from '../../../components/Stock Management/StockTransfer/Delete';

const StockTransfer = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  const [openData, setOpenData] = useState(false);
  const [viewShow, setViewShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [selectedTransfer, setSelectedTransfer] = useState(null);

  // Stock transfer data
  const [stockTransferData, setStockTransferData] = useState([
    {
      id: "ST001",
      transferId: "ST001",
      productName: "Samsung Galaxy S24",
      fromWarehouse: "Electronics Warehouse",
      toWarehouse: "Electronics Warehouse - Branch",
      transferQuantity: 10,
      transferDate: "2024-09-20",
      transferReason: "Branch Restocking",
      transferBy: "Warehouse Manager",
      status: "Completed"
    },
    {
      id: "ST002",
      transferId: "ST002",
      productName: "Dell Laptop Inspiron 15",
      fromWarehouse: "Electronics Warehouse",
      toWarehouse: "Electronics Warehouse - Branch",
      transferQuantity: 5,
      transferDate: "2024-09-19",
      transferReason: "Demand Transfer",
      transferBy: "Stock Clerk",
      status: "In Transit"
    },
    {
      id: "ST003",
      transferId: "ST003",
      productName: "Office Chair Ergonomic",
      fromWarehouse: "Furniture Warehouse",
      toWarehouse: "Furniture Warehouse - Branch",
      transferQuantity: 3,
      transferDate: "2024-09-18",
      transferReason: "Seasonal Transfer",
      transferBy: "Warehouse Manager",
      status: "Pending"
    }
  ]);

  const filteredTransfers = stockTransferData.filter(transfer =>
    transfer.productName.toLowerCase().includes(search.toLowerCase()) ||
    transfer.fromWarehouse.toLowerCase().includes(search.toLowerCase()) ||
    transfer.toWarehouse.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "hrms-badge-success";
      case "In Transit":
        return "hrms-badge-warning";
      case "Pending":
        return "hrms-badge-neutral";
      case "Cancelled":
        return "hrms-badge-error";
      default:
        return "hrms-badge-neutral";
    }
  };

  const handleCreateTransfer = () => {
    setSelectedTransfer(null);
    setOpenData(true);
  };

  const handleViewTransfer = (transfer) => {
    setSelectedTransfer(transfer);
    setViewShow(true);
  };

  const handleEditTransfer = (transfer) => {
    setSelectedTransfer(transfer);
    setEditShow(true);
  };

  const handleDeleteTransfer = (transfer) => {
    setSelectedTransfer(transfer);
    setDeleteShow(true);
  };

  const handleSaveTransfer = (formData) => {
    if (editShow) {
      setStockTransferData(stockTransferData.map(transfer => 
        transfer.id === selectedTransfer.id 
          ? { ...transfer, ...formData, lastUpdated: new Date().toLocaleDateString() }
          : transfer
      ));
    } else {
      const newTransfer = {
        id: Date.now().toString(),
        transferId: `ST${String(stockTransferData.length + 1).padStart(3, '0')}`,
        ...formData,
        createdDate: new Date().toLocaleDateString(),
        lastUpdated: new Date().toLocaleDateString()
      };
      setStockTransferData([...stockTransferData, newTransfer]);
    }
    handleClose();
  };

  const handleDeleteConfirm = () => {
    setStockTransferData(stockTransferData.filter(t => t.id !== selectedTransfer.id));
    handleClose();
  };

  const handleClose = () => {
    setOpenData(false);
    setViewShow(false);
    setEditShow(false);
    setDeleteShow(false);
    setTimeout(() => {
      setSelectedTransfer(null);
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
          placeholder="Search stock transfers..."
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
          onClick={handleCreateTransfer}
        >
          <Add />
          Add Stock Transfer
        </button>
      </Box>

      {/* Stock Transfer Table */}
      <Box className="hrms-card">
        <Box className="hrms-card-content" sx={{ padding: 0 }}>
          <Table className="hrms-table">
            <TableHead>
              <TableRow>
                <TableCell>S. No.</TableCell>
                <TableCell>Transfer ID</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>From Warehouse</TableCell>
                <TableCell>To Warehouse</TableCell>
                <TableCell>Transfer Quantity</TableCell>
                <TableCell>Transfer Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTransfers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((transfer, index) => (
                  <TableRow key={transfer.id}>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1976d2' }}>
                        {transfer.transferId}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {transfer.productName}
                      </Typography>
                    </TableCell>
                    <TableCell>{transfer.fromWarehouse}</TableCell>
                    <TableCell>{transfer.toWarehouse}</TableCell>
                    <TableCell>{transfer.transferQuantity}</TableCell>
                    <TableCell>{transfer.transferDate}</TableCell>
                    <TableCell>
                      <Box className={`hrms-badge ${getStatusColor(transfer.status)}`}>
                        {transfer.status}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                          size="small"
                          onClick={() => handleViewTransfer(transfer)}
                          sx={{ color: '#1976d2' }}
                        >
                          <VisibilityOutlined />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleEditTransfer(transfer)}
                          sx={{ color: '#000' }}
                        >
                          <EditOutlined />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteTransfer(transfer)}
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
              Showing {page * rowsPerPage + 1} to {Math.min((page + 1) * rowsPerPage, filteredTransfers.length)} of {filteredTransfers.length} stock transfers
            </Typography>
            <Pagination
              count={Math.ceil(filteredTransfers.length / rowsPerPage)}
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
        key={selectedTransfer?.id || 'create'}
        open={openData || viewShow || editShow || deleteShow}
        onClose={handleClose}
        dialogTitle={
          openData ? "Add Stock Transfer" :
          viewShow ? "Stock Transfer Details" :
          editShow ? "Edit Stock Transfer" :
          deleteShow ? "Delete Stock Transfer" : ""
        }
        dialogContent={
          openData ? (
            <CreateStockTransfer
              onClose={handleClose}
              onSave={handleSaveTransfer}
            />
          ) : viewShow ? (
            <ViewStockTransfer
              transferData={selectedTransfer}
            />
          ) : editShow ? (
            <EditStockTransfer
              transferData={selectedTransfer}
              onClose={handleClose}
              onSave={handleSaveTransfer}
            />
          ) : deleteShow ? (
            <DeleteStockTransfer
              transferData={selectedTransfer}
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

export default StockTransfer;