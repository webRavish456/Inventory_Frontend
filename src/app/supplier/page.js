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
import CommonDialog from '../../components/CommonDialog';
import CreateSupplier from '../../components/supplier/Create';
import EditSupplier from '../../components/supplier/Edit';
import ViewSupplier from '../../components/supplier/View';
import DeleteSupplier from '../../components/supplier/Delete';

const Supplier = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  const [openData, setOpenData] = useState(false);
  const [viewShow, setViewShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  // Simplified supplier data
  const [supplierData, setSupplierData] = useState([
    {
      id: "SUP001",
      supplierId: "SUP001",
      supplierName: "Tech Solutions Pvt Ltd",
      contactPerson: "Rajesh Kumar",
      email: "rajesh@techsolutions.com",
      phone: "9876543210",
      city: "Mumbai",
      state: "Maharashtra",
      gstNumber: "27ABCDE1234F1Z5",
      supplierType: "Electronics",
      status: "Active"
    },
    {
      id: "SUP002",
      supplierId: "SUP002",
      supplierName: "Furniture World",
      contactPerson: "Priya Sharma",
      email: "priya@furnitureworld.com",
      phone: "8765432109",
      city: "Delhi",
      state: "Delhi",
      gstNumber: "07FGHIJ5678K2L6",
      supplierType: "Furniture",
      status: "Active"
    },
    {
      id: "SUP003",
      supplierId: "SUP003",
      supplierName: "Kitchen Essentials",
      contactPerson: "Amit Patel",
      email: "amit@kitchenessentials.com",
      phone: "7654321098",
      city: "Bangalore",
      state: "Karnataka",
      gstNumber: "29KLMNO9012P3M7",
      supplierType: "Kitchenware",
      status: "Active"
    }
  ]);

  const filteredSuppliers = supplierData.filter(supplier =>
    supplier.supplierName.toLowerCase().includes(search.toLowerCase()) ||
    supplier.contactPerson.toLowerCase().includes(search.toLowerCase()) ||
    supplier.email.toLowerCase().includes(search.toLowerCase()) ||
    supplier.supplierType.toLowerCase().includes(search.toLowerCase())
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

  const getSupplierTypeColor = (type) => {
    switch (type) {
      case "Electronics":
        return "hrms-badge-primary";
      case "Furniture":
        return "hrms-badge-success";
      case "Kitchenware":
        return "hrms-badge-warning";
      default:
        return "hrms-badge-neutral";
    }
  };

  const handleCreateSupplier = () => {
    setSelectedSupplier(null);
    setOpenData(true);
  };

  const handleViewSupplier = (supplier) => {
    setSelectedSupplier(supplier);
    setViewShow(true);
  };

  const handleEditSupplier = (supplier) => {
    setSelectedSupplier(supplier);
    setEditShow(true);
  };

  const handleDeleteSupplier = (supplier) => {
    setSelectedSupplier(supplier);
    setDeleteShow(true);
  };

  const handleSaveSupplier = (formData) => {
    if (editShow) {
      setSupplierData(supplierData.map(supplier => 
        supplier.id === selectedSupplier.id 
          ? { ...supplier, ...formData, updatedDate: new Date().toLocaleDateString() }
          : supplier
      ));
    } else {
      const newSupplier = {
        id: Date.now().toString(),
        supplierId: `SUP${String(supplierData.length + 1).padStart(3, '0')}`,
        ...formData,
        createdDate: new Date().toLocaleDateString(),
        updatedDate: new Date().toLocaleDateString()
      };
      setSupplierData([...supplierData, newSupplier]);
    }
    handleClose();
  };

  const handleDeleteConfirm = () => {
    setSupplierData(supplierData.filter(s => s.id !== selectedSupplier.id));
    handleClose();
  };

  const handleClose = () => {
    setOpenData(false);
    setViewShow(false);
    setEditShow(false);
    setDeleteShow(false);
    setTimeout(() => {
      setSelectedSupplier(null);
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
          placeholder="Search suppliers..."
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
          onClick={handleCreateSupplier}
        >
          <Add />
          Add Supplier
        </button>
      </Box>

      {/* Supplier Table */}
      <Box className="hrms-card">
        <Box className="hrms-card-content" sx={{ padding: 0 }}>
          <Table className="hrms-table">
            <TableHead>
              <TableRow>
                <TableCell>S. No.</TableCell>
                <TableCell>Supplier ID</TableCell>
                <TableCell>Supplier Name</TableCell>
                <TableCell>Contact Person</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>City</TableCell>
                <TableCell>GST Number</TableCell>
                <TableCell>Supplier Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSuppliers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((supplier, index) => (
                  <TableRow key={supplier.id}>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1976d2' }}>
                        {supplier.supplierId}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {supplier.supplierName}
                      </Typography>
                    </TableCell>
                    <TableCell>{supplier.contactPerson}</TableCell>
                    <TableCell>{supplier.phone}</TableCell>
                    <TableCell>{supplier.city}</TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                        {supplier.gstNumber}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box className={`hrms-badge ${getSupplierTypeColor(supplier.supplierType)}`}>
                        {supplier.supplierType}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box className={`hrms-badge ${getStatusColor(supplier.status)}`}>
                        {supplier.status}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                          size="small"
                          onClick={() => handleViewSupplier(supplier)}
                          sx={{ color: '#1976d2' }}
                        >
                          <VisibilityOutlined />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleEditSupplier(supplier)}
                          sx={{ color: '#000' }}
                        >
                          <EditOutlined />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteSupplier(supplier)}
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
              Showing {page * rowsPerPage + 1} to {Math.min((page + 1) * rowsPerPage, filteredSuppliers.length)} of {filteredSuppliers.length} suppliers
            </Typography>
            <Pagination
              count={Math.ceil(filteredSuppliers.length / rowsPerPage)}
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
        key={selectedSupplier?.id || 'create'}
        open={openData || viewShow || editShow || deleteShow}
        onClose={handleClose}
        dialogTitle={
          openData ? "Add Supplier" :
          viewShow ? "Supplier Details" :
          editShow ? "Edit Supplier" :
          deleteShow ? "Delete Supplier" : ""
        }
        dialogContent={
          openData ? (
            <CreateSupplier
              onClose={handleClose}
              onSave={handleSaveSupplier}
            />
          ) : viewShow ? (
            <ViewSupplier
              supplierData={selectedSupplier}
            />
          ) : editShow ? (
            <EditSupplier
              supplierData={selectedSupplier}
              onClose={handleClose}
              onSave={handleSaveSupplier}
            />
          ) : deleteShow ? (
            <DeleteSupplier
              supplierData={selectedSupplier}
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

export default Supplier;