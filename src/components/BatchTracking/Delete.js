'use client';

import React from 'react';
import {
  Box,
  Button,
  Typography,
} from "@mui/material";

const DeleteBatch = ({ batchData, onClose, onDelete }) => {
  const handleDelete = () => {
    onDelete(batchData?.id);
    onClose();
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Are you sure you want to delete the batch "{batchData?.batchNumber}"?
      </Typography>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{ transform: 'none', textTransform: 'none' }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleDelete}
          sx={{ transform: 'none', textTransform: 'none' }}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
};

export default DeleteBatch;
