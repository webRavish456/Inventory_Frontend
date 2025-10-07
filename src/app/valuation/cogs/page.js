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
import CreateCOGS from "@/components/valuation/cogs/Create";
import ViewCOGS from "@/components/valuation/cogs/View";
import EditCOGS from "@/components/valuation/cogs/Edit";
import DeleteCOGS from "@/components/valuation/cogs/Delete";

const COGS = () => {
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

  // COGS data - real market fields
  const [cogsData, setCogsData] = useState([
    {
      id: "COGS001",
      cogsId: "COGS001",
      productName: "Samsung Galaxy S24",
      sku: "SAM-S24-128GB",
      costPrice: 45000,
      sellingPrice: 55000,
      quantitySold: 25,
      totalCost: 1125000,
      totalRevenue: 1375000,
      grossProfit: 250000,
      grossMargin: 18.18,
      period: "2024-Q3",
      category: "Electronics"
    },
    {
      id: "COGS002",
      cogsId: "COGS002",
      productName: "Office Chair",
      sku: "CHAIR-001",
      costPrice: 8000,
      sellingPrice: 12000,
      quantitySold: 15,
      totalCost: 120000,
      totalRevenue: 180000,
      grossProfit: 60000,
      grossMargin: 33.33,
      period: "2024-Q3",
      category: "Furniture"
    },
    {
      id: "COGS003",
      cogsId: "COGS003",
      productName: "LED TV 43",
      sku: "TV-LED-43",
      costPrice: 25000,
      sellingPrice: 35000,
      quantitySold: 8,
      totalCost: 200000,
      totalRevenue: 280000,
      grossProfit: 80000,
      grossMargin: 28.57,
      period: "2024-Q3",
      category: "Electronics"
    }
  ]);

  // Handlers
  const handleView = (row) => { setViewData(row); setViewShow(true); };
  const handleEdit = (row) => { setEditData(row); setEditShow(true); };
  const handleShowDelete = (id) => { 
    const rowData = cogsData.find(row => row.cogsId === id);
    setDeleteId(id); 
    setDeleteData(rowData);
    setDeleteShow(true); 
  };
  const handleCreateOpen = () => setCreateShow(true);
  const handleClose = () => { setViewShow(false); setEditShow(false); setDeleteShow(false); setCreateShow(false); };

  const handleCreate = (newCogs) => {
    const nextId = cogsData.length + 1;
    const newCogsData = {
      ...newCogs,
      id: `COGS${String(nextId).padStart(3, '0')}`,
      cogsId: `COGS${String(nextId).padStart(3, '0')}`
    };
    setCogsData([...cogsData, newCogsData]);
    setCreateShow(false);
  };

  const handleUpdate = (updatedCogs) => {
    setCogsData(cogsData.map(row => 
      row.cogsId === updatedCogs.cogsId 
        ? { ...updatedCogs }
        : row
    ));
  };

  const handleDelete = () => {
    setCogsData(cogsData.filter(row => row.cogsId !== deleteId));
    setDeleteShow(false);
    setDeleteData(null);
    setDeleteId(null);
  };

  // Filter data
  const filteredData = cogsData.filter(row =>
    row.cogsId.toLowerCase().includes(search.toLowerCase()) ||
    row.productName.toLowerCase().includes(search.toLowerCase()) ||
    row.category.toLowerCase().includes(search.toLowerCase())
  );

  const currentPageData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handlePageChange = (event, newPage) => {
    setPage(newPage - 1);
  };

  const getMarginColor = (margin) => {
    if (margin >= 30) return { backgroundColor: "#e8f5e8", color: "#2e7d32" };
    if (margin >= 20) return { backgroundColor: "#e3f2fd", color: "#1976d2" };
    if (margin >= 10) return { backgroundColor: "#fff3e0", color: "#f57c00" };
    return { backgroundColor: "#ffebee", color: "#d32f2f" };
  };

  return (
    <div className="content-area">
      {/* Header with Search and Create Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 2, mb: 3 }}>
        <TextField
          placeholder="Search COGS..."
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
          Add COGS Entry
        </Button>
      </Box>

      {/* Table */}
      <Box sx={{ backgroundColor: 'white', borderRadius: '0.75rem', boxShadow: 1 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>SI</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>COGS ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Product Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Cost Price</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Selling Price</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Quantity Sold</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Gross Margin %</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Period</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPageData.map((row, index) => (
              <TableRow key={row.id} sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
                <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                <TableCell align="left">
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1976d2' }}>
                    {row.cogsId}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {row.productName}
                  </Typography>
                </TableCell>
                <TableCell align="left">₹{row.costPrice.toLocaleString()}</TableCell>
                <TableCell align="left">₹{row.sellingPrice.toLocaleString()}</TableCell>
                <TableCell align="left">{row.quantitySold}</TableCell>
                <TableCell align="left">
                  <Chip
                    label={`${row.grossMargin}%`}
                    size="small"
                    sx={{
                      ...getMarginColor(row.grossMargin),
                      fontWeight: 500
                    }}
                  />
                </TableCell>
                <TableCell align="left">{row.period}</TableCell>
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
                      onClick={() => handleShowDelete(row.cogsId)}
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
            Showing {page * rowsPerPage + 1} to {Math.min((page + 1) * rowsPerPage, filteredData.length)} of {filteredData.length} COGS records
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
          createShow ? "Create New COGS Entry" :
          viewShow ? "View COGS Entry" :
          editShow ? "Edit COGS Entry" :
          deleteShow ? "Delete COGS Entry" : ""
        }
        dialogContent={
          createShow ? <CreateCOGS handleClose={handleClose} handleCreate={handleCreate} /> :
          viewShow ? <ViewCOGS viewData={viewData} handleClose={handleClose} /> :
          editShow ? <EditCOGS editData={editData} handleUpdate={handleUpdate} handleClose={handleClose} /> :
          deleteShow ? <DeleteCOGS cogsData={deleteData} onClose={handleClose} onDelete={handleDelete} /> : null
        }
      />
    </div>
  );
};

export default COGS;
