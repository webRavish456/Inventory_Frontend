"use client";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";

const EditProduct=(
    {product,onCancel,onUpdate}
)=>{
    


        const [formData, setFormData] = useState({
  productName: product?.productName || "",
  SKUcode: product?.SKUcode || "",
  type: product?.type || "",
  Barcode: product?.Barcode || "",
  purchasePrice: product?.purchasePrice || "",
  sellingPrice: product?.sellingPrice || "",
  taxRate: product?.taxRate || "",
  stock: product?.stock || "",
  warehouseName: product?.warehouseName || "",
  status: product?.status || "",
});

    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:
            e.target.value
        });
    };


    return(
        <Grid container spacing={2} p={2}>
            <Grid item xs={12}>
                <Typography variant="h6" fontWeight="600">
                    Edit Product
                </Typography>
            </Grid>

            <Grid item xs={6}>
                <TextField
                fullWidth
                label="Product Name"
                name="productName"
                value={formData.productName}
                onChange={handleChange}/>
            </Grid>

            <Grid item xs={6}>
                <TextField fullWidth label="SKU Code" name="skuCode" value={formData.skuCode} onChange={handleChange}/>
            </Grid>

            <Grid item xs={6}>
                <TextField
                fullWidth
                label="Product type"
                name="productType"
                value={formData.productType}
                onChange={handleChange}/>
            </Grid>

            <Grid item xs={6}>
                <TextField
                fullWidth
                label="Bar Code"
                name="barCode"
                value={formData.Barcode}
                onChange={handleChange}/>
            </Grid>

            <Grid item xs={6}>
                <TextField
                fullWidth
                label="Purchase Price"
                name="purchasePrice"
                value={formData.purchasePrise}
                onChange={handleChange}/>
            </Grid>

            <Grid item xs={6}>
                <TextField
                fullWidth
                label="Selling Price"
                name="sellingPrice"
                value={formData.sellingPrice}
                onChange={handleChange}/>
            </Grid>

            <Grid item xs={6}>
                <TextField
                fullWidth
                label="Tax Rate"
                name="taxRate"
                value={formData.taxRate}
                onChange={handleChange}/>
            </Grid>

            <Grid item xs={6}>
                <TextField
                fullWidth
                label="Stock"
                name="stock"
                value={formData.stock}
                onChange={handleChange}/>
            </Grid>

            <Grid item xs={6}>
                <TextField
                fullWidth
                label="Warehouse Name"
                name="warehouseName"
                value={formData.warehouseName}
                onChange={handleChange}/>
            </Grid>

            <Grid item xs={6}>
                <TextField
                fullWidth
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}/>
            </Grid>

            {/* buttons */}
            <Grid item xs={12} display="flex" justifyContent="flex-end" gap={2}>
                <Button variant="outlined" color="error" onClick={onCancel}>Cancel</Button>
                <Button variant="contained" color="primary" onClick={()=>onUpdate(formData)}>Update</Button>
            </Grid>
        </Grid>
    );
};
export default EditProduct;