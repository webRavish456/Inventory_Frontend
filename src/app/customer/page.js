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
import CreateCustomer from '../../components/Customer Management/Create';
import EditCustomer from '../../components/Customer Management/Edit';
import ViewCustomer from '../../components/Customer Management/View';
import DeleteCustomer from '../../components/Customer Management/Delete';

const Customer = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  const [openData, setOpenData] = useState(false);
  const [viewShow, setViewShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Simplified customer data
  const [customerData, setCustomerData] = useState([
    {
      id: "CUST001",
      customerId: "CUST001",
      customerName: "Rajesh Kumar",
      email: "rajesh.kumar@gmail.com",
      phone: "9876543210",
      address: "123 Main Street, Andheri West",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      gstNumber: "27ABCDE1234F1Z5",
      customerType: "Regular",
      status: "Active"
    },
    {
      id: "CUST002",
      customerId: "CUST002",
      customerName: "Priya Sharma",
      email: "priya.sharma@yahoo.com",
      phone: "8765432109",
      address: "456 Park Avenue, Connaught Place",
      city: "Delhi",
      state: "Delhi",
      pincode: "110001",
      gstNumber: "07FGHIJ5678K2L6",
      customerType: "Premium",
      status: "Active"
    },
    {
      id: "CUST003",
      customerId: "CUST003",
      customerName: "Amit Patel",
      email: "amit.patel@hotmail.com",
      phone: "7654321098",
      address: "789 Commercial Street, MG Road",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560001",
      gstNumber: "29KLMNO9012P3M7",
      customerType: "VIP",
      status: "Active"
    }
  ]);

  const filteredCustomers = customerData.filter(customer =>
    customer.customerName.toLowerCase().includes(search.toLowerCase()) ||
    customer.email.toLowerCase().includes(search.toLowerCase()) ||
    customer.phone.includes(search) ||
    customer.customerType.toLowerCase().includes(search.toLowerCase())
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

  const getCustomerTypeColor = (type) => {
    switch (type) {
      case "VIP":
        return "hrms-badge-primary";
      case "Premium":
        return "hrms-badge-success";
      case "Regular":
        return "hrms-badge-neutral";
      default:
        return "hrms-badge-neutral";
    }
  };

  const handleCreateCustomer = () => {
    setSelectedCustomer(null);
    setOpenData(true);
  };

  const handleViewCustomer = (customer) => {
    setSelectedCustomer(customer);
    setViewShow(true);
  };

  const handleEditCustomer = (customer) => {
    setSelectedCustomer(customer);
    setEditShow(true);
  };

  const handleDeleteCustomer = (customer) => {
    setSelectedCustomer(customer);
    setDeleteShow(true);
  };

  const handleSaveCustomer = (formData) => {
    if (editShow) {
      setCustomerData(customerData.map(customer => 
        customer.id === selectedCustomer.id 
          ? { ...customer, ...formData, updatedDate: new Date().toLocaleDateString() }
          : customer
      ));
    } else {
      const newCustomer = {
        id: Date.now().toString(),
        customerId: `CUST${String(customerData.length + 1).padStart(3, '0')}`,
        ...formData,
        createdDate: new Date().toLocaleDateString(),
        updatedDate: new Date().toLocaleDateString()
      };
      setCustomerData([...customerData, newCustomer]);
    }
    handleClose();
  };

  const handleDeleteConfirm = () => {
    setCustomerData(customerData.filter(c => c.id !== selectedCustomer.id));
    handleClose();
  };

  const handleClose = () => {
    setOpenData(false);
    setViewShow(false);
    setEditShow(false);
    setDeleteShow(false);
    setTimeout(() => {
      setSelectedCustomer(null);
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
          placeholder="Search customers..."
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
          onClick={handleCreateCustomer}
        >
          <Add />
          Add Customer
        </button>
      </Box>

      {/* Customer Table */}
      <Box className="hrms-card">
        <Box className="hrms-card-content" sx={{ padding: 0 }}>
          <Table className="hrms-table">
            <TableHead>
              <TableRow>
                <TableCell>S. No.</TableCell>
                <TableCell>Customer ID</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>City</TableCell>
                <TableCell>GST Number</TableCell>
                <TableCell>Customer Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCustomers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((customer, index) => (
                  <TableRow key={customer.id}>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1976d2' }}>
                        {customer.customerId}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {customer.customerName}
                      </Typography>
                    </TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell>{customer.city}</TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                        {customer.gstNumber}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box className={`hrms-badge ${getCustomerTypeColor(customer.customerType)}`}>
                        {customer.customerType}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box className={`hrms-badge ${getStatusColor(customer.status)}`}>
                        {customer.status}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                          size="small"
                          onClick={() => handleViewCustomer(customer)}
                          sx={{ color: '#1976d2' }}
                        >
                          <VisibilityOutlined />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleEditCustomer(customer)}
                          sx={{ color: '#000' }}
                        >
                          <EditOutlined />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteCustomer(customer)}
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
              Showing {page * rowsPerPage + 1} to {Math.min((page + 1) * rowsPerPage, filteredCustomers.length)} of {filteredCustomers.length} customers
            </Typography>
            <Pagination
              count={Math.ceil(filteredCustomers.length / rowsPerPage)}
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
        key={selectedCustomer?.id || 'create'}
        open={openData || viewShow || editShow || deleteShow}
        onClose={handleClose}
        dialogTitle={
          openData ? "Add Customer" :
          viewShow ? "Customer Details" :
          editShow ? "Edit Customer" :
          deleteShow ? "Delete Customer" : ""
        }
        dialogContent={
          openData ? (
            <CreateCustomer
              onClose={handleClose}
              onSave={handleSaveCustomer}
            />
          ) : viewShow ? (
            <ViewCustomer
              customerData={selectedCustomer}
            />
          ) : editShow ? (
            <EditCustomer
              customerData={selectedCustomer}
              onClose={handleClose}
              onSave={handleSaveCustomer}
            />
          ) : deleteShow ? (
            <DeleteCustomer
              customerData={selectedCustomer}
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

export default Customer;