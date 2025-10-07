"use client"
import * as React from 'react';
import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Avatar,
  Pagination,
  Stack,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  Add,
  Search,
  Download,
  VisibilityOutlined,
  EditOutlined,
  DeleteOutline
} from '@mui/icons-material';
import CommonDialog from '@/components/CommonDialog';
import Create from '@/components/finance/expense/Create';
import Edit from '@/components/finance/expense/Edit';
import View from '@/components/finance/expense/View';
import Delete from '@/components/finance/expense/Delete';


export default function expense(){
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [ViewData, setViewData] = useState(null);
  const [editData, setEditData] = useState(null);
  const [openData, setOpenData] = useState(false);
  const [viewShow, setViewShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    amount: "",
    category: "",
    warehouse: "",
    date: "",
    claimType: "Reimbursement",
    approvalStatus: "Pending",
    paymentMode: "",
    employee: "",
    department: "",
    attachment: "",
    description: "",
    vendor: ""
  });

  const createData = (id, name, type, amount, category, warehouse, date, claimType, approvalStatus, paymentMode, employee, department, attachment, description, vendor) => {
    return {
      id,
      name,
      type,
      amount,
      category,
      warehouse,
      date,
      claimType,
      approvalStatus,
      paymentMode,
      employee,
      department,
      attachment,
      description,
      vendor
    };
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'hrms-badge-success';
      case 'Inactive':
        return 'hrms-badge-error';
      case 'Pending':
        return 'hrms-badge-warning';
      default:
        return 'hrms-badge-default';
    }
  };

  const getApprovalStatusColor = (approvalStatus) => {
    switch (approvalStatus) {
      case 'Approved':
        return '#10b981';
      case 'Pending':
        return '#f59e0b';
      case 'Rejected':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const getClaimTypeColor = (claimType) => {
    switch (claimType) {
      case 'Advance':
        return '#3b82f6';
      case 'Reimbursement':
        return '#8b5cf6';
      default:
        return '#6b7280';
    }
  };

  const handleView = (row) => {
    setViewData(row);
    setViewShow(true);
  };

  const handleEdit = (data) => {
    setEditData(data);
    setFormData(data);
    setEditShow(true);
  };

  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDelete = (expense) => {
    setViewData(expense);
    setDeleteShow(true);
  };

  const handleClose = () => {
    setOpenData(false);
    setViewShow(false);
    setEditShow(false);
    setDeleteShow(false);
    setViewData(null);
    setFormData({
      id: "",
      name: "",
      type: "",
      amount: "",
      category: "",
      branch: "",
      date: "",
      status: "Active"
    });
  };

  const handleCreate = (data) => {
    setOpenData(false);
  };

  const handleUpdate = (data) => {
    setEditShow(false);
  };

  const handleDeleteConfirm = () => {
    setDeleteShow(false);
    setViewData(null);
  };

const expenseData = [
  // Staff Management Expenses
  createData("EXP001", "Staff Training Program", "Staff Management", 45000, "Staff Training", "Main Warehouse", "2024-01-15", "Reimbursement", "Approved", "Bank Transfer", "Rajesh Kumar", "Staff Management", "training_certificate.pdf", "Advanced inventory management training for staff", "Training Institute Pro"),
  
  // Warehouse Management Expenses
  createData("EXP002", "Multi-Warehouse Setup", "Warehouse Management", 120000, "Warehouse Setup", "Main Warehouse", "2024-01-20", "Advance", "Approved", "Bank Transfer", "Priya Sharma", "Warehouse Management", "setup_invoice.pdf", "Initial setup cost for multi-warehouse system", "Warehouse Solutions Ltd"),
  createData("EXP003", "Capacity Planning Software", "Warehouse Management", 80000, "Software License", "Branch Warehouse", "2024-01-25", "Reimbursement", "Approved", "Bank Transfer", "Amit Patel", "Warehouse Management", "software_license.pdf", "Capacity planning and optimization software", "CapacitySoft Corp"),
  createData("EXP004", "Bin & Rack Installation", "Warehouse Management", 150000, "Equipment Purchase", "Storage Facility A", "2024-01-30", "Advance", "Approved", "Cheque", "Sneha Gupta", "Warehouse Management", "installation_receipt.pdf", "Professional bin and rack system installation", "Rack Systems Inc"),
  
  // Supplier Management Expenses
  createData("EXP005", "Supplier Evaluation Visit", "Supplier Relations", 25000, "Travel Expense", "Main Warehouse", "2024-02-01", "Reimbursement", "Approved", "Bank Transfer", "Rohit Singh", "Supplier Relations", "travel_receipts.pdf", "Supplier evaluation and relationship building", "Travel Agency Pro"),
  
  // Item Management Expenses
  createData("EXP006", "Product Category Setup", "Item Management", 15000, "Setup Cost", "Cold Storage", "2024-02-05", "Reimbursement", "Approved", "Bank Transfer", "Anita Desai", "Item Management", "setup_receipt.pdf", "Product categorization and classification setup", "Category Solutions"),
  createData("EXP007", "HSN Code Management", "Item Management", 20000, "Compliance Cost", "Distribution Center", "2024-02-10", "Reimbursement", "Approved", "Bank Transfer", "Vikram Joshi", "Item Management", "compliance_certificate.pdf", "HSN code management and compliance setup", "Compliance Services"),
  createData("EXP008", "Batch Tracking System", "Item Management", 60000, "Software License", "Storage Facility B", "2024-02-15", "Advance", "Approved", "Bank Transfer", "Kavita Reddy", "Item Management", "software_license.pdf", "Batch and serial number tracking system", "BatchTrack Software"),
  
  // Customer Management Expenses
  createData("EXP009", "Customer Portal Development", "Customer Relations", 100000, "Development Cost", "Main Warehouse", "2024-02-20", "Advance", "Pending", "Bank Transfer", "Arjun Mehta", "Customer Relations", "development_contract.pdf", "Customer self-service portal development", "WebDev Solutions"),
  
  // Stock Management Expenses
  createData("EXP010", "Stock In/Out System", "Stock Management", 75000, "Software License", "Branch Warehouse", "2024-02-25", "Reimbursement", "Approved", "Bank Transfer", "Deepika Nair", "Stock Management", "software_license.pdf", "Stock in/out tracking and management system", "StockSoft Corp"),
  createData("EXP011", "Real-Time Stock Updates", "Stock Management", 50000, "Software License", "Main Warehouse", "2024-03-01", "Advance", "Approved", "Bank Transfer", "Suresh Kumar", "Stock Management", "software_license.pdf", "Real-time stock monitoring and updates system", "RealTime Solutions"),
  createData("EXP012", "Stock Transfer Management", "Stock Management", 40000, "Software License", "Storage Facility A", "2024-03-05", "Reimbursement", "Approved", "Bank Transfer", "Meera Iyer", "Stock Management", "software_license.pdf", "Inter-warehouse stock transfer management", "TransferSoft Inc"),
  
  // Purchase Management Expenses
  createData("EXP013", "Purchase Order System", "Purchase Management", 90000, "Software License", "Main Warehouse", "2024-03-10", "Advance", "Approved", "Bank Transfer", "Rajesh Kumar", "Purchase Management", "software_license.pdf", "Purchase order management and tracking system", "PurchaseSoft Corp"),
  createData("EXP014", "Goods Receipt System", "Purchase Management", 35000, "Software License", "Branch Warehouse", "2024-03-15", "Reimbursement", "Approved", "Bank Transfer", "Priya Sharma", "Purchase Management", "software_license.pdf", "Goods receipt note management system", "ReceiptSoft Inc"),
  
  // Sales & Order Management Expenses
  createData("EXP015", "Sales Order Processing", "Sales Management", 85000, "Software License", "Main Warehouse", "2024-03-20", "Advance", "Approved", "Bank Transfer", "Amit Patel", "Sales Management", "software_license.pdf", "Sales order processing and management system", "SalesSoft Corp"),
  createData("EXP016", "Order Tracking System", "Sales Management", 45000, "Software License", "Distribution Center", "2024-03-25", "Reimbursement", "Approved", "Bank Transfer", "Sneha Gupta", "Sales Management", "software_license.pdf", "Order tracking and delivery management system", "TrackSoft Inc"),
  
  // Inventory Valuation Expenses
  createData("EXP017", "FIFO/LIFO System", "Inventory Valuation", 70000, "Software License", "Storage Facility B", "2024-03-30", "Advance", "Approved", "Bank Transfer", "Rohit Singh", "Inventory Valuation", "software_license.pdf", "FIFO/LIFO/Weighted average calculation system", "ValuationSoft Corp"),
  createData("EXP018", "Dead Stock Analysis", "Inventory Valuation", 30000, "Software License", "Main Warehouse", "2024-04-01", "Reimbursement", "Approved", "Bank Transfer", "Anita Desai", "Inventory Valuation", "software_license.pdf", "Dead stock identification and analysis system", "DeadStock Solutions"),
  createData("EXP019", "COGS Calculation System", "Inventory Valuation", 55000, "Software License", "Branch Warehouse", "2024-04-05", "Advance", "Pending", "Bank Transfer", "Vikram Joshi", "Inventory Valuation", "software_license.pdf", "Cost of goods sold calculation and tracking", "COGSSoft Inc"),
  
  // Damage Tracking Expenses
  createData("EXP020", "Damage Tracking System", "Damage Tracking", 40000, "Software License", "Storage Facility A", "2024-04-10", "Reimbursement", "Approved", "Bank Transfer", "Kavita Reddy", "Damage Tracking", "software_license.pdf", "Damage tracking and write-off management system", "DamageSoft Corp"),
  createData("EXP021", "Receipt Management System", "Damage Tracking", 25000, "Software License", "Main Warehouse", "2024-04-15", "Reimbursement", "Approved", "Bank Transfer", "Arjun Mehta", "Damage Tracking", "software_license.pdf", "Receipt and bill attachment management system", "ReceiptSoft Inc"),
  
  // Invoice Management Expenses
  createData("EXP022", "Invoice Generation System", "Invoice Management", 65000, "Software License", "Branch Warehouse", "2024-04-20", "Advance", "Approved", "Bank Transfer", "Deepika Nair", "Invoice Management", "software_license.pdf", "Automated invoice generation and management", "InvoiceSoft Corp"),
  
  // Reporting & Analytics Expenses
  createData("EXP023", "Stock Summary Reports", "Reporting & Analytics", 35000, "Software License", "Main Warehouse", "2024-04-25", "Reimbursement", "Approved", "Bank Transfer", "Suresh Kumar", "Reporting & Analytics", "software_license.pdf", "Stock summary and analytics reporting system", "ReportSoft Inc"),
  createData("EXP024", "Sales Analytics Dashboard", "Reporting & Analytics", 50000, "Software License", "Distribution Center", "2024-04-30", "Advance", "Approved", "Bank Transfer", "Meera Iyer", "Reporting & Analytics", "software_license.pdf", "Sales analytics and dashboard system", "AnalyticsSoft Corp"),
];

// Filter data based on search
const filteredData = expenseData.filter(expense =>
  expense.name.toLowerCase().includes(search.toLowerCase()) ||
  expense.type.toLowerCase().includes(search.toLowerCase()) ||
  expense.category.toLowerCase().includes(search.toLowerCase()) ||
  expense.branch.toLowerCase().includes(search.toLowerCase()) ||
  expense.id.toLowerCase().includes(search.toLowerCase()) ||
  expense.employee.toLowerCase().includes(search.toLowerCase()) ||
  expense.department.toLowerCase().includes(search.toLowerCase()) ||
  expense.claimType.toLowerCase().includes(search.toLowerCase()) ||
  expense.approvalStatus.toLowerCase().includes(search.toLowerCase())
);

// Pagination
const startIndex = (page - 1) * rowsPerPage;
const endIndex = startIndex + rowsPerPage;
const paginatedData = filteredData.slice(startIndex, endIndex);
const totalPages = Math.ceil(filteredData.length / rowsPerPage);




  return (
    <Box sx={{ padding: "0.5rem" }}>

      {/* Search and Action Bar */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginBottom: "1.5rem", gap: 2 }}>
        <TextField
          placeholder="Search by name, employee, department, claim type, approval status..."
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            width: "300px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              backgroundColor: "#fff",
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: "#6b7280" }} />
              </InputAdornment>
            )
          }}
        />
        
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenData(true)}
          sx={{
            borderRadius: "8px",
            textTransform: "none",
            backgroundColor: "#3b82f6",
            "&:hover": {
              backgroundColor: "#2563eb"
            }
          }}
        >
          Add Expense
        </Button>
      </Box>

      {/* Table */}
      <Box className="hrms-card">
        <Box className="hrms-card-content" sx={{ padding: 0 }}>
          <Table className="hrms-table">
            <TableHead>
              <TableRow>
                <TableCell>S. No</TableCell>
                <TableCell>Expense ID</TableCell>
                <TableCell>Expense Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Warehouse</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((expense, index) => (
                <TableRow key={expense.id}>
                  <TableCell>{startIndex + index + 1}</TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {expense.id}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {expense.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={expense.type}
                      size="small"
                      sx={{
                        backgroundColor: expense.type === 'Equipment' ? '#fef3c7' : expense.type === 'Utilities' ? '#dbeafe' : '#f3e8ff',
                        color: expense.type === 'Equipment' ? '#92400e' : expense.type === 'Utilities' ? '#1e40af' : '#7c3aed'
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#ef4444" }}>
                    ₹{expense.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>{expense.category}</TableCell>
                  <TableCell>{expense.warehouse}</TableCell>
                  <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        size="small"
                        onClick={() => handleView(expense)}
                        sx={{ color: "#3b82f6" }}
                      >
                        <VisibilityOutlined fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleEdit(expense)}
                        sx={{ color: "#6b7280" }}
                      >
                        <EditOutlined fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(expense)}
                        sx={{ color: "#ef4444" }}
                      >
                        <DeleteOutline fontSize="small" />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>

        {/* Pagination */}
        <Box sx={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          padding: "1rem",
          borderTop: "1px solid #e5e7eb"
        }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="body2" color="text.secondary">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} records
            </Typography>
          </Stack>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(event, value) => setPage(value)}
            color="primary"
            shape="rounded"
            size="small"
          />
        </Box>
      </Box>

      {/* Dialog */}
      <CommonDialog
        open={openData || viewShow || editShow || deleteShow}
        onClose={handleClose}
        dialogTitle={
          openData
            ? "Add New Expense"
            : viewShow
            ? "View Expense Details"
            : editShow
            ? "Edit Expense"
            : deleteShow
            ? "Delete Expense"
            : ""
        }
        dialogContent={
          openData ? (
            <Create formData={formData} handleInputChange={handleFormChange} />
          ) : viewShow ? (
            <View selectedData={ViewData} getStatusColor={getStatusColor} />
          ) : editShow ? (
            <Edit formData={formData} handleInputChange={handleFormChange} />
          ) : deleteShow ? (
            <Delete selectedData={ViewData} />
          ) : null
        }
        primaryAction={openData || editShow || deleteShow}
        primaryActionText={openData ? "Create" : editShow ? "Update" : "Delete"}
        primaryActionColor={deleteShow ? "error" : "primary"}
        onPrimaryAction={openData ? handleCreate : editShow ? handleUpdate : handleDeleteConfirm}
        secondaryActionText={viewShow ? "Close" : "Cancel"}
        showActions={!viewShow}
        maxWidth={deleteShow ? "xs" : "md"}
        fullWidth={!deleteShow}
      />
    </Box>
  )
}