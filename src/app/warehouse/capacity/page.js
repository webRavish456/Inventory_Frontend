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
import CommonDialog from '../../../components/CommonDialog';
import CreateCapacity from '../../../components/Warehouse/Capacity/Create';
import EditCapacity from '../../../components/Warehouse/Capacity/Edit';
import ViewCapacity from '../../../components/Warehouse/Capacity/View';
import DeleteCapacity from '../../../components/Warehouse/Capacity/Delete';

const CapacityPlanning = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  
  // CRUD operations state
  const [openData, setOpenData] = useState(false);
  const [viewShow, setViewShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [selectedCapacity, setSelectedCapacity] = useState(null);

  // Capacity Planning data with professional fields
  const [capacityData, setCapacityData] = useState([
    {
      id: "CAP001",
      capacityId: "CAP001",
      warehouseId: "WH001",
      warehouseName: "Mumbai Central Distribution Center",
      totalCapacityVolume: 50000, // m³ or cubic ft
      totalCapacityWeight: 1000, // kg / tons
      totalCapacityUnits: 10000, // pallets / bins
      availableCapacityVolume: 12500, // m³
      availableCapacityWeight: 250, // kg / tons
      reservedCapacity: 5000, // incoming stock reserved space
      utilizationPercent: 75, // auto-calculated
      throughputCapacity: 1500, // orders handled per day/hour
      forecastedDemand: 30, // next X days
      capacityAlertThreshold: 90, // alert at 90% full
      storageTypeBreakdown: "Dry: 70%, Cold: 20%, Hazardous: 10%",
      status: "Optimal",
      lastUpdated: "2024-09-20"
    },
    {
      id: "CAP002",
      capacityId: "CAP002",
      warehouseId: "WH002",
      warehouseName: "Delhi Electronics Hub",
      totalCapacityVolume: 25000, // m³ or cubic ft
      totalCapacityWeight: 500, // kg / tons
      totalCapacityUnits: 5000, // pallets / bins
      availableCapacityVolume: 9000, // m³
      availableCapacityWeight: 180, // kg / tons
      reservedCapacity: 2000, // incoming stock reserved space
      utilizationPercent: 64, // auto-calculated
      throughputCapacity: 800, // orders handled per day/hour
      forecastedDemand: 25, // next X days
      capacityAlertThreshold: 85, // alert at 90% full
      storageTypeBreakdown: "Electronics: 100%",
      status: "Good",
      lastUpdated: "2024-09-18"
    },
    {
      id: "CAP003",
      capacityId: "CAP003",
      warehouseId: "WH003",
      warehouseName: "Bangalore Cold Storage",
      totalCapacityVolume: 40000, // m³ or cubic ft
      totalCapacityWeight: 800, // kg / tons
      totalCapacityUnits: 8000, // pallets / bins
      availableCapacityVolume: 16000, // m³
      availableCapacityWeight: 320, // kg / tons
      reservedCapacity: 3000, // incoming stock reserved space
      utilizationPercent: 60, // auto-calculated
      throughputCapacity: 1200, // orders handled per day/hour
      forecastedDemand: 20, // next X days
      capacityAlertThreshold: 80, // alert at 90% full
      storageTypeBreakdown: "Cold Storage: 100%",
      status: "Good",
      lastUpdated: "2024-09-15"
    }
  ]);

  const filteredCapacity = capacityData.filter(capacity =>
    capacity.warehouseName.toLowerCase().includes(search.toLowerCase()) ||
    capacity.storageTypeBreakdown.toLowerCase().includes(search.toLowerCase()) ||
    capacity.status.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Optimal":
        return "hrms-badge-success";
      case "Good":
        return "hrms-badge-primary";
      case "Warning":
        return "hrms-badge-warning";
      case "Critical":
        return "hrms-badge-error";
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
  const handleCreateCapacity = () => {
    setOpenData(true);
  };

  const handleViewCapacity = (capacity) => {
    setSelectedCapacity(capacity);
    setViewShow(true);
  };

  const handleEditCapacity = (capacity) => {
    setSelectedCapacity(capacity);
    setEditShow(true);
  };

  const handleDeleteCapacity = (capacity) => {
    setSelectedCapacity(capacity);
    setDeleteShow(true);
  };

  const handleClose = () => {
    setOpenData(false);
    setViewShow(false);
    setEditShow(false);
    setDeleteShow(false);
    setSelectedCapacity(null);
  };

  const handleCreate = (newCapacity) => {
    const capacity = {
      ...newCapacity,
      id: `CAP${String(capacityData.length + 1).padStart(3, '0')}`,
      capacityId: `CAP${String(capacityData.length + 1).padStart(3, '0')}`,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    setCapacityData(prev => [...prev, capacity]);
    handleClose();
  };

  const handleUpdate = (updatedCapacity) => {
    setCapacityData(prev => prev.map(capacity => 
      capacity.id === selectedCapacity.id 
        ? { ...updatedCapacity, lastUpdated: new Date().toISOString().split('T')[0] }
        : capacity
    ));
    handleClose();
  };

  const handleDelete = () => {
    setCapacityData(prev => prev.filter(capacity => capacity.id !== selectedCapacity.id));
    handleClose();
  };

  return (
    <div className="content-area">
      
      {/* Search and Create Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
        <TextField
          placeholder="Search capacity plans..."
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
          onClick={handleCreateCapacity}
        >
          <Add />
          Add Capacity Plan
        </button>
      </Box>

      {/* Capacity Table */}
      <Box className="hrms-card">
        <Box className="hrms-card-content" sx={{ padding: 0 }}>
          <Table className="hrms-table">
            <TableHead>
              <TableRow>
                <TableCell>S. No.</TableCell>
                <TableCell>Warehouse Name</TableCell>
                <TableCell>Total Capacity (Units)</TableCell>
                <TableCell>Available Volume (m³)</TableCell>
                <TableCell>Utilization %</TableCell>
                <TableCell>Throughput/Day</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCapacity
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((capacity, index) => (
                  <TableRow key={capacity.id}>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {capacity.warehouseName}
                      </Typography>
                    </TableCell>
                    <TableCell>{capacity.totalCapacityUnits.toLocaleString()}</TableCell>
                    <TableCell>{capacity.availableCapacityVolume.toLocaleString()}</TableCell>
                    <TableCell>
                      <Box className={`hrms-badge ${getUtilizationColor(capacity.utilizationPercent)}`}>
                        {capacity.utilizationPercent}%
                      </Box>
                    </TableCell>
                    <TableCell>{capacity.throughputCapacity}</TableCell>
                    <TableCell>
                      <Box className={`hrms-badge ${getStatusColor(capacity.status)}`}>
                        {capacity.status}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: "0.25rem" }}>
                        <IconButton 
                          size="small"
                          sx={{ color: "#1976D2", fontSize: "16px" }}
                          onClick={() => handleViewCapacity(capacity)}
                          title="View Details"
                        >
                          <VisibilityOutlined />
                        </IconButton>
                        <IconButton 
                          size="small"
                          sx={{ color: "#000", fontSize: "16px" }}
                          onClick={() => handleEditCapacity(capacity)}
                          title="Edit Capacity Plan"
                        >
                          <EditOutlined />
                        </IconButton>
                        <IconButton 
                          size="small"
                          sx={{ color: "#d32f2f", fontSize: "16px" }}
                          onClick={() => handleDeleteCapacity(capacity)}
                          title="Delete Capacity Plan"
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
              Showing {page * rowsPerPage + 1} to {Math.min((page + 1) * rowsPerPage, filteredCapacity.length)} of {filteredCapacity.length} capacity plans
            </Typography>
            <Pagination
              count={Math.ceil(filteredCapacity.length / rowsPerPage)}
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
            ? "Add Capacity Plan"
            : viewShow
            ? "Capacity Details"
            : editShow
            ? "Edit Capacity Plan"
            : deleteShow
            ? "Delete Capacity Plan"
            : ""
        }
        maxWidth={deleteShow ? "sm" : "md"}
        fullWidth={!deleteShow}
        dialogContent={
          openData ? (
            <CreateCapacity 
              handleCreate={handleCreate} 
              handleClose={handleClose} 
            />
          ) : viewShow ? (
            <ViewCapacity 
              capacity={selectedCapacity} 
              handleClose={handleClose} 
            />
          ) : editShow ? (
            <EditCapacity 
              handleUpdate={handleUpdate} 
              handleClose={handleClose} 
              capacity={selectedCapacity}
            />
          ) : deleteShow ? (
            <DeleteCapacity 
              capacity={selectedCapacity} 
              handleDelete={handleDelete} 
              handleClose={handleClose} 
            />
          ) : null
        }
      />
    </div>
  );
};

export default CapacityPlanning;