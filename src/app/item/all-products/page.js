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

const AllProducts = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);

  // All Products data
  const [productsData, setProductsData] = useState([
    {
      id: "PROD001",
      skuCode: "SGS24-128GB",
      productType: "Electronics",
      categoryName: "Electronics",
      subCategoryName: "Smartphones",
      brandName: "Samsung",
      unitOfMeasure: "Pieces",
      description: "Latest Samsung Galaxy S24 with 128GB storage",
      barCode: "1234567890123",
      purchasePrice: 42000,
      sellingPrice: 45000,
      discountPercent: 0,
      taxRate: 18,
      hsnCode: "8517",
      stock: 25,
      reorderLevel: 5,
      warehouseName: "Electronics Warehouse",
      productImageUrl: "samsung-s24.jpg",
      status: "Active"
    },
    {
      id: "PROD002",
      skuCode: "DLI15-512GB",
      productType: "Electronics",
      categoryName: "Electronics",
      subCategoryName: "Laptops",
      brandName: "Dell",
      unitOfMeasure: "Pieces",
      description: "Dell Inspiron 15 with 512GB SSD",
      barCode: "2345678901234",
      purchasePrice: 45000,
      sellingPrice: 48000,
      discountPercent: 5,
      taxRate: 18,
      hsnCode: "8471",
      stock: 15,
      reorderLevel: 3,
      warehouseName: "Electronics Warehouse",
      productImageUrl: "dell-inspiron.jpg",
      status: "Active"
    },
    {
      id: "PROD003",
      skuCode: "OCE-001",
      productType: "Furniture",
      categoryName: "Furniture",
      subCategoryName: "Office Chairs",
      brandName: "OfficePro",
      unitOfMeasure: "Pieces",
      description: "Ergonomic office chair with lumbar support",
      barCode: "3456789012345",
      purchasePrice: 10000,
      sellingPrice: 12000,
      discountPercent: 10,
      taxRate: 12,
      hsnCode: "9401",
      stock: 8,
      reorderLevel: 2,
      warehouseName: "Furniture Warehouse",
      productImageUrl: "office-chair.jpg",
      status: "Active"
    },
    {
      id: "PROD004",
      skuCode: "CM-001",
      productType: "Kitchenware",
      categoryName: "Kitchenware",
      subCategoryName: "Ceramic Items",
      brandName: "CeramicPro",
      unitOfMeasure: "Pieces",
      description: "Premium ceramic coffee mug",
      barCode: "4567890123456",
      purchasePrice: 500,
      sellingPrice: 750,
      discountPercent: 15,
      taxRate: 12,
      hsnCode: "6911",
      stock: 50,
      reorderLevel: 10,
      warehouseName: "Main Warehouse",
      productImageUrl: "coffee-mug.jpg",
      status: "Active"
    }
  ]);

  const filteredProducts = productsData.filter(product =>
    product.skuCode.toLowerCase().includes(search.toLowerCase()) ||
    product.productType.toLowerCase().includes(search.toLowerCase()) ||
    product.categoryName.toLowerCase().includes(search.toLowerCase()) ||
    product.brandName.toLowerCase().includes(search.toLowerCase()) ||
    product.warehouseName.toLowerCase().includes(search.toLowerCase()) ||
    product.status.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "hrms-badge-success";
      case "Inactive":
        return "hrms-badge-error";
      case "Discontinued":
        return "hrms-badge-warning";
      default:
        return "hrms-badge-neutral";
    }
  };

  const getProductTypeColor = (type) => {
    switch (type) {
      case "Electronics":
        return "hrms-badge-primary";
      case "Furniture":
        return "hrms-badge-success";
      case "Kitchenware":
        return "hrms-badge-warning";
      default:
        return "hrms-badge-neutral";
    }
  };

  return (
    <div className="content-area">
      
      {/* Search and Create Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
        <TextField
          placeholder="Search products..."
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
          onClick={() => window.location.href = '/item/all-products/create'}
        >
          <Add />
          Add Product
        </button>
      </Box>

      {/* Products Table */}
      <Box className="hrms-card">
        <Box className="hrms-card-content" sx={{ padding: 0 }}>
          <Table className="hrms-table">
            <TableHead>
              <TableRow>
                <TableCell>S. No.</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Brand</TableCell>
                <TableCell>Purchase Price</TableCell>
                <TableCell>Selling Price</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((product, index) => (
                  <TableRow key={product.id}>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {product.description}
                      </Typography>
                    </TableCell>
                    <TableCell>{product.categoryName}</TableCell>
                    <TableCell>{product.brandName}</TableCell>
                    <TableCell>₹{product.purchasePrice.toLocaleString()}</TableCell>
                    <TableCell>₹{product.sellingPrice.toLocaleString()}</TableCell>
                    <TableCell>
                      <Box className={`hrms-badge ${getStatusColor(product.status)}`}>
                        {product.status}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: "0.25rem" }}>
                        <IconButton 
                          size="small"
                          sx={{ color: "#1976D2", fontSize: "16px" }}
                          onClick={() => window.location.href = `/item/all-products/view/${product.id}`}
                        >
                          <VisibilityOutlined />
                        </IconButton>
                        <IconButton 
                          size="small"
                          sx={{ color: "#000", fontSize: "16px" }}
                          onClick={() => window.location.href = `/item/all-products/edit/${product.id}`}
                        >
                          <EditOutlined />
                        </IconButton>
                        <IconButton 
                          size="small"
                          sx={{ color: "#d32f2f", fontSize: "16px" }}
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
              Showing {page * rowsPerPage + 1} to {Math.min((page + 1) * rowsPerPage, filteredProducts.length)} of {filteredProducts.length} products
            </Typography>
            <Pagination
              count={Math.ceil(filteredProducts.length / rowsPerPage)}
              page={page + 1}
              onChange={(_, newPage) => setPage(newPage - 1)}
              color="primary"
              size="small"
            />
          </Stack>
        </Box>
      </Box>
    </div>
  );
};

export default AllProducts;
