'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
  Alert,
  CircularProgress,
} from "@mui/material";
import { createStaff, fetchWarehouses } from "@/lib/staffApi";
import { fetchRoles } from "@/lib/rolesApi";

const DEPARTMENTS = ['Warehouse', 'Sales', 'Purchase', 'Finance', 'IT', 'HR', 'Administration', 'Support', 'Maintenance', 'Security', 'Housekeeping'];

const CreateStaff = () => {
  const router = useRouter();
  const [warehouses, setWarehouses] = useState([]);
  const [permissionRoles, setPermissionRoles] = useState([]);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    staffName: '',
    gender: 'Male',
    dob: '',
    mobileNo: '',
    emailId: '',
    qualification: '',
    experience: '',
    address: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    district: '',
    pinCode: '',
    state: '',
    branchName: '',
    designation: '',
    department: '',
    role: '',
    permissionRoleId: '',
    warehouse: '',
    salary: '',
    joiningDate: '',
    resumeCertificate: '',
    highestQualificationCertificate: '',
    panCard: '',
    aadharCard: '',
    accountHolderName: '',
    accountNumber: '',
    bankName: '',
    ifscCode: '',
    bankBranch: '',
    branchLocation: ''
  });

  useEffect(() => {
    fetchWarehouses().then(setWarehouses).catch(() => setWarehouses([]));
    fetchRoles().then(setPermissionRoles).catch(() => setPermissionRoles([]));
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => {
      const next = { ...prev, [field]: value };
      if (field === 'permissionRoleId') {
        const role = permissionRoles.find(r => r._id === value || r.id === value);
        next.role = role ? role.name : (value || '');
      }
      if (field === 'branchWarehouse') {
        next.branchName = value;
        next.warehouse = value;
      }
      if (field === 'address') next.addressLine1 = value;
      return next;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const payload = {
        ...formData,
        addressLine1: formData.addressLine1 || formData.address,
        addressLine2: formData.addressLine2,
        city: formData.city,
        district: formData.district,
        pinCode: formData.pinCode,
        state: formData.state,
      };
      await createStaff(payload);
      router.push('/staff');
    } catch (err) {
      setError(err.message || 'Failed to create staff');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => router.back();

  return (
    <div className="content-area">
      {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>{error}</Alert>}
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
                      label="Address Line 1 *"
                      value={formData.addressLine1 || formData.address}
                      onChange={(e) => handleInputChange('addressLine1', e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Address Line 2"
                      value={formData.addressLine2}
                      onChange={(e) => handleInputChange('addressLine2', e.target.value)}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                      fullWidth
                      label="City *"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                      fullWidth
                      label="District *"
                      value={formData.district}
                      onChange={(e) => handleInputChange('district', e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                      fullWidth
                      label="Pin Code *"
                      value={formData.pinCode}
                      onChange={(e) => handleInputChange('pinCode', e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="State *"
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      required
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
                      <InputLabel>Branch / Warehouse *</InputLabel>
                      <Select
                        value={formData.branchName || formData.warehouse || ''}
                        onChange={(e) => handleInputChange('branchWarehouse', e.target.value)}
                        label="Branch / Warehouse *"
                        required
                      >
                        <MenuItem value="">
                          <em>Select branch or warehouse</em>
                        </MenuItem>
                        {(warehouses || []).map((w) => {
                          const name = w.name || w.warehouseName || w.branchName;
                          const id = w._id || w.id;
                          return <MenuItem key={id} value={name}>{name}</MenuItem>;
                        })}
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
                        label="Department *"
                        required
                      >
                        {DEPARTMENTS.map((d) => <MenuItem key={d} value={d}>{d}</MenuItem>)}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth>
                      <InputLabel>Role *</InputLabel>
                      <Select
                        value={formData.permissionRoleId || ''}
                        onChange={(e) => handleInputChange('permissionRoleId', e.target.value || '')}
                        label="Role *"
                        required
                      >
                        <MenuItem value="">
                          <em>Select role</em>
                        </MenuItem>
                        {(permissionRoles || []).map((r) => (
                          <MenuItem key={r._id} value={r._id}>{r.name}</MenuItem>
                        ))}
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
                        onChange={(e) => handleInputChange('highestQualificationCertificate', e.target.files[0] ?? null)}
                        style={{ 
                          width: '100%',
                          padding: '8px',
                          border: '1px solid #ccc',
                          borderRadius: '4px',
                          backgroundColor: '#fff'
                        }}
                      />
                      <Typography variant="caption" color="textSecondary">
                        {formData.highestQualificationCertificate instanceof File
                          ? formData.highestQualificationCertificate.name
                          : (formData.highestQualificationCertificate || 'No file chosen')}
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
                        onChange={(e) => handleInputChange('aadharCard', e.target.files[0] ?? null)}
                        style={{ 
                          width: '100%',
                          padding: '8px',
                          border: '1px solid #ccc',
                          borderRadius: '4px',
                          backgroundColor: '#fff'
                        }}
                      />
                      <Typography variant="caption" color="textSecondary">
                        {formData.aadharCard instanceof File
                          ? formData.aadharCard.name
                          : (formData.aadharCard || 'No file chosen')}
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
                        onChange={(e) => handleInputChange('panCard', e.target.files[0] ?? null)}
                        style={{ 
                          width: '100%',
                          padding: '8px',
                          border: '1px solid #ccc',
                          borderRadius: '4px',
                          backgroundColor: '#fff'
                        }}
                      />
                      <Typography variant="caption" color="textSecondary">
                        {formData.panCard instanceof File
                          ? formData.panCard.name
                          : (formData.panCard || 'No file chosen')}
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
                        onChange={(e) => handleInputChange('resumeCertificate', e.target.files[0] ?? null)}
                        style={{ 
                          width: '100%',
                          padding: '8px',
                          border: '1px solid #ccc',
                          borderRadius: '4px',
                          backgroundColor: '#fff'
                        }}
                      />
                      <Typography variant="caption" color="textSecondary">
                        {formData.resumeCertificate instanceof File
                          ? formData.resumeCertificate.name
                          : (formData.resumeCertificate || 'No file chosen')}
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
                disabled={submitting}
                sx={{ minWidth: 120, transform: 'none', textTransform: 'none' }}
              >
                {submitting ? <CircularProgress size={24} /> : 'Save Staff'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default CreateStaff;
