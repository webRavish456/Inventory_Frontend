'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  Divider,
  LinearProgress,
} from '@mui/material';
import {
  Inventory2Outlined,
  WarningAmberOutlined,
  ShoppingCartOutlined,
  TrendingUpOutlined,
  ReceiptOutlined,
  AttachMoneyOutlined,
  StoreOutlined,
  LocalShippingOutlined,
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  LineChart,
  Line,
} from 'recharts';
import { fetchDashboardData } from '@/lib/dashboardApi';

const CHART_COLORS = ['#8b5cf6', '#ec4899', '#06b6d4', '#f59e0b', '#10b981', '#3b82f6', '#f97316', '#6366f1'];

const formatCurrency = (n) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(
    Number(n) || 0
  );

const getMonthKey = (d) => {
  const dt = new Date(d);
  return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}`;
};

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dateRange, setDateRange] = useState('90');
  const [warehouseFilter, setWarehouseFilter] = useState('all');

  useEffect(() => {
    fetchDashboardData()
      .then(setData)
      .catch((e) => setError(e.message || 'Failed to load dashboard'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="content-area">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight={400}>
          <CircularProgress size={48} sx={{ color: '#8b5cf6' }} />
        </Box>
      </div>
    );
  }

  if (error) {
    return (
      <div className="content-area">
        <Alert severity="error" onClose={() => setError('')}>
          {error}
        </Alert>
      </div>
    );
  }

  const items = data?.items || [];
  const lowStock = data?.lowStockItems || [];
  const warehouses = data?.warehouses || [];
  const salesOrders = data?.salesOrders || [];
  const purchaseOrders = data?.purchaseOrders || [];
  const invoices = data?.invoices || [];
  const expenses = data?.expenses || [];
  const income = data?.income || [];
  const categories = data?.categories || [];

  const days = parseInt(dateRange, 10) || 90;
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);

  const filterByDate = (list, dateField = 'createdAt') =>
    list.filter((x) => {
      const d = x[dateField] || x.orderDate || x.invoiceDate || x.date;
      return d && new Date(d) >= cutoff;
    });

  const filteredSales = filterByDate(salesOrders, 'orderDate');
  const filteredPurchases = filterByDate(purchaseOrders, 'orderDate');
  const filteredInvoices = filterByDate(invoices, 'invoiceDate');
  const filteredExpenses = filterByDate(expenses, 'date');
  const filteredIncome = filterByDate(income, 'date');

  const totalSales = filteredSales.reduce((s, o) => s + (o.totalAmount ?? o.orderTotal ?? 0), 0);
  const totalPurchases = filteredPurchases.reduce((s, o) => s + (o.totalAmount ?? o.orderTotal ?? 0), 0);
  const totalInvoiced = filteredInvoices.reduce((s, i) => s + (i.totalAmount ?? i.subtotal ?? 0), 0);
  const totalExpenses = filteredExpenses.reduce((s, e) => s + (e.amount ?? 0), 0);
  const totalIncome = filteredIncome.reduce((s, i) => s + (i.amount ?? 0), 0);

  const inventoryValue = items.reduce((s, i) => {
    const qty = i.stock ?? i.quantity ?? 0;
    const cost = i.purchasePrice ?? i.cost ?? i.sellingPrice ?? 0;
    return s + qty * cost;
  }, 0);

  const byCategory = categories.map((cat) => {
    const name = cat.name || cat.categoryName || 'Uncategorized';
    const count = items.filter((i) => {
      const cid = i.category?._id ?? i.category;
      return String(cid) === String(cat._id) || i.categoryName === name;
    }).length;
    return { name, count, value: count };
  }).filter((x) => x.count > 0);

  const monthData = {};
  filteredSales.forEach((o) => {
    const k = getMonthKey(o.orderDate || o.createdAt);
    if (!monthData[k]) monthData[k] = { month: k, sales: 0, purchases: 0 };
    monthData[k].sales += o.totalAmount ?? o.orderTotal ?? 0;
  });
  filteredPurchases.forEach((o) => {
    const k = getMonthKey(o.orderDate || o.createdAt);
    if (!monthData[k]) monthData[k] = { month: k, sales: 0, purchases: 0 };
    monthData[k].purchases += o.totalAmount ?? o.orderTotal ?? 0;
  });
  const trendData = Object.values(monthData).sort((a, b) => a.month.localeCompare(b.month));

  const topProducts = [...items]
    .sort((a, b) => (b.stock ?? 0) * (b.sellingPrice ?? 0) - (a.stock ?? 0) * (a.sellingPrice ?? 0))
    .slice(0, 5)
    .map((i) => ({
      name: i.productName || i.name || 'Product',
      value: ((i.stock ?? 0) * (i.sellingPrice ?? 0)) || 0,
      quantity: i.stock ?? 0,
    }));

  const salesByPayment = [
    { name: 'Cash', value: 35000 },
    { name: 'Card', value: 45000 },
    { name: 'UPI', value: 32000 },
    { name: 'Wallet', value: 18000 },
  ];

  const recentSales = filteredSales.slice(0, 5).map((sale, i) => ({
    id: sale._id || i,
    customer: sale.customerName || 'Customer',
    amount: sale.totalAmount || sale.orderTotal || 0,
    status: sale.status || 'completed',
    date: sale.orderDate || sale.createdAt,
  }));

  const kpiCards = [
    { 
      label: 'Total Products', 
      value: items.length, 
      subtitle: 'In Stock',
      icon: Inventory2Outlined, 
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      iconBg: 'rgba(102, 126, 234, 0.1)',
      iconColor: '#667eea'
    },
    { 
      label: 'Low Stock Alert', 
      value: lowStock.length, 
      subtitle: 'Needs Reorder',
      icon: WarningAmberOutlined, 
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      iconBg: 'rgba(245, 87, 108, 0.1)',
      iconColor: '#f5576c'
    },
    { 
      label: 'All Orders', 
      value: filteredSales.length, 
      subtitle: 'This Month',
      icon: ShoppingCartOutlined, 
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      iconBg: 'rgba(79, 172, 254, 0.1)',
      iconColor: '#4facfe'
    },
    { 
      label: 'Total Sales', 
      value: formatCurrency(totalSales), 
      subtitle: `Last ${days} Days`,
      icon: TrendingUpOutlined, 
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      iconBg: 'rgba(67, 233, 123, 0.1)',
      iconColor: '#43e97b'
    },
    { 
      label: 'All Purchases', 
      value: formatCurrency(totalPurchases), 
      subtitle: `Last ${days} Days`,
      icon: LocalShippingOutlined, 
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      iconBg: 'rgba(250, 112, 154, 0.1)',
      iconColor: '#fa709a'
    },
    { 
      label: 'Inventory Value', 
      value: formatCurrency(inventoryValue), 
      subtitle: 'Total Worth',
      icon: StoreOutlined, 
      gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
      iconBg: 'rgba(48, 207, 208, 0.1)',
      iconColor: '#30cfd0'
    },
    { 
      label: 'Total Revenue', 
      value: formatCurrency(totalIncome), 
      subtitle: 'Gross Income',
      icon: AttachMoneyOutlined, 
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      iconBg: 'rgba(168, 237, 234, 0.1)',
      iconColor: '#0d9488'
    },
    { 
      label: 'Net Profit', 
      value: formatCurrency(totalIncome - totalExpenses), 
      subtitle: 'After Expenses',
      icon: ReceiptOutlined, 
      gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
      iconBg: 'rgba(255, 154, 158, 0.1)',
      iconColor: '#ff9a9e'
    },
  ];

  return (
    <div className="content-area" style={{ backgroundColor: '#f8f9fc', minHeight: '100vh', padding: '24px' }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2, mb: 3 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e293b', mb: 0.5 }}>
              Dashboard
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748b' }}>
              Welcome back! Here's what's happening today.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <FormControl size="small" sx={{ minWidth: 150, bgcolor: 'white', borderRadius: 1 }}>
              <InputLabel>Date Range</InputLabel>
              <Select
                value={dateRange}
                label="Date Range"
                onChange={(e) => setDateRange(e.target.value)}
                sx={{ borderRadius: 1 }}
              >
                <MenuItem value="7">Last 7 days</MenuItem>
                <MenuItem value="30">Last 30 days</MenuItem>
                <MenuItem value="90">Last 90 days</MenuItem>
                <MenuItem value="365">Last Year</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 160, bgcolor: 'white', borderRadius: 1 }}>
              <InputLabel>Warehouse</InputLabel>
              <Select
                value={warehouseFilter}
                label="Warehouse"
                onChange={(e) => setWarehouseFilter(e.target.value)}
                sx={{ borderRadius: 1 }}
              >
                <MenuItem value="all">All Warehouses</MenuItem>
                {warehouses.map((w) => (
                  <MenuItem key={w._id} value={w._id}>
                    {w.name || w.warehouseName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>

      {/* KPI Cards with Gradients */}
      <Grid container spacing={2.5} sx={{ mb: 4 }}>
        {kpiCards.map((kpi, i) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                background: kpi.gradient,
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                '&:hover': { 
                  transform: 'translateY(-4px)', 
                  boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '100px',
                  height: '100px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '50%',
                  transform: 'translate(30%, -30%)',
                }
              }}
            >
              <CardContent sx={{ p: 2.5, position: 'relative', zIndex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: 'rgba(255,255,255,0.2)',
                      backdropFilter: 'blur(10px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <kpi.icon sx={{ fontSize: 26, color: 'white' }} />
                  </Box>
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 600, opacity: 0.9, mb: 0.5, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  {kpi.label}
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>
                  {kpi.value}
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.8, fontSize: '0.7rem' }}>
                  {kpi.subtitle}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3}>
        {/* Sales & Purchases Trend */}
        <Grid item xs={12} lg={8}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              border: '1px solid #e2e8f0',
              bgcolor: 'white',
              height: 400,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b' }}>
                  Sales & Purchases
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748b' }}>
                  Monthly trend comparison
                </Typography>
              </Box>
            </Box>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={trendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="salesBar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={1} />
                    <stop offset="100%" stopColor="#c084fc" stopOpacity={0.8} />
                  </linearGradient>
                  <linearGradient id="purchBar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity={1} />
                    <stop offset="100%" stopColor="#67e8f9" stopOpacity={0.8} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
                <Tooltip 
                  formatter={(v) => formatCurrency(v)} 
                  contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="sales" name="Sales" fill="url(#salesBar)" radius={[8, 8, 0, 0]} maxBarSize={40} />
                <Bar dataKey="purchases" name="Purchases" fill="url(#purchBar)" radius={[8, 8, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Top Selling Products Donut */}
        <Grid item xs={12} lg={4}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              border: '1px solid #e2e8f0',
              bgcolor: 'white',
              height: 400,
            }}
          >
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b' }}>
                Top Selling Products
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748b' }}>
                By inventory value
              </Typography>
            </Box>
            <ResponsiveContainer width="100%" height={280}>
              {topProducts.length > 0 ? (
                <PieChart>
                  <Pie
                    data={topProducts}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                  >
                    {topProducts.map((_, i) => (
                      <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => formatCurrency(v)} />
                </PieChart>
              ) : (
                <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                  <Typography color="text.secondary">No product data</Typography>
                </Box>
              )}
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Sales by Payment Method */}
        <Grid item xs={12} lg={6}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              border: '1px solid #e2e8f0',
              bgcolor: 'white',
            }}
          >
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b' }}>
                Sales by Payment
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748b' }}>
                Payment method breakdown
              </Typography>
            </Box>
            {salesByPayment.map((item, i) => {
              const total = salesByPayment.reduce((s, x) => s + x.value, 0);
              const percentage = ((item.value / total) * 100).toFixed(1);
              return (
                <Box key={i} sx={{ mb: 2.5 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: CHART_COLORS[i] }} />
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569' }}>
                        {item.name}
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: '#1e293b' }}>
                        {formatCurrency(item.value)}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#64748b' }}>
                        {percentage}%
                      </Typography>
                    </Box>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={parseFloat(percentage)} 
                    sx={{ 
                      height: 6, 
                      borderRadius: 3,
                      bgcolor: '#f1f5f9',
                      '& .MuiLinearProgress-bar': { 
                        bgcolor: CHART_COLORS[i],
                        borderRadius: 3
                      }
                    }} 
                  />
                </Box>
              );
            })}
          </Paper>
        </Grid>

        {/* Stock Value */}
        <Grid item xs={12} lg={6}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              border: '1px solid #e2e8f0',
              bgcolor: 'white',
            }}
          >
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b' }}>
                Stock Value
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748b' }}>
                Top 3 highest value items
              </Typography>
            </Box>
            {topProducts.slice(0, 3).map((item, i) => (
              <Box key={i} sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                p: 2,
                mb: 2,
                borderRadius: 2,
                bgcolor: '#f8fafc',
                border: '1px solid #e2e8f0',
                transition: 'all 0.2s',
                '&:hover': {
                  bgcolor: '#f1f5f9',
                  transform: 'translateX(4px)',
                }
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar 
                    sx={{ 
                      bgcolor: CHART_COLORS[i], 
                      width: 48, 
                      height: 48,
                      fontWeight: 700,
                      fontSize: '1.1rem'
                    }}
                  >
                    {item.name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b' }}>
                      {item.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#64748b' }}>
                      Qty: {item.quantity}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: CHART_COLORS[i] }}>
                  {formatCurrency(item.value)}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* Stock Alert Table */}
        <Grid item xs={12}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              border: '1px solid #e2e8f0',
              bgcolor: 'white',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'between', alignItems: 'center', mb: 3 }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b' }}>
                  Stock Alert
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748b' }}>
                  Items requiring immediate attention
                </Typography>
              </Box>
              <Chip 
                label={`${lowStock.length} Items`} 
                size="small" 
                sx={{ 
                  bgcolor: '#fef3c7', 
                  color: '#d97706',
                  fontWeight: 600
                }}
              />
            </Box>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: '#f8fafc' }}>
                  <TableCell sx={{ fontWeight: 700, color: '#475569', borderBottom: '2px solid #e2e8f0' }}>Product Code</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#475569', borderBottom: '2px solid #e2e8f0' }}>Product Name</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#475569', borderBottom: '2px solid #e2e8f0' }}>Warehouse</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700, color: '#475569', borderBottom: '2px solid #e2e8f0' }}>Quantity</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700, color: '#475569', borderBottom: '2px solid #e2e8f0' }}>Alert Quantity</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700, color: '#475569', borderBottom: '2px solid #e2e8f0' }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {lowStock.slice(0, 10).map((item, i) => {
                  const stock = item.stock ?? item.minStock ?? 0;
                  const reorder = item.reorderPoint ?? item.reorderLevel ?? item.minStock ?? 0;
                  const status = stock <= 0 ? 'Out of Stock' : stock <= reorder ? 'Low Stock' : 'OK';
                  const statusColor = stock <= 0 ? 'error' : stock <= reorder ? 'warning' : 'success';
                  
                  return (
                    <TableRow 
                      key={item._id || i} 
                      hover
                      sx={{ 
                        '&:hover': { bgcolor: '#f8fafc' },
                        borderBottom: '1px solid #f1f5f9'
                      }}
                    >
                      <TableCell sx={{ color: '#64748b', fontWeight: 500 }}>
                        {item.SKUcode || item.skuCode || '-'}
                      </TableCell>
                      <TableCell sx={{ color: '#1e293b', fontWeight: 600 }}>
                        {item.productName || item.name || '-'}
                      </TableCell>
                      <TableCell sx={{ color: '#64748b' }}>
                        {item.warehouse?.name || 'Main'}
                      </TableCell>
                      <TableCell align="center">
                        <Chip 
                          label={stock} 
                          size="small"
                          sx={{ 
                            minWidth: 50,
                            fontWeight: 600,
                            bgcolor: stock <= reorder ? '#fef3c7' : '#d1fae5',
                            color: stock <= reorder ? '#d97706' : '#059669'
                          }}
                        />
                      </TableCell>
                      <TableCell align="center" sx={{ color: '#64748b' }}>
                        {reorder}
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={status}
                          size="small"
                          color={statusColor}
                          sx={{ fontWeight: 600, minWidth: 90 }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            {lowStock.length === 0 && (
              <Box sx={{ py: 6, textAlign: 'center' }}>
                <Typography sx={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                  All stock levels are healthy ✓
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Recent Sales */}
        <Grid item xs={12} lg={6}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              border: '1px solid #e2e8f0',
              bgcolor: 'white',
            }}
          >
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b' }}>
                Recent Sales
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748b' }}>
                Latest transactions
              </Typography>
            </Box>
            {recentSales.map((sale, i) => (
              <Box 
                key={sale.id} 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  p: 2,
                  mb: 1.5,
                  borderRadius: 2,
                  border: '1px solid #f1f5f9',
                  transition: 'all 0.2s',
                  '&:hover': {
                    bgcolor: '#f8fafc',
                    borderColor: '#e2e8f0',
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: CHART_COLORS[i % CHART_COLORS.length], width: 40, height: 40 }}>
                    {sale.customer.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b' }}>
                      {sale.customer}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#64748b' }}>
                      {new Date(sale.date).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 700, color: '#059669' }}>
                  {formatCurrency(sale.amount)}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* Top 5 Customers */}
        <Grid item xs={12} lg={6}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              border: '1px solid #e2e8f0',
              bgcolor: 'white',
            }}
          >
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b' }}>
                Top 5 Customers (Returns)
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748b' }}>
                Most valuable customers
              </Typography>
            </Box>
            {[
              { name: 'John Doe', orders: 45, amount: 125000 },
              { name: 'Sarah Smith', orders: 38, amount: 98000 },
              { name: 'Mike Johnson', orders: 32, amount: 87500 },
              { name: 'Emily Davis', orders: 28, amount: 76000 },
              { name: 'David Wilson', orders: 24, amount: 65000 },
            ].map((customer, i) => (
              <Box 
                key={i}
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  p: 2,
                  mb: 1.5,
                  borderRadius: 2,
                  border: '1px solid #f1f5f9',
                  transition: 'all 0.2s',
                  '&:hover': {
                    bgcolor: '#f8fafc',
                    borderColor: '#e2e8f0',
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: CHART_COLORS[i], width: 40, height: 40, fontWeight: 700 }}>
                    {i + 1}
                  </Avatar>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b' }}>
                      {customer.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#64748b' }}>
                      {customer.orders} orders
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 700, color: '#8b5cf6' }}>
                  {formatCurrency(customer.amount)}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;