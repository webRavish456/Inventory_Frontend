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
import CommonDialog from "@/components/CommonDialog";
import DeleteStaff from "@/components/staff/Delete";
import { useRouter } from "next/navigation";

const Staff = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  const [deleteShow, setDeleteShow] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  // Staff data
  const [staffData, setStaffData] = useState([
    {
      id: "STAFF001",
      staffId: "STAFF001",
      staffName: "Priya Singh",
      mobileNo: "9876543210",
      emailId: "priya.singh@company.com",
      joiningDate: "2020-01-15",
      availabilityStatus: "Available",
      gender: "Female",
      department: "Administration",
      dob: "1990-05-15",
      qualification: "MBA",
      experience: "5 years",
      branchName: "Head Office",
      resume: "resume_priya.pdf",
      qualificationCert: "mba_cert.pdf",
      panCard: "ABCDE1234F",
      aadharCard: "123456789012",
      accountHolderName: "Priya Singh",
      accountNumber: "1234567890",
      bankName: "HDFC Bank",
      ifscCode: "HDFC0001234",
      bankBranch: "Mumbai Branch",
      branchLocation: "Mumbai",
      salary: 55000
    },
    {
      id: "STAFF002",
      staffId: "STAFF002",
      staffName: "Rajesh Kumar",
      mobileNo: "9123456780",
      emailId: "rajesh.kumar@company.com",
      joiningDate: "2021-03-20",
      availabilityStatus: "Available",
      gender: "Male",
      department: "Support",
      dob: "1988-08-22",
      qualification: "B.Tech",
      experience: "4 years",
      branchName: "Delhi Branch",
      resume: "resume_rajesh.pdf",
      qualificationCert: "btech_cert.pdf",
      panCard: "FGHIJ5678K",
      aadharCard: "234567890123",
      accountHolderName: "Rajesh Kumar",
      accountNumber: "2345678901",
      bankName: "ICICI Bank",
      ifscCode: "ICIC0002345",
      bankBranch: "Delhi Branch",
      branchLocation: "Delhi",
      salary: 48000
    },
    {
      id: "STAFF003",
      staffId: "STAFF003",
      staffName: "Sunita Patel",
      mobileNo: "9988776655",
      emailId: "sunita.patel@company.com",
      joiningDate: "2019-08-10",
      availabilityStatus: "OnLeave",
      gender: "Female",
      department: "Maintenance",
      dob: "1992-12-03",
      qualification: "Diploma",
      experience: "6 years",
      branchName: "Bangalore Branch",
      resume: "resume_sunita.pdf",
      qualificationCert: "diploma_cert.pdf",
      panCard: "KLMNO9012P",
      aadharCard: "345678901234",
      accountHolderName: "Sunita Patel",
      accountNumber: "3456789012",
      bankName: "SBI Bank",
      ifscCode: "SBIN0003456",
      bankBranch: "Bangalore Branch",
      branchLocation: "Bangalore",
      salary: 42000
    },
    {
      id: "STAFF004",
      staffId: "STAFF004",
      staffName: "Amit Verma",
      mobileNo: "9876543212",
      emailId: "amit.verma@company.com",
      joiningDate: "2022-02-15",
      availabilityStatus: "Available",
      gender: "Male",
      department: "Security",
      dob: "1985-07-18",
      qualification: "12th Pass",
      experience: "3 years",
      branchName: "Chennai Branch",
      resume: "resume_amit.pdf",
      qualificationCert: "12th_cert.pdf",
      panCard: "PQRST3456U",
      aadharCard: "456789012345",
      accountHolderName: "Amit Verma",
      accountNumber: "4567890123",
      bankName: "Axis Bank",
      ifscCode: "AXIS0004567",
      bankBranch: "Chennai Branch",
      branchLocation: "Chennai",
      salary: 38000
    },
    {
      id: "STAFF005",
      staffId: "STAFF005",
      staffName: "Meera Joshi",
      mobileNo: "9876543214",
      emailId: "meera.joshi@company.com",
      joiningDate: "2021-11-08",
      availabilityStatus: "Available",
      gender: "Female",
      department: "Housekeeping",
      dob: "1991-04-25",
      qualification: "10th Pass",
      experience: "4 years",
      branchName: "Kolkata Branch",
      resume: "resume_meera.pdf",
      qualificationCert: "10th_cert.pdf",
      panCard: "UVWXY7890Z",
      aadharCard: "567890123456",
      accountHolderName: "Meera Joshi",
      accountNumber: "5678901234",
      bankName: "PNB Bank",
      ifscCode: "PUNB0005678",
      bankBranch: "Kolkata Branch",
      branchLocation: "Kolkata",
      salary: 35000
    }
  ]);

  const filteredStaff = staffData.filter(staff =>
    staff.staffName.toLowerCase().includes(search.toLowerCase()) ||
    staff.emailId.toLowerCase().includes(search.toLowerCase()) ||
    staff.department.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Available":
        return "hrms-badge-success";
      case "OnLeave":
        return "hrms-badge-warning";
      case "Unavailable":
        return "hrms-badge-error";
      default:
        return "hrms-badge-neutral";
    }
  };

  const handleCreateStaff = () => {
    router.push('/staff/create');
  };

  const handleViewStaff = (staff) => {
    router.push(`/staff/view/${staff.id}`);
  };

  const handleEditStaff = (staff) => {
    router.push(`/staff/edit/${staff.id}`);
  };

  const handleDeleteStaff = (staff) => {
    setSelectedStaff(staff);
    setDeleteShow(true);
  };

  const handleDelete = () => {
    setStaffData(prev => prev.filter(staff => staff.id !== selectedStaff.id));
    setDeleteShow(false);
    setSelectedStaff(null);
  };

  const handleClose = () => {
    setDeleteShow(false);
    setSelectedStaff(null);
  };

  return (
    <div className="content-area">
      {/* Search and Create Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
        <TextField
          placeholder="Search staff..."
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
          onClick={handleCreateStaff}
        >
          <Add />
          Add Staff
        </button>
      </Box>

      {/* Staff Table */}
      <Box className="hrms-card">
        <Box className="hrms-card-content" sx={{ padding: 0 }}>
          <Table className="hrms-table">
            <TableHead>
              <TableRow>
                <TableCell>S. No.</TableCell>
                <TableCell>Staff Name</TableCell>
                <TableCell>Designation</TableCell>
                <TableCell>Mobile No.</TableCell>
                <TableCell>Email Id</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Salary</TableCell>
                <TableCell>Joining Date</TableCell>
                <TableCell>Availability Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStaff
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((staff, index) => (
                  <TableRow key={staff.id}>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {staff.staffName}
                      </Typography>
                    </TableCell>
                    <TableCell>{staff.department}</TableCell>
                    <TableCell>{staff.mobileNo}</TableCell>
                    <TableCell>{staff.emailId}</TableCell>
                    <TableCell>{staff.branchLocation}</TableCell>
                    <TableCell>₹{staff.salary || 45000}</TableCell>
                    <TableCell>{staff.joiningDate}</TableCell>
                    <TableCell>
                      <Box className={`hrms-badge ${getStatusColor(staff.availabilityStatus)}`}>
                        {staff.availabilityStatus}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: "0.25rem" }}>
                        <IconButton 
                          size="small"
                          sx={{ color: "#1976D2", fontSize: "16px" }}
                          onClick={() => handleViewStaff(staff)}
                        >
                          <VisibilityOutlined />
                        </IconButton>
                        <IconButton 
                          size="small"
                          sx={{ color: "#000", fontSize: "16px" }}
                          onClick={() => handleEditStaff(staff)}
                        >
                          <EditOutlined />
                        </IconButton>
                        <IconButton 
                          size="small"
                          sx={{ color: "#d32f2f", fontSize: "16px" }}
                          onClick={() => handleDeleteStaff(staff)}
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
              Showing {page * rowsPerPage + 1} to {Math.min((page + 1) * rowsPerPage, filteredStaff.length)} of {filteredStaff.length} staff
            </Typography>
            <Pagination
              count={Math.ceil(filteredStaff.length / rowsPerPage)}
              page={page + 1}
              onChange={(_, newPage) => setPage(newPage - 1)}
              color="primary"
              size="small"
            />
          </Stack>
        </Box>
      </Box>

      {/* Common Dialog for Delete */}
      <CommonDialog
        open={deleteShow}
        onClose={handleClose}
        dialogTitle="Delete Staff"
        dialogContent={
          <DeleteStaff 
            selectedStaff={selectedStaff} 
            handleDelete={handleDelete} 
            handleClose={handleClose} 
          />
        }
        maxWidth="xs"
        fullWidth={false}
      />
    </div>
  );
};

export default Staff;
