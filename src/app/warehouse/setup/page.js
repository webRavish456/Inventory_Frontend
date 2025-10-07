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
  Button,
} from "@mui/material";
import { Search, Add, VisibilityOutlined, EditOutlined, DeleteOutlined, ArrowBack } from "@mui/icons-material";
import CreateSetup from '../../../components/Warehouse/Setup/Create';
import EditSetup from '../../../components/Warehouse/Setup/Edit';
import ViewSetup from '../../../components/Warehouse/Setup/View';
import DeleteSetup from '../../../components/Warehouse/Setup/Delete';
import CommonDialog from '../../../components/CommonDialog';

const WarehouseSetup = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  
  // CRUD operations state
  const [openData, setOpenData] = useState(false);
  const [viewShow, setViewShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);

  // Multi-Warehouse Setup data
  const [warehouseData, setWarehouseData] = useState([
    {
      id: "WH001",
      warehouseId: "WH001",
      warehouseName: "Mumbai Central Distribution Center",
      shortCode: "MUM01",
      addressLine1: "123 Industrial Zone",
      addressLine2: "Near Mumbai Port",
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      pincode: "400001",
      geoLat: "19.0760",
      geoLong: "72.8777",
      contactPerson: "Rajesh Kumar",
      contactPhone: "9876543210",
      contactEmail: "rajesh@warehouse.com",
      warehouseType: "Primary",
      operatingHours: "24/7",
      linkedTransportHub: "Mumbai Port (5km)",
      specialConditions: "Temperature Controlled, Security Level High",
      status: "Active",
      establishedDate: "2024-01-15",
      lastUpdated: "2024-09-20"
    },
    {
      id: "WH002",
      warehouseId: "WH002",
      warehouseName: "Delhi Electronics Hub",
      shortCode: "DEL01",
      addressLine1: "456 Technology Hub",
      addressLine2: "Delhi Industrial Area",
      city: "Delhi",
      state: "Delhi",
      country: "India",
      pincode: "110001",
      geoLat: "28.6139",
      geoLong: "77.2090",
      contactPerson: "Priya Sharma",
      contactPhone: "8765432109",
      contactEmail: "priya@electronics.com",
      warehouseType: "Secondary",
      operatingHours: "16/7",
      linkedTransportHub: "Delhi Airport (8km)",
      specialConditions: "Electronics Storage, Anti-Static",
      status: "Active",
      establishedDate: "2024-02-10",
      lastUpdated: "2024-09-18"
    },
    {
      id: "WH003",
      warehouseId: "WH003",
      warehouseName: "Bangalore Cold Storage",
      shortCode: "BLR01",
      addressLine1: "789 Cold Storage Complex",
      addressLine2: "Bangalore Industrial Zone",
      city: "Bangalore",
      state: "Karnataka",
      country: "India",
      pincode: "560001",
      geoLat: "12.9716",
      geoLong: "77.5946",
      contactPerson: "Amit Patel",
      contactPhone: "7654321098",
      contactEmail: "amit@coldstorage.com",
      warehouseType: "Cold Storage",
      operatingHours: "12/7",
      linkedTransportHub: "Bangalore Airport (12km)",
      specialConditions: "Temperature Controlled (-18°C), Humidity Controlled",
      status: "Active",
      establishedDate: "2024-03-05",
      lastUpdated: "2024-09-15"
    }
  ]);

  const filteredWarehouses = warehouseData.filter(warehouse =>
    warehouse.warehouseName.toLowerCase().includes(search.toLowerCase()) ||
    warehouse.city.toLowerCase().includes(search.toLowerCase()) ||
    warehouse.warehouseType.toLowerCase().includes(search.toLowerCase())
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

  const getWarehouseTypeColor = (type) => {
    switch (type) {
      case "Main":
        return "hrms-badge-primary";
      case "Specialized":
        return "hrms-badge-success";
      default:
        return "hrms-badge-neutral";
    }
  };

  const getUtilizationColor = (utilization) => {
    if (utilization >= 90) return "hrms-badge-error";
    if (utilization >= 75) return "hrms-badge-warning";
    return "hrms-badge-success";
  };

  const handleBack = () => {
    window.location.href = '/warehouse';
  };

  // CRUD operation functions
  const handleCreateWarehouse = () => {
    setOpenData(true);
  };

  const handleViewWarehouse = (warehouse) => {
    setSelectedWarehouse(warehouse);
    setViewShow(true);
  };

  const handleEditWarehouse = (warehouse) => {
    setSelectedWarehouse(warehouse);
    setEditShow(true);
  };

  const handleDeleteWarehouse = (warehouse) => {
    setSelectedWarehouse(warehouse);
    setDeleteShow(true);
  };

  const handleCreate = (warehouseData) => {
    const newWarehouse = {
      ...warehouseData,
      id: `WH${String(warehouseData.length + 1).padStart(3, '0')}`,
      utilization: Math.round((warehouseData.currentStock / warehouseData.capacity) * 100),
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    setWarehouseData(prev => [...prev, newWarehouse]);
    handleClose();
  };

  const handleUpdate = (warehouseData) => {
    setWarehouseData(prev => prev.map(warehouse => 
      warehouse.id === selectedWarehouse.id 
        ? { 
            ...warehouseData, 
            utilization: Math.round((warehouseData.currentStock / warehouseData.capacity) * 100),
            lastUpdated: new Date().toISOString().split('T')[0]
          }
        : warehouse
    ));
    handleClose();
  };

  const handleDelete = () => {
    setWarehouseData(prev => prev.filter(warehouse => warehouse.id !== selectedWarehouse.id));
    handleClose();
  };

  const handleClose = () => {
    setOpenData(false);
    setViewShow(false);
    setEditShow(false);
    setDeleteShow(false);
    setSelectedWarehouse(null);
  };

  return (
    <div className="content-area">
      
      {/* Search and Create Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
        <TextField
          placeholder="Search warehouses..."
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
          onClick={handleCreateWarehouse}
        >
          <Add />
          Add Warehouse
        </button>
      </Box>

      {/* Warehouse Table */}
      <Box className="hrms-card">
        <Box className="hrms-card-content" sx={{ padding: 0 }}>
          <Table className="hrms-table">
            <TableHead>
              <TableRow>
                <TableCell>S. No.</TableCell>
                <TableCell>Warehouse Name</TableCell>
                <TableCell>Warehouse Type</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Contact Person</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Operating Hours</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredWarehouses
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((warehouse, index) => (
                  <TableRow key={warehouse.id}>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {warehouse.warehouseName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box className={`hrms-badge ${getWarehouseTypeColor(warehouse.warehouseType)}`}>
                        {warehouse.warehouseType}
                      </Box>
                    </TableCell>
                    <TableCell>{warehouse.city}</TableCell>
                    <TableCell>{warehouse.contactPerson}</TableCell>
                    <TableCell>{warehouse.contactPhone}</TableCell>
                    <TableCell>{warehouse.operatingHours}</TableCell>
                    <TableCell>
                      <Box className={`hrms-badge ${getStatusColor(warehouse.status)}`}>
                        {warehouse.status}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: "0.25rem" }}>
                        <IconButton 
                          size="small"
                          sx={{ color: "#1976D2", fontSize: "16px" }}
                          onClick={() => handleViewWarehouse(warehouse)}
                          title="View Details"
                        >
                          <VisibilityOutlined />
                        </IconButton>
                        <IconButton 
                          size="small"
                          sx={{ color: "#000", fontSize: "16px" }}
                          onClick={() => handleEditWarehouse(warehouse)}
                          title="Edit Warehouse"
                        >
                          <EditOutlined />
                        </IconButton>
                        <IconButton 
                          size="small"
                          sx={{ color: "#d32f2f", fontSize: "16px" }}
                          onClick={() => handleDeleteWarehouse(warehouse)}
                          title="Delete Warehouse"
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
              Showing {page * rowsPerPage + 1} to {Math.min((page + 1) * rowsPerPage, filteredWarehouses.length)} of {filteredWarehouses.length} warehouses
            </Typography>
            <Pagination
              count={Math.ceil(filteredWarehouses.length / rowsPerPage)}
              page={page + 1}
              onChange={(_, newPage) => setPage(newPage - 1)}
              color="primary"
              size="small"
            />
          </Stack>
        </Box>
      </Box>

      {/* CommonDialog for all operations */}
      <CommonDialog
        open={openData || viewShow || editShow || deleteShow}
        onClose={handleClose}
        dialogTitle={
          openData
            ? "Add Warehouse"
            : viewShow
            ? "Warehouse Details"
            : editShow
            ? "Edit Warehouse"
            : deleteShow
            ? "Delete Warehouse"
            : ""
        }
        dialogTitleStyle={{ fontWeight: 'bold' }}
        maxWidth={deleteShow ? "sm" : "md"}
        fullWidth={!deleteShow}
        dialogContent={
          openData ? (
            <CreateSetup 
              handleCreate={handleCreate} 
              handleClose={handleClose} 
            />
          ) : viewShow ? (
            <ViewSetup 
              warehouse={selectedWarehouse} 
              handleClose={handleClose} 
            />
          ) : editShow ? (
            <EditSetup 
              handleUpdate={handleUpdate} 
              handleClose={handleClose} 
              warehouse={selectedWarehouse}
            />
          ) : deleteShow ? (
            <DeleteSetup 
              warehouse={selectedWarehouse} 
              handleDelete={handleDelete}
              handleClose={handleClose}
            />
          ) : null
        }
      
      />

    </div>
  );
};

export default WarehouseSetup;