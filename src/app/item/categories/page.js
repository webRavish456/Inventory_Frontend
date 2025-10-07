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
import { getCategories, addCategory, updateCategory, deleteCategory, categoriesData } from '../sharedData';
import CommonDialog from '../../../components/CommonDialog';
import CreateCategory from '../../../components/Categories/Create';
import EditCategory from '../../../components/Categories/Edit';
import ViewCategory from '../../../components/Categories/View';
import DeleteCategory from '../../../components/Categories/Delete';

const Categories = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  const [openData, setOpenData] = useState(false);
  const [viewShow, setViewShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Categories data
  const [categoriesDataState, setCategoriesDataState] = useState(categoriesData);

  const filteredCategories = categoriesDataState.filter(category =>
    category.categoryName.toLowerCase().includes(search.toLowerCase()) ||
    category.description.toLowerCase().includes(search.toLowerCase())
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

  const handleCreateCategory = () => {
    setSelectedCategory(null);
    setOpenData(true);
  };

  const handleViewCategory = (category) => {
    setSelectedCategory(category);
    setViewShow(true);
  };

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setEditShow(true);
  };

  const handleDeleteCategory = (category) => {
    setSelectedCategory(category);
    setDeleteShow(true);
  };

  const handleSaveCategory = (categoryData) => {
    if (openData) {
      // Create new category
      const newCategory = addCategory(categoryData);
      setCategoriesDataState([...categoriesData]);
    } else if (editShow) {
      // Update existing category
      updateCategory(selectedCategory.id, categoryData);
      setCategoriesDataState([...categoriesData]);
    }
  };

  const handleDeleteConfirm = (id) => {
    deleteCategory(id);
    setCategoriesDataState([...categoriesData]);
  };

  const handleClose = () => {
    setOpenData(false);
    setViewShow(false);
    setEditShow(false);
    setDeleteShow(false);
    setTimeout(() => setSelectedCategory(null), 100);
  };

  // Get unique parent categories for dropdown
  const parentCategories = [...new Set(categoriesDataState.map(cat => cat.categoryName))];

  return (
    <div className="content-area">
      
      {/* Search and Create Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
        <TextField
          placeholder="Search categories..."
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
          onClick={handleCreateCategory}
        >
          <Add />
          Add Category
        </button>
      </Box>

      {/* Categories Table */}
      <Box className="hrms-card">
        <Box className="hrms-card-content" sx={{ padding: 0 }}>
          <Table className="hrms-table">
            <TableHead>
              <TableRow>
                <TableCell>S. No.</TableCell>
                <TableCell>Category Id</TableCell>
                <TableCell>Category Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCategories
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((category, index) => (
                  <TableRow key={category.id}>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>{category.id}</TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {category.categoryName}
                      </Typography>
                    </TableCell>
                    <TableCell>{category.description}</TableCell>
                    <TableCell>
                      <Box className={`hrms-badge ${getStatusColor(category.status)}`}>
                        {category.status}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: "0.25rem" }}>
                        <IconButton 
                          size="small"
                          sx={{ color: "#1976D2", fontSize: "16px" }}
                          onClick={() => handleViewCategory(category)}
                        >
                          <VisibilityOutlined />
                        </IconButton>
                        <IconButton 
                          size="small"
                          sx={{ color: "#000", fontSize: "16px" }}
                          onClick={() => handleEditCategory(category)}
                        >
                          <EditOutlined />
                        </IconButton>
                        <IconButton 
                          size="small"
                          sx={{ color: "#d32f2f", fontSize: "16px" }}
                          onClick={() => handleDeleteCategory(category)}
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
              Showing {page * rowsPerPage + 1} to {Math.min((page + 1) * rowsPerPage, filteredCategories.length)} of {filteredCategories.length} categories
            </Typography>
            <Pagination
              count={Math.ceil(filteredCategories.length / rowsPerPage)}
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
        key={selectedCategory?.id || 'create'}
        open={openData || viewShow || editShow || deleteShow}
        onClose={handleClose}
        dialogTitle={
          openData ? "Add Category" :
          viewShow ? "Category Details" :
          editShow ? "Edit Category" :
          deleteShow ? "Delete Category" : ""
        }
        dialogContent={
          openData ? (
            <CreateCategory
              onClose={handleClose}
              onSave={handleSaveCategory}
            />
          ) : viewShow ? (
            <ViewCategory
              categoryData={selectedCategory}
              onClose={handleClose}
              onEdit={() => {
                setViewShow(false);
                setEditShow(true);
              }}
              onDelete={() => {
                setViewShow(false);
                setDeleteShow(true);
              }}
            />
          ) : editShow ? (
            <EditCategory
              categoryData={selectedCategory}
              onClose={handleClose}
              onSave={handleSaveCategory}
            />
          ) : deleteShow ? (
            <DeleteCategory
              categoryData={selectedCategory}
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

export default Categories;
