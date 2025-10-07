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
  PictureAsPdf,
  VisibilityOutlined,
  EditOutlined,
  DeleteOutline
} from '@mui/icons-material';
import CommonDialog from '@/components/CommonDialog';
import Create from '@/components/finance/income/Create';
import Edit from '@/components/finance/income/Edit';
import View from '@/components/finance/income/View';
import Delete from '@/components/finance/income/Delete';


export default function income(){
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
    client: "",
    paymentMethod: "",
    dueDate: "",
    receivedDate: "",
    description: ""
  });

  const createData = (id, name, type, amount, category, warehouse, date, client, paymentMethod, dueDate, receivedDate, description) => {
    return {
      id,
      name,
      type,
      amount,
      category,
      warehouse,
      date,
      client,
      paymentMethod,
      dueDate,
      receivedDate,
      description
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

  const getTypeColor = (type) => {
    switch (type) {
      case 'Recurring':
        return '#3b82f6';
      case 'One-time':
        return '#8b5cf6';
      default:
        return '#6b7280';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Software':
        return '#10b981';
      case 'Service':
        return '#f59e0b';
      case 'Education':
        return '#3b82f6';
      case 'Marketing':
        return '#ef4444';
      case 'Sales':
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

  const handleDelete = (income) => {
    setViewData(income);
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
      warehouse: "",
      date: "",
      status: "Active",
      client: "",
      paymentMethod: "",
      invoiceNumber: "",
      dueDate: "",
      receivedDate: "",
      description: ""
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

const incomeData = [
  // Staff Management Income
  createData("INC001", "Staff Training Services", "Recurring", 120000, "Training Services", "Main Warehouse", "2024-01-15", "Training Institute Pro", "Bank Transfer", "2024-01-30", "2024-01-28", "Advanced inventory management training services"),
  
  // Warehouse Management Income
  createData("INC002", "Multi-Warehouse Consulting", "One-time", 250000, "Consulting Services", "Main Warehouse", "2024-01-20", "Warehouse Solutions Ltd", "Bank Transfer", "2024-02-15", "2024-02-10", "Multi-warehouse setup and optimization consulting"),
  createData("INC003", "Capacity Planning Services", "Recurring", 80000, "Software Services", "Branch Warehouse", "2024-01-25", "CapacitySoft Corp", "Bank Transfer", "2024-02-05", "2024-02-03", "Monthly capacity planning and optimization services"),
  createData("INC004", "Bin & Rack Design Services", "One-time", 150000, "Design Services", "Storage Facility A", "2024-01-30", "Rack Systems Inc", "Cheque", "2024-02-20", "2024-02-18", "Professional bin and rack system design"),
  
  // Supplier Management Income
  createData("INC005", "Supplier Evaluation Services", "Recurring", 60000, "Evaluation Services", "Main Warehouse", "2024-02-01", "Supplier Relations Pro", "Bank Transfer", "2024-02-25", "2024-02-22", "Supplier evaluation and relationship management"),
  
  // Item Management Income
  createData("INC006", "Product Categorization Services", "One-time", 75000, "Setup Services", "Cold Storage", "2024-02-05", "Category Solutions", "Bank Transfer", "2024-03-05", "2024-03-02", "Product categorization and classification services"),
  createData("INC007", "HSN Code Management Services", "Recurring", 45000, "Compliance Services", "Distribution Center", "2024-02-10", "Compliance Services", "Bank Transfer", "2024-03-10", "2024-03-08", "HSN code management and compliance services"),
  createData("INC008", "Batch Tracking Services", "Recurring", 90000, "Software Services", "Storage Facility B", "2024-02-15", "BatchTrack Software", "Bank Transfer", "2024-03-15", "2024-03-12", "Batch and serial number tracking services"),
  
  // Customer Management Income
  createData("INC009", "Customer Portal Services", "Recurring", 100000, "Development Services", "Main Warehouse", "2024-02-20", "WebDev Solutions", "Bank Transfer", "2024-03-20", "2024-03-18", "Customer self-service portal maintenance"),
  
  // Stock Management Income
  createData("INC010", "Stock In/Out Services", "Recurring", 75000, "Software Services", "Branch Warehouse", "2024-02-25", "StockSoft Corp", "Bank Transfer", "2024-03-25", "2024-03-22", "Stock in/out tracking and management services"),
  createData("INC011", "Real-Time Stock Services", "Recurring", 65000, "Software Services", "Main Warehouse", "2024-03-01", "RealTime Solutions", "Bank Transfer", "2024-03-30", "2024-03-28", "Real-time stock monitoring services"),
  createData("INC012", "Stock Transfer Services", "Recurring", 50000, "Software Services", "Storage Facility A", "2024-03-05", "TransferSoft Inc", "Bank Transfer", "2024-04-05", "2024-04-02", "Inter-warehouse stock transfer services"),
  
  // Purchase Management Income
  createData("INC013", "Purchase Order Services", "Recurring", 85000, "Software Services", "Main Warehouse", "2024-03-10", "PurchaseSoft Corp", "Bank Transfer", "2024-04-10", "2024-04-08", "Purchase order management services"),
  createData("INC014", "Goods Receipt Services", "Recurring", 55000, "Software Services", "Branch Warehouse", "2024-03-15", "ReceiptSoft Inc", "Bank Transfer", "2024-04-15", "2024-04-12", "Goods receipt note management services"),
  
  // Sales & Order Management Income
  createData("INC015", "Sales Order Services", "Recurring", 95000, "Software Services", "Main Warehouse", "2024-03-20", "SalesSoft Corp", "Bank Transfer", "2024-04-20", "2024-04-18", "Sales order processing services"),
  createData("INC016", "Order Tracking Services", "Recurring", 70000, "Software Services", "Distribution Center", "2024-03-25", "TrackSoft Inc", "Bank Transfer", "2024-04-25", "2024-04-22", "Order tracking and delivery services"),
  
  // Inventory Valuation Income
  createData("INC017", "FIFO/LIFO Services", "Recurring", 80000, "Software Services", "Storage Facility B", "2024-03-30", "ValuationSoft Corp", "Bank Transfer", "2024-04-30", "2024-04-28", "FIFO/LIFO/Weighted average calculation services"),
  createData("INC018", "Dead Stock Analysis Services", "Recurring", 60000, "Analysis Services", "Main Warehouse", "2024-04-01", "DeadStock Solutions", "Bank Transfer", "2024-05-01", "2024-04-29", "Dead stock identification and analysis services"),
  createData("INC019", "COGS Calculation Services", "Recurring", 70000, "Software Services", "Branch Warehouse", "2024-04-05", "COGSSoft Inc", "Bank Transfer", "2024-05-05", "2024-05-03", "Cost of goods sold calculation services"),
  
  // Damage Tracking Income
  createData("INC020", "Damage Tracking Services", "Recurring", 50000, "Software Services", "Storage Facility A", "2024-04-10", "DamageSoft Corp", "Bank Transfer", "2024-05-10", "2024-05-08", "Damage tracking and write-off services"),
  createData("INC021", "Receipt Management Services", "Recurring", 40000, "Software Services", "Main Warehouse", "2024-04-15", "ReceiptSoft Inc", "Bank Transfer", "2024-05-15", "2024-05-13", "Receipt and bill management services"),
  
  // Invoice Management Income
  createData("INC022", "Invoice Generation Services", "Recurring", 75000, "Software Services", "Branch Warehouse", "2024-04-20", "InvoiceSoft Corp", "Bank Transfer", "2024-05-20", "2024-05-18", "Automated invoice generation services"),
  
  // Reporting & Analytics Income
  createData("INC023", "Stock Summary Reports", "Recurring", 60000, "Report Services", "Main Warehouse", "2024-04-25", "ReportSoft Inc", "Bank Transfer", "2024-05-25", "2024-05-23", "Stock summary and analytics reporting services"),
  createData("INC024", "Sales Analytics Services", "Recurring", 80000, "Analytics Services", "Distribution Center", "2024-04-30", "AnalyticsSoft Corp", "Bank Transfer", "2024-05-30", "2024-05-28", "Sales analytics and dashboard services"),
];

// Filter data based on search
const filteredData = incomeData.filter(income =>
  income.name.toLowerCase().includes(search.toLowerCase()) ||
  income.type.toLowerCase().includes(search.toLowerCase()) ||
  income.category.toLowerCase().includes(search.toLowerCase()) ||
  income.warehouse.toLowerCase().includes(search.toLowerCase()) ||
  income.id.toLowerCase().includes(search.toLowerCase()) ||
  income.client.toLowerCase().includes(search.toLowerCase()) ||
  income.paymentMethod.toLowerCase().includes(search.toLowerCase())
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
          placeholder="Search by name, client, warehouse, payment method..."
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
          Add Income
        </Button>
      </Box>

      {/* Table */}
      <Box className="hrms-card">
        <Box className="hrms-card-content" sx={{ padding: 0 }}>
          <Table className="hrms-table">
            <TableHead>
              <TableRow>
                <TableCell>S. No</TableCell>
                <TableCell>Income</TableCell>
                <TableCell>Client</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Warehouse</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
        <TableBody>
              {paginatedData.map((income, index) => (
                <TableRow key={income.id}>
                  <TableCell>{startIndex + index + 1}</TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {income.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#666" }}>
                        {income.id}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {income.client}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={income.type}
                      size="small"
                      sx={{
                        backgroundColor: getTypeColor(income.type),
                        color: "white",
                        fontWeight: 500,
                        fontSize: "0.75rem"
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#10b981" }}>
                    ₹{income.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={income.category}
                      size="small"
                      sx={{
                        backgroundColor: getCategoryColor(income.category),
                        color: "white",
                        fontWeight: 500,
                        fontSize: "0.75rem"
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 500, color: "#374151" }}>{income.warehouse}</TableCell>
                  <TableCell sx={{ fontWeight: 500, color: "#374151" }}>{new Date(income.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        size="small"
                        onClick={() => handleView(income)}
                        sx={{ color: "#3b82f6" }}
                      >
                        <VisibilityOutlined fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleEdit(income)}
                        sx={{ color: "#6b7280" }}
                      >
                        <EditOutlined fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(income)}
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
              ? "Add New Income"
              : viewShow
              ? "View Income Details"
              : editShow
              ? "Edit Income"
              : deleteShow
              ? "Delete Income"
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