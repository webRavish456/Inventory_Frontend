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
  Button,
  Grid,
} from "@mui/material";
import { Search, Add, VisibilityOutlined, EditOutlined, DeleteOutlined } from "@mui/icons-material";
import CommonDialog from '../../../components/CommonDialog';
import CreateHSN from '../../../components/hsn-code/create';
import EditHSN from '../../../components/hsn-code/edit';
import ViewHSN from '../../../components/hsn-code/view';
import DeleteHSN from '../../../components/hsn-code/delete';

const HSNCodeManagement = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  const [openData, setOpenData] = useState(false);
  const [viewShow, setViewShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [selectedHSN, setSelectedHSN] = useState(null);

  // Sample HSN/SAC codes data - Subcategory specific
  const [hsnData, setHsnData] = useState([
    // Electronics Subcategories
    {
      id: 'HSN001',
      hsnCode: '8517',
      description: 'Telephone sets, including telephones for cellular networks or for other wireless networks',
      taxRate: 18,
      category: 'Electronics',
      subCategory: 'Smartphones',
      status: 'Active'
    },
    {
      id: 'HSN002',
      hsnCode: '8471',
      description: 'Automatic data processing machines and units thereof; magnetic or optical readers',
      taxRate: 18,
      category: 'Electronics',
      subCategory: 'Laptops',
      status: 'Active'
    },
    {
      id: 'HSN003',
      hsnCode: '8471',
      description: 'Automatic data processing machines and units thereof; magnetic or optical readers',
      taxRate: 18,
      category: 'Electronics',
      subCategory: 'Tablets',
      status: 'Active'
    },
    {
      id: 'HSN004',
      hsnCode: '8518',
      description: 'Microphones and stands therefor; loudspeakers, whether or not mounted in their enclosures',
      taxRate: 18,
      category: 'Electronics',
      subCategory: 'Accessories',
      status: 'Active'
    },
    
    // Furniture Subcategories
    {
      id: 'HSN005',
      hsnCode: '9401',
      description: 'Seats (other than those of heading 9402), whether or not convertible into beds',
      taxRate: 12,
      category: 'Furniture',
      subCategory: 'Office Chairs',
      status: 'Active'
    },
    {
      id: 'HSN006',
      hsnCode: '9403',
      description: 'Other furniture and parts thereof',
      taxRate: 12,
      category: 'Furniture',
      subCategory: 'Desks',
      status: 'Active'
    },
    {
      id: 'HSN007',
      hsnCode: '9403',
      description: 'Other furniture and parts thereof',
      taxRate: 12,
      category: 'Furniture',
      subCategory: 'Storage',
      status: 'Active'
    },
    
    // Kitchenware Subcategories
    {
      id: 'HSN008',
      hsnCode: '6911',
      description: 'Tableware, kitchenware, other household articles and toilet articles, of porcelain or china',
      taxRate: 12,
      category: 'Kitchenware',
      subCategory: 'Ceramic Items',
      status: 'Active'
    },
    {
      id: 'HSN009',
      hsnCode: '7323',
      description: 'Table, kitchen or other household articles and parts thereof, of iron or steel',
      taxRate: 18,
      category: 'Kitchenware',
      subCategory: 'Cookware',
      status: 'Active'
    },
    {
      id: 'HSN010',
      hsnCode: '8516',
      description: 'Electric instantaneous or storage water heaters and immersion heaters',
      taxRate: 18,
      category: 'Kitchenware',
      subCategory: 'Appliances',
      status: 'Active'
    },
    
    // Clothing Subcategories
    {
      id: 'HSN011',
      hsnCode: '6203',
      description: 'Men\'s or boys\' suits, ensembles, jackets, blazers, trousers, bib and brace overalls',
      taxRate: 12,
      category: 'Clothing',
      subCategory: 'Men\'s Wear',
      status: 'Active'
    },
    {
      id: 'HSN012',
      hsnCode: '6204',
      description: 'Women\'s or girls\' suits, ensembles, jackets, blazers, dresses, skirts, divided skirts',
      taxRate: 12,
      category: 'Clothing',
      subCategory: 'Women\'s Wear',
      status: 'Active'
    },
    
    // Books Subcategories
    {
      id: 'HSN013',
      hsnCode: '4901',
      description: 'Printed books, brochures, leaflets and similar printed matter',
      taxRate: 0,
      category: 'Books',
      subCategory: 'Fiction',
      status: 'Active'
    },
    {
      id: 'HSN014',
      hsnCode: '4901',
      description: 'Printed books, brochures, leaflets and similar printed matter',
      taxRate: 0,
      category: 'Books',
      subCategory: 'Non-Fiction',
      status: 'Active'
    }
  ]);

  const filteredHSN = hsnData.filter(hsn =>
    hsn.hsnCode.toLowerCase().includes(search.toLowerCase()) ||
    hsn.description.toLowerCase().includes(search.toLowerCase()) ||
    hsn.category.toLowerCase().includes(search.toLowerCase())
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

  const handleCreateHSN = () => {
    setSelectedHSN(null);
    setOpenData(true);
  };

  const handleViewHSN = (hsn) => {
    setSelectedHSN(hsn);
    setViewShow(true);
  };

  const handleEditHSN = (hsn) => {
    setSelectedHSN(hsn);
    setEditShow(true);
  };

  const handleDeleteHSN = (hsn) => {
    setSelectedHSN(hsn);
    setDeleteShow(true);
  };

  const handleSaveHSN = (formData) => {
    if (editShow) {
      setHsnData(hsnData.map(hsn => 
        hsn.id === selectedHSN.id 
          ? { ...hsn, ...formData, updatedDate: new Date().toLocaleDateString() }
          : hsn
      ));
    } else {
      const newHSN = {
        id: Date.now(),
        ...formData,
        createdDate: new Date().toLocaleDateString(),
        updatedDate: new Date().toLocaleDateString()
      };
      setHsnData([...hsnData, newHSN]);
    }
    handleClose();
  };

  const handleDeleteConfirm = () => {
    setHsnData(hsnData.filter(h => h.id !== selectedHSN.id));
    handleClose();
  };

  const handleClose = () => {
    setOpenData(false);
    setViewShow(false);
    setEditShow(false);
    setDeleteShow(false);
    setTimeout(() => {
      setSelectedHSN(null);
    }, 100);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage - 1);
  };

  return (
    <div className="content-area">
      {/* Search and Add Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '10px', mb: 3 }}>
        <TextField
          placeholder="Search HSN codes..."
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
          onClick={handleCreateHSN}
        >
          <Add />
          Add HSN Code
        </button>
      </Box>

      {/* HSN Codes Table */}
      <Box className="hrms-card">
        <Box className="hrms-card-content" sx={{ padding: 0 }}>
          <Table className="hrms-table">
            <TableHead>
              <TableRow>
                <TableCell>S. No.</TableCell>
                <TableCell>HSN/SAC Code</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Tax Rate (%)</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Subcategory</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredHSN
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((hsn, index) => (
                  <TableRow key={hsn.id}>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1976d2' }}>
                        {hsn.hsnCode}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ maxWidth: '300px' }}>
                        {hsn.description}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {hsn.taxRate}%
                      </Typography>
                    </TableCell>
                    <TableCell>{hsn.category}</TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ color: '#000', fontWeight: 500 }}>
                        {hsn.subCategory}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box className={`hrms-badge ${getStatusColor(hsn.status)}`}>
                        {hsn.status}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                          size="small"
                          onClick={() => handleViewHSN(hsn)}
                          sx={{ color: '#1976d2' }}
                        >
                          <VisibilityOutlined />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleEditHSN(hsn)}
                          sx={{ color: '#000' }}
                        >
                          <EditOutlined />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteHSN(hsn)}
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
              Showing {page * rowsPerPage + 1} to {Math.min((page + 1) * rowsPerPage, filteredHSN.length)} of {filteredHSN.length} HSN codes
            </Typography>
            <Pagination
              count={Math.ceil(filteredHSN.length / rowsPerPage)}
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
        key={selectedHSN?.id || 'create'}
        open={openData || viewShow || editShow || deleteShow}
        onClose={handleClose}
        dialogTitle={
          openData ? "Add HSN/SAC Code" :
          viewShow ? "HSN/SAC Code Details" :
          editShow ? "Edit HSN/SAC Code" :
          deleteShow ? "Delete HSN/SAC Code" : ""
        }
        dialogContent={
          openData ? (
            <CreateHSN
              onClose={handleClose}
              onSave={handleSaveHSN}
            />
          ) : viewShow ? (
            <ViewHSN
              hsnData={selectedHSN}
            />
          ) : editShow ? (
            <EditHSN
              hsnData={selectedHSN}
              onClose={handleClose}
              onSave={handleSaveHSN}
            />
          ) : deleteShow ? (
            <DeleteHSN
              hsnData={selectedHSN}
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

export default HSNCodeManagement;