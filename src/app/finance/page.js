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

const Finance = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);

  // Finance data based on spreadsheet specifications
  const [financeData, setFinanceData] = useState([
    {
      id: "FIN001",
      transactionId: "FIN001",
      transactionType: "Income",
      category: "Sales Revenue",
      description: "Sales of Samsung Galaxy S24",
      amount: 45000,
      date: "2024-09-20",
      paymentMethod: "UPI",
      reference: "SO001",
      customerName: "Rajesh Kumar",
      status: "Completed",
      createdBy: "Priya Singh",
      approvedBy: "Ayush Kumar",
      notes: "Customer payment received"
    },
    {
      id: "FIN002",
      transactionId: "FIN002",
      transactionType: "Expense",
      category: "Purchase",
      description: "Purchase of Office Chairs",
      amount: 96000,
      date: "2024-09-18",
      paymentMethod: "Bank Transfer",
      reference: "PO002",
      supplierName: "Furniture World",
      status: "Completed",
      createdBy: "Nysa Mittal",
      approvedBy: "Priya Singh",
      notes: "Payment to supplier"
    },
    {
      id: "FIN003",
      transactionId: "FIN003",
      transactionType: "Expense",
      category: "Operating Expense",
      description: "Warehouse Rent",
      amount: 50000,
      date: "2024-09-15",
      paymentMethod: "Cheque",
      reference: "RENT001",
      vendorName: "Property Owner",
      status: "Completed",
      createdBy: "Ayush Kumar",
      approvedBy: "Priya Singh",
      notes: "Monthly warehouse rent"
    },
    {
      id: "FIN004",
      transactionId: "FIN004",
      transactionType: "Income",
      category: "Sales Revenue",
      description: "Sales of LED TV",
      amount: 35000,
      date: "2024-09-22",
      paymentMethod: "Cash on Delivery",
      reference: "SO003",
      customerName: "Amit Patel",
      status: "Pending",
      createdBy: "Nysa Mittal",
      approvedBy: "Priya Singh",
      notes: "COD payment pending"
    },
    {
      id: "FIN005",
      transactionId: "FIN005",
      transactionType: "Expense",
      category: "Utilities",
      description: "Electricity Bill",
      amount: 15000,
      date: "2024-09-10",
      paymentMethod: "Online Transfer",
      reference: "UTIL001",
      vendorName: "Electricity Board",
      status: "Completed",
      createdBy: "Rajesh Kumar",
      approvedBy: "Ayush Kumar",
      notes: "Monthly electricity bill"
    },
    {
      id: "FIN006",
      transactionId: "FIN006",
      transactionType: "Income",
      category: "Other Income",
      description: "Interest from Bank",
      amount: 2500,
      date: "2024-09-25",
      paymentMethod: "Bank Credit",
      reference: "INT001",
      bankName: "HDFC Bank",
      status: "Completed",
      createdBy: "System",
      approvedBy: "Auto",
      notes: "Monthly interest credit"
    }
  ]);

  const filteredFinance = financeData.filter(finance =>
    finance.transactionId.toLowerCase().includes(search.toLowerCase()) ||
    finance.transactionType.toLowerCase().includes(search.toLowerCase()) ||
    finance.category.toLowerCase().includes(search.toLowerCase()) ||
    finance.status.toLowerCase().includes(search.toLowerCase())
  );

  const getTransactionTypeColor = (type) => {
    switch (type) {
      case "Income":
        return "hrms-badge-success";
      case "Expense":
        return "hrms-badge-error";
      default:
        return "hrms-badge-neutral";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "hrms-badge-success";
      case "Pending":
        return "hrms-badge-warning";
      case "Cancelled":
        return "hrms-badge-error";
      default:
        return "hrms-badge-neutral";
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "Sales Revenue":
        return "hrms-badge-success";
      case "Purchase":
        return "hrms-badge-error";
      case "Operating Expense":
        return "hrms-badge-warning";
      case "Utilities":
        return "hrms-badge-primary";
      case "Other Income":
        return "hrms-badge-success";
      default:
        return "hrms-badge-neutral";
    }
  };

  return (
    <div className="content-area">
      
      {/* Search and Create Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
        <TextField
          placeholder="Search transactions..."
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
        >
          <Add />
          Add Transaction
        </button>
      </Box>

      {/* Finance Table */}
      <Box className="hrms-card">
        <Box className="hrms-card-content" sx={{ padding: 0 }}>
          <Table className="hrms-table">
            <TableHead>
              <TableRow>
                <TableCell>S. No.</TableCell>
                <TableCell>Transaction Id</TableCell>
                <TableCell>Transaction Type</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Payment Method</TableCell>
                <TableCell>Reference</TableCell>
                <TableCell>Customer/Supplier</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Created By</TableCell>
                <TableCell>Approved By</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredFinance
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((finance, index) => (
                  <TableRow key={finance.id}>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {finance.transactionId}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box className={`hrms-badge ${getTransactionTypeColor(finance.transactionType)}`}>
                        {finance.transactionType}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box className={`hrms-badge ${getCategoryColor(finance.category)}`}>
                        {finance.category}
                      </Box>
                    </TableCell>
                    <TableCell>{finance.description}</TableCell>
                    <TableCell>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontWeight: 600,
                          color: finance.transactionType === "Income" ? "#2e7d32" : "#d32f2f"
                        }}
                      >
                        {finance.transactionType === "Income" ? "+" : "-"}₹{finance.amount.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>{finance.date}</TableCell>
                    <TableCell>{finance.paymentMethod}</TableCell>
                    <TableCell>{finance.reference}</TableCell>
                    <TableCell>
                      {finance.customerName || finance.supplierName || finance.vendorName || finance.bankName}
                    </TableCell>
                    <TableCell>
                      <Box className={`hrms-badge ${getStatusColor(finance.status)}`}>
                        {finance.status}
                      </Box>
                    </TableCell>
                    <TableCell>{finance.createdBy}</TableCell>
                    <TableCell>{finance.approvedBy}</TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: "0.25rem" }}>
                        <IconButton 
                          size="small"
                          sx={{ color: "#1976D2", fontSize: "16px" }}
                        >
                          <VisibilityOutlined />
                        </IconButton>
                        <IconButton 
                          size="small"
                          sx={{ color: "#000", fontSize: "16px" }}
                        >
                          <EditOutlined />
                        </IconButton>
                        <IconButton 
                          size="small"
                          sx={{ color: "#d32f2f", fontSize: "16px" }}
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
              Showing {page * rowsPerPage + 1} to {Math.min((page + 1) * rowsPerPage, filteredFinance.length)} of {filteredFinance.length} transactions
            </Typography>
            <Pagination
              count={Math.ceil(filteredFinance.length / rowsPerPage)}
              page={page + 1}
              onChange={(_, newPage) => setPage(newPage - 1)}
              color="primary"
              size="small"
            />
          </Stack>
        </Box>
      </Box>
    </div>
  );
};

export default Finance;
