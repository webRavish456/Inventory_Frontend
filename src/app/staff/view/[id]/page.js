'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
} from "@mui/material";
import { Edit, ArrowBack } from "@mui/icons-material";

const ViewStaff = () => {
  const params = useParams();
  const [staffData, setStaffData] = useState(null);

  // Sample staff data (in real app, this would come from API)
  const sampleStaffData = {
    id: "STAFF001",
    staffName: "Priya Singh",
    gender: "Female",
    dob: "1990-05-15",
    mobileNo: "9876543210",
    emailId: "priya.singh@company.com",
    qualification: "MBA",
    experience: "5 years",
    address: "123 Business Park, Mumbai, Maharashtra",
    branchName: "Head Office",
    designation: "Office Administrator",
    department: "Administration",
    salary: 55000,
    joiningDate: "2020-01-15",
    resumeCertificate: "resume_priya.pdf",
    highestQualificationCertificate: "mba_cert.pdf",
    panCard: "ABCDE1234F",
    aadharCard: "123456789012",
    accountHolderName: "Priya Singh",
    accountNumber: "1234567890",
    bankName: "HDFC Bank",
    ifscCode: "HDFC0001234",
    bankBranch: "Mumbai Branch",
    branchLocation: "Mumbai"
  };

  useEffect(() => {
    // In real app, fetch staff data by ID from API
    setStaffData(sampleStaffData);
  }, [params.id]);

  const handleEdit = () => {
    window.location.href = `/staff/edit/${params.id}`;
  };

  const handleBack = () => {
    window.history.back();
  };

  if (!staffData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="content-area">
      <Grid container spacing={3}>
        {/* Personal Details */}
        <Grid size={{ xs: 12 }}>
          <Card sx={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ marginBottom: 3, color: '#1976d2', fontWeight: 'bold' }}>
                Personal Details
              </Typography>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5, fontSize: '0.875rem' }}>
                      Staff Name
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '1rem' }}>
                      {staffData.staffName}
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5, fontSize: '0.875rem' }}>
                      Mobile Number
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '1rem' }}>
                      {staffData.mobileNo}
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5, fontSize: '0.875rem' }}>
                      Date of Birth
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '1rem' }}>
                      {staffData.dob}
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5, fontSize: '0.875rem' }}>
                      Address
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '1rem' }}>
                      {staffData.address}
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5, fontSize: '0.875rem' }}>
                      Gender
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '1rem' }}>
                      {staffData.gender}
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5, fontSize: '0.875rem' }}>
                      Email ID
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '1rem' }}>
                      {staffData.emailId}
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5, fontSize: '0.875rem' }}>
                      Experience
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '1rem' }}>
                      {staffData.experience}
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5, fontSize: '0.875rem' }}>
                      Qualification
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '1rem' }}>
                      {staffData.qualification}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Company Details */}
        <Grid size={{ xs: 12 }}>
          <Card sx={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ marginBottom: 3, color: '#1976d2', fontWeight: 'bold' }}>
                Company Details
              </Typography>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5, fontSize: '0.875rem' }}>
                      Branch Name
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '1rem' }}>
                      {staffData.branchName}
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5, fontSize: '0.875rem' }}>
                      Designation
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '1rem' }}>
                      {staffData.designation}
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5, fontSize: '0.875rem' }}>
                      Department
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '1rem' }}>
                      {staffData.department}
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5, fontSize: '0.875rem' }}>
                      Salary
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '1rem' }}>
                      ₹{staffData.salary.toLocaleString()}
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5, fontSize: '0.875rem' }}>
                      Joining Date
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '1rem' }}>
                      {staffData.joiningDate}
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5, fontSize: '0.875rem' }}>
                      Status
                    </Typography>
                    <Chip 
                      label="Active" 
                      color="success" 
                      size="small"
                      sx={{ fontWeight: 500 }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Bank Details */}
        <Grid size={{ xs: 12 }}>
          <Card sx={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ marginBottom: 3, color: '#1976d2', fontWeight: 'bold' }}>
                Bank Details
              </Typography>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5, fontSize: '0.875rem' }}>
                      Account Holder Name
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '1rem' }}>
                      {staffData.accountHolderName}
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5, fontSize: '0.875rem' }}>
                      Account Number
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '1rem' }}>
                      {staffData.accountNumber}
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5, fontSize: '0.875rem' }}>
                      Bank Name
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '1rem' }}>
                      {staffData.bankName}
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5, fontSize: '0.875rem' }}>
                      IFSC Code
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '1rem' }}>
                      {staffData.ifscCode}
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5, fontSize: '0.875rem' }}>
                      Bank Branch
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '1rem' }}>
                      {staffData.bankBranch}
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5, fontSize: '0.875rem' }}>
                      Branch Location
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '1rem' }}>
                      {staffData.branchLocation}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default ViewStaff;
