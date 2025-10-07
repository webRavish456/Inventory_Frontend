'use client';

import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Card,
  CardContent,
  Divider,
} from "@mui/material";

const CreateStaff = () => {
  const [formData, setFormData] = useState({
    // Personal Details
    staffName: '',
    gender: 'Male',
    dob: '',
    mobileNo: '',
    emailId: '',
    qualification: '',
    experience: '',
    address: '',
    
    // Company Details
    branchName: '',
    designation: '',
    department: '',
    salary: '',
    joiningDate: '',
    
    // Documents
    resumeCertificate: '',
    highestQualificationCertificate: '',
    panCard: '',
    aadharCard: '',
    
    // Bank Details
    accountHolderName: '',
    accountNumber: '',
    bankName: '',
    ifscCode: '',
    bankBranch: '',
    branchLocation: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Staff Data:', formData);
    // Here you would typically send data to API
    alert('Staff created successfully!');
  };

  const handleCancel = () => {
    // Navigate back to staff list
    window.history.back();
  };

  return (
    <div className="content-area">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Personal Details */}
          <Grid size={{ xs: 12 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ marginBottom: 2, color: '#1976d2', fontWeight: 'bold' }}>
                  Personal Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Staff Name *"
                      value={formData.staffName}
                      onChange={(e) => handleInputChange('staffName', e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth>
                      <FormLabel component="legend">Gender *</FormLabel>
                      <RadioGroup
                        row
                        value={formData.gender}
                        onChange={(e) => handleInputChange('gender', e.target.value)}
                      >
                        <FormControlLabel value="Male" control={<Radio />} label="Male" />
                        <FormControlLabel value="Female" control={<Radio />} label="Female" />
                        <FormControlLabel value="Others" control={<Radio />} label="Others" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Date of Birth *"
                      type="date"
                      value={formData.dob}
                      onChange={(e) => handleInputChange('dob', e.target.value)}
                      InputLabelProps={{ shrink: true }}
                      required
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Mobile Number *"
                      value={formData.mobileNo}
                      onChange={(e) => handleInputChange('mobileNo', e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Email ID *"
                      type="email"
                      value={formData.emailId}
                      onChange={(e) => handleInputChange('emailId', e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Qualification"
                      value={formData.qualification}
                      onChange={(e) => handleInputChange('qualification', e.target.value)}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Experience"
                      value={formData.experience}
                      onChange={(e) => handleInputChange('experience', e.target.value)}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Address"
                      multiline
                      rows={3}
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Company Details */}
          <Grid size={{ xs: 12 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ marginBottom: 2, color: '#1976d2', fontWeight: 'bold' }}>
                  Company Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth>
                      <InputLabel>Branch Name *</InputLabel>
                      <Select
                        value={formData.branchName}
                        onChange={(e) => handleInputChange('branchName', e.target.value)}
                        required
                      >
                        <MenuItem value="Head Office">Head Office</MenuItem>
                        <MenuItem value="Delhi Branch">Delhi Branch</MenuItem>
                        <MenuItem value="Mumbai Branch">Mumbai Branch</MenuItem>
                        <MenuItem value="Bangalore Branch">Bangalore Branch</MenuItem>
                        <MenuItem value="Chennai Branch">Chennai Branch</MenuItem>
                        <MenuItem value="Kolkata Branch">Kolkata Branch</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Designation *"
                      value={formData.designation}
                      onChange={(e) => handleInputChange('designation', e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth>
                      <InputLabel>Department *</InputLabel>
                      <Select
                        value={formData.department}
                        onChange={(e) => handleInputChange('department', e.target.value)}
                        required
                      >
                        <MenuItem value="Administration">Administration</MenuItem>
                        <MenuItem value="Support">Support</MenuItem>
                        <MenuItem value="Maintenance">Maintenance</MenuItem>
                        <MenuItem value="Security">Security</MenuItem>
                        <MenuItem value="Housekeeping">Housekeeping</MenuItem>
                        <MenuItem value="HR">HR</MenuItem>
                        <MenuItem value="Finance">Finance</MenuItem>
                        <MenuItem value="IT">IT</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Salary *"
                      type="number"
                      value={formData.salary}
                      onChange={(e) => handleInputChange('salary', e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Joining Date *"
                      type="date"
                      value={formData.joiningDate}
                      onChange={(e) => handleInputChange('joiningDate', e.target.value)}
                      InputLabelProps={{ shrink: true }}
                      required
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Documents */}
          <Grid size={{ xs: 12 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ marginBottom: 2, color: '#1976d2', fontWeight: 'bold' }}>
                  Document Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Box sx={{ marginBottom: 2 }}>
                      <Typography variant="body2" sx={{ marginBottom: 1, fontWeight: 'bold' }}>
                        Highest Qualification Certificate
                      </Typography>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onChange={(e) => handleInputChange('highestQualificationCertificate', e.target.files[0]?.name || '')}
                        style={{ 
                          width: '100%',
                          padding: '8px',
                          border: '1px solid #ccc',
                          borderRadius: '4px',
                          backgroundColor: '#fff'
                        }}
                      />
                      <Typography variant="caption" color="textSecondary">
                        {formData.highestQualificationCertificate || 'No file chosen'}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Box sx={{ marginBottom: 2 }}>
                      <Typography variant="body2" sx={{ marginBottom: 1, fontWeight: 'bold' }}>
                        Aadhar Card
                      </Typography>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onChange={(e) => handleInputChange('aadharCard', e.target.files[0]?.name || '')}
                        style={{ 
                          width: '100%',
                          padding: '8px',
                          border: '1px solid #ccc',
                          borderRadius: '4px',
                          backgroundColor: '#fff'
                        }}
                      />
                      <Typography variant="caption" color="textSecondary">
                        {formData.aadharCard || 'No file chosen'}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Box sx={{ marginBottom: 2 }}>
                      <Typography variant="body2" sx={{ marginBottom: 1, fontWeight: 'bold' }}>
                        Pan Card
                      </Typography>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onChange={(e) => handleInputChange('panCard', e.target.files[0]?.name || '')}
                        style={{ 
                          width: '100%',
                          padding: '8px',
                          border: '1px solid #ccc',
                          borderRadius: '4px',
                          backgroundColor: '#fff'
                        }}
                      />
                      <Typography variant="caption" color="textSecondary">
                        {formData.panCard || 'No file chosen'}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Box sx={{ marginBottom: 2 }}>
                      <Typography variant="body2" sx={{ marginBottom: 1, fontWeight: 'bold' }}>
                        Resume Certificate
                      </Typography>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onChange={(e) => handleInputChange('resumeCertificate', e.target.files[0]?.name || '')}
                        style={{ 
                          width: '100%',
                          padding: '8px',
                          border: '1px solid #ccc',
                          borderRadius: '4px',
                          backgroundColor: '#fff'
                        }}
                      />
                      <Typography variant="caption" color="textSecondary">
                        {formData.resumeCertificate || 'No file chosen'}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Bank Details */}
          <Grid size={{ xs: 12 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ marginBottom: 2, color: '#1976d2', fontWeight: 'bold' }}>
                  Bank Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Account Holder Name"
                      value={formData.accountHolderName}
                      onChange={(e) => handleInputChange('accountHolderName', e.target.value)}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Account Number"
                      value={formData.accountNumber}
                      onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Bank Name"
                      value={formData.bankName}
                      onChange={(e) => handleInputChange('bankName', e.target.value)}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="IFSC Code"
                      value={formData.ifscCode}
                      onChange={(e) => handleInputChange('ifscCode', e.target.value)}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Bank Branch"
                      value={formData.bankBranch}
                      onChange={(e) => handleInputChange('bankBranch', e.target.value)}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Branch Location"
                      value={formData.branchLocation}
                      onChange={(e) => handleInputChange('branchLocation', e.target.value)}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Action Buttons */}
          <Grid size={{ xs: 12 }}>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', marginTop: 2 }}>
              <Button
                variant="outlined"
                onClick={handleCancel}
                sx={{ minWidth: 120, transform: 'none', textTransform: 'none' }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{ minWidth: 120, transform: 'none', textTransform: 'none' }}
              >
                Save Staff
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default CreateStaff;
