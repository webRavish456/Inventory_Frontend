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
import CreateBinRack from '../../../components/Warehouse/BinRack/Create';
import EditBinRack from '../../../components/Warehouse/BinRack/Edit';
import ViewBinRack from '../../../components/Warehouse/BinRack/View';
import DeleteBinRack from '../../../components/Warehouse/BinRack/Delete';
import CommonDialog from '../../../components/CommonDialog';

const BinRackManagement = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  
  // CRUD operations state
  const [openData, setOpenData] = useState(false);
  const [viewShow, setViewShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [selectedBinRack, setSelectedBinRack] = useState(null);

  // Bin & Rack Management data
  const [binRackData, setBinRackData] = useState([
    {
      id: "BR001",
      binId: "BIN001",
      rackId: "RACK001",
      warehouseId: "WH001",
      warehouseName: "Mumbai Central Distribution Center",
      zone: "Zone A",
      aisle: "A",
      row: "1",
      level: "1",
      position: "1",
      binType: "Pallet Bin",
      binCapacityWeight: 2000, // max kg
      binCapacityVolume: 2.5, // max m³
      binCapacityUnits: 10, // max SKUs/pallets
      currentOccupancyWeight: 1500, // kg
      currentOccupancyVolume: 1.8, // m³
      skuId: "SKU001",
      emptyFullStatus: "Partially Filled",
      pickPutawayPriority: "FIFO",
      barcodeRfidTag: "RFID-A-1-1",
      specialHandling: "Temperature Controlled",
      status: "Active",
      lastUpdated: "2024-09-20"
    },
    {
      id: "BR002",
      binId: "BIN002",
      rackId: "RACK002",
      warehouseId: "WH002",
      warehouseName: "Delhi Electronics Hub",
      zone: "Zone B",
      aisle: "B",
      row: "2",
      level: "1",
      position: "1",
      binType: "Shelf Bin",
      binCapacityWeight: 500, // max kg
      binCapacityVolume: 0.8, // max m³
      binCapacityUnits: 25, // max SKUs/pallets
      currentOccupancyWeight: 320, // kg
      currentOccupancyVolume: 0.5, // m³
      skuId: "SKU002",
      emptyFullStatus: "Partially Filled",
      pickPutawayPriority: "FEFO",
      barcodeRfidTag: "RFID-B-2-1",
      specialHandling: "Anti-Static",
      status: "Active",
      lastUpdated: "2024-09-18"
    },
    {
      id: "BR003",
      binId: "BIN003",
      rackId: "RACK003",
      warehouseId: "WH003",
      warehouseName: "Bangalore Cold Storage",
      zone: "Zone C",
      aisle: "C",
      row: "3",
      level: "1",
      position: "1",
      binType: "Bulk Bin",
      binCapacityWeight: 3000, // max kg
      binCapacityVolume: 4.0, // max m³
      binCapacityUnits: 5, // max SKUs/pallets
      currentOccupancyWeight: 1800, // kg
      currentOccupancyVolume: 2.4, // m³
      skuId: "SKU003",
      emptyFullStatus: "Partially Filled",
      pickPutawayPriority: "LIFO",
      barcodeRfidTag: "RFID-C-3-1",
      specialHandling: "Cold Storage (-18°C)",
      status: "Active",
      lastUpdated: "2024-09-15"
    }
  ]);

  const filteredBinRacks = binRackData.filter(binRack =>
    binRack.warehouseName.toLowerCase().includes(search.toLowerCase()) ||
    binRack.binType.toLowerCase().includes(search.toLowerCase()) ||
    binRack.zone.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "hrms-badge-success";
      case "Inactive":
        return "hrms-badge-error";
      case "Maintenance":
        return "hrms-badge-warning";
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
  const handleCreateBinRack = () => {
    setSelectedBinRack(null);
    setOpenData(true);
  };

  const handleViewBinRack = (binRack) => {
    setSelectedBinRack(binRack);
    setViewShow(true);
  };

  const handleEditBinRack = (binRack) => {
    setSelectedBinRack(binRack);
    setEditShow(true);
  };

  const handleDeleteBinRack = (binRack) => {
    setSelectedBinRack(binRack);
    setDeleteShow(true);
  };

  const handleSaveBinRack = (binRackData) => {
    if (selectedBinRack) {
      // Edit mode
      setBinRackData(prev => prev.map(binRack => 
        binRack.id === selectedBinRack.id 
          ? { 
              ...binRackData, 
              utilization: Math.round((binRackData.currentStock / binRackData.capacity) * 100)
            }
          : binRack
      ));
      setEditShow(false);
    } else {
      // Create mode
      const newBinRack = {
        ...binRackData,
        id: `BR${String(binRackData.length + 1).padStart(3, '0')}`,
        utilization: Math.round((binRackData.currentStock / binRackData.capacity) * 100)
      };
      setBinRackData(prev => [...prev, newBinRack]);
      setOpenData(false);
    }
    setSelectedBinRack(null);
  };

  const handleDeleteConfirm = (binRackId) => {
    setBinRackData(prev => prev.filter(binRack => binRack.id !== binRackId));
    setDeleteShow(false);
    setSelectedBinRack(null);
  };

  const handleClose = () => {
    setOpenData(false);
    setViewShow(false);
    setEditShow(false);
    setDeleteShow(false);
    setTimeout(() => {
      setSelectedBinRack(null);
    }, 200);
  };

  return (
    <div className="content-area">
      
      {/* Search and Create Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
        <TextField
          placeholder="Search bins/racks..."
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
          onClick={handleCreateBinRack}
        >
          <Add />
          Add Bin/Rack
        </button>
      </Box>

      {/* Bin/Rack Table */}
      <Box className="hrms-card">
        <Box className="hrms-card-content" sx={{ padding: 0 }}>
          <Table className="hrms-table">
            <TableHead>
              <TableRow>
                <TableCell>S. No.</TableCell>
                <TableCell>Warehouse Name</TableCell>
                <TableCell>Bin ID</TableCell>
                <TableCell>Zone</TableCell>
                <TableCell>Bin Type</TableCell>
                <TableCell>Capacity (kg)</TableCell>
                <TableCell>Occupancy (kg)</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBinRacks
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((binRack, index) => (
                  <TableRow key={binRack.id}>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {binRack.warehouseName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#1976D2' }}>
                        {binRack.binId}
                      </Typography>
                    </TableCell>
                    <TableCell>{binRack.zone}</TableCell>
                    <TableCell>
                      <Box className={`hrms-badge ${binRack.binType === 'Pallet Bin' ? 'hrms-badge-primary' : binRack.binType === 'Shelf Bin' ? 'hrms-badge-success' : 'hrms-badge-warning'}`}>
                        {binRack.binType}
                      </Box>
                    </TableCell>
                    <TableCell>{binRack.binCapacityWeight} kg</TableCell>
                    <TableCell>{binRack.currentOccupancyWeight} kg</TableCell>
                    <TableCell>
                      <Box className={`hrms-badge ${getStatusColor(binRack.status)}`}>
                        {binRack.status}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: "0.25rem" }}>
                        <IconButton 
                          size="small"
                          sx={{ color: "#1976D2", fontSize: "16px" }}
                          onClick={() => handleViewBinRack(binRack)}
                          title="View Details"
                        >
                          <VisibilityOutlined />
                        </IconButton>
                        <IconButton 
                          size="small"
                          sx={{ color: "#000", fontSize: "16px" }}
                          onClick={() => handleEditBinRack(binRack)}
                          title="Edit Bin/Rack"
                        >
                          <EditOutlined />
                        </IconButton>
                        <IconButton 
                          size="small"
                          sx={{ color: "#d32f2f", fontSize: "16px" }}
                          onClick={() => handleDeleteBinRack(binRack)}
                          title="Delete Bin/Rack"
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
              Showing {page * rowsPerPage + 1} to {Math.min((page + 1) * rowsPerPage, filteredBinRacks.length)} of {filteredBinRacks.length} bins/racks
            </Typography>
            <Pagination
              count={Math.ceil(filteredBinRacks.length / rowsPerPage)}
              page={page + 1}
              onChange={(_, newPage) => setPage(newPage - 1)}
              color="primary"
              size="small"
            />
          </Stack>
        </Box>
      </Box>

      {/* CommonDialog for all CRUD operations */}
      <CommonDialog
        key={selectedBinRack?.id || 'create'}
        open={openData || viewShow || editShow || deleteShow}
        onClose={handleClose}
        dialogTitle={
          openData ? "Add Bin/Rack" :
          viewShow ? "Bin/Rack Details" :
          editShow ? "Edit Bin/Rack" :
          deleteShow ? "Delete Bin/Rack" : ""
        }
        dialogContent={
          openData ? (
            <CreateBinRack
              onClose={handleClose}
              onSave={handleSaveBinRack}
            />
          ) : viewShow ? (
            <ViewBinRack
              binRackData={selectedBinRack}
              onClose={handleClose}
              onEdit={handleEditBinRack}
              onDelete={handleDeleteBinRack}
            />
          ) : editShow ? (
            <EditBinRack
              binRackData={selectedBinRack}
              onClose={handleClose}
              onSave={handleSaveBinRack}
            />
          ) : deleteShow ? (
            <DeleteBinRack
              binRackData={selectedBinRack}
              onClose={handleClose}
              onConfirm={handleDeleteConfirm}
            />
          ) : null
        }
        maxWidth={deleteShow ? "sm" : "md"}
        fullWidth={!deleteShow}
      />
    </div>
  );
};

export default BinRackManagement;