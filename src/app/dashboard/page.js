'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
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
  ArrowUpward,
  ArrowDownward,
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
} from 'recharts';
import { fetchDashboardData } from '@/lib/dashboardApi';

/* ──────────────────────────────────────────────────────────────────── */
const CHART_COLORS = [
  '#3b6ff4','#0ea66e','#7c5bf1','#f5820d',
  '#0891b2','#db2777','#d97706','#0d9488',
];

const formatCurrency = (n) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency', currency: 'INR', maximumFractionDigits: 0,
  }).format(Number(n) || 0);

const getMonthKey = (d) => {
  const dt = new Date(d);
  return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}`;
};

const cardStyle = {
  bgcolor: '#fff',
  borderRadius: '14px',
  border: '1px solid #e2e8f4',
  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  overflow: 'hidden',
};

/* ── Tooltip ── */
const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background:'#fff', border:'1px solid #e2e8f4', borderRadius:10, padding:'10px 16px', boxShadow:'0 8px 24px rgba(0,0,0,0.1)', fontSize:13 }}>
      <p style={{ color:'#8896b8', marginBottom:6, fontWeight:600, marginTop:0 }}>{label}</p>
      {payload.map((p,i) => (
        <p key={i} style={{ color:'#4a5578', margin:'3px 0', fontWeight:600 }}>
          <span style={{ color:p.color }}>{p.name}</span>: {formatCurrency(p.value)}
        </p>
      ))}
    </div>
  );
};

/* ── KPI Card ── */
const KpiCard = ({ kpi }) => {
  const Icon = kpi.icon;
  return (
    <Card elevation={0} sx={{
      ...cardStyle,
      height: '100%',
      transition: 'all 0.25s ease',
      cursor: 'default',
      '&:hover': { transform:'translateY(-4px)', boxShadow:'0 8px 28px rgba(0,0,0,0.12)', borderColor: kpi.color+'60' },
    }}>
      <CardContent sx={{ p:3, '&:last-child':{ pb:3 } }}>
        <Box sx={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', mb:2.5 }}>
          <Box sx={{ width:54, height:54, borderRadius:'14px', bgcolor:kpi.lightColor, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <Icon sx={{ fontSize:27, color:kpi.color }} />
          </Box>
          {kpi.trend !== undefined && (
            <Box sx={{ display:'flex', alignItems:'center', gap:0.3, px:1.2, py:0.5, borderRadius:'20px', bgcolor: kpi.trend >= 0 ? '#e6f9f2' : '#fff0f0' }}>
              {kpi.trend >= 0
                ? <ArrowUpward sx={{ fontSize:12, color:'#0ea66e' }} />
                : <ArrowDownward sx={{ fontSize:12, color:'#e84646' }} />}
              <Typography sx={{ fontSize:12, fontWeight:700, color: kpi.trend >= 0 ? '#0ea66e' : '#e84646' }}>
                {Math.abs(kpi.trend)}%
              </Typography>
            </Box>
          )}
        </Box>
        <Typography sx={{ fontSize:'0.72rem', fontWeight:700, color:'#8896b8', letterSpacing:0.8, textTransform:'uppercase', mb:0.8 }}>
          {kpi.label}
        </Typography>
        <Typography sx={{ fontSize:'1.8rem', fontWeight:800, color:'#1a2035', letterSpacing:-0.5, lineHeight:1.15, mb:0.6 }}>
          {kpi.value}
        </Typography>
        <Box sx={{ display:'flex', alignItems:'center', gap:0.7 }}>
          <Box sx={{ width:7, height:7, borderRadius:'50%', bgcolor:kpi.color }} />
          <Typography sx={{ fontSize:'0.75rem', color:'#8896b8' }}>{kpi.subtitle}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

/* ── Section Title ── */
const SectionTitle = ({ title, sub, action }) => (
  <Box sx={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', mb:2 }}>
    <Box>
      <Typography sx={{ fontWeight:800, fontSize:'1rem', color:'#1a2035', letterSpacing:-0.2 }}>{title}</Typography>
      {sub && <Typography sx={{ fontSize:'0.72rem', color:'#8896b8', mt:0.3 }}>{sub}</Typography>}
    </Box>
    {action || null}
  </Box>
);

/* ══════════════════ DASHBOARD ══════════════════ */
export default function Dashboard() {
  const [data, setData]                       = useState(null);
  const [loading, setLoading]                 = useState(true);
  const [error, setError]                     = useState('');
  const [dateRange, setDateRange]             = useState('90');
  const [warehouseFilter, setWarehouseFilter] = useState('all');

  useEffect(() => {
    fetchDashboardData()
      .then(setData)
      .catch((e) => setError(e.message || 'Failed to load dashboard'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <Box sx={{ display:'flex', justifyContent:'center', alignItems:'center', minHeight:'100vh', bgcolor:'#f0f2f8' }}>
      <Box sx={{ textAlign:'center' }}>
        <CircularProgress size={48} sx={{ color:'#3b6ff4' }} />
        <Typography sx={{ color:'#8896b8', mt:2, fontSize:14 }}>Loading dashboard…</Typography>
      </Box>
    </Box>
  );

  if (error) return (
    <Box sx={{ p:3, bgcolor:'#f0f2f8', minHeight:'100vh' }}>
      <Alert severity="error" onClose={() => setError('')}>{error}</Alert>
    </Box>
  );

  /* ── derived data ── */
  const items          = data?.items          || [];
  const lowStock       = data?.lowStockItems  || [];
  const warehouses     = data?.warehouses     || [];
  const salesOrders    = data?.salesOrders    || [];
  const purchaseOrders = data?.purchaseOrders || [];
  const expenses       = data?.expenses       || [];
  const income         = data?.income         || [];

  const days   = parseInt(dateRange, 10) || 90;
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);

  const filterByDate = (list) =>
    list.filter((x) => {
      const d = x.orderDate || x.invoiceDate || x.date || x.createdAt;
      return d && new Date(d) >= cutoff;
    });

  const filteredSales     = filterByDate(salesOrders);
  const filteredPurchases = filterByDate(purchaseOrders);
  const filteredExpenses  = filterByDate(expenses);
  const filteredIncome    = filterByDate(income);

  const totalSales     = filteredSales.reduce((s,o) => s + (o.totalAmount ?? o.orderTotal ?? 0), 0);
  const totalPurchases = filteredPurchases.reduce((s,o) => s + (o.totalAmount ?? o.orderTotal ?? 0), 0);
  const totalExpenses  = filteredExpenses.reduce((s,e) => s + (e.amount ?? 0), 0);
  const totalIncome    = filteredIncome.reduce((s,i) => s + (i.amount ?? 0), 0);
  const inventoryValue = items.reduce((s,i) => {
    const qty  = i.stock ?? i.quantity ?? 0;
    const cost = i.purchasePrice ?? i.cost ?? i.sellingPrice ?? 0;
    return s + qty * cost;
  }, 0);

  /* monthly trend */
  const monthMap = {};
  filteredSales.forEach((o) => {
    const k = getMonthKey(o.orderDate || o.createdAt);
    if (!monthMap[k]) monthMap[k] = { month:k, sales:0, purchases:0 };
    monthMap[k].sales += o.totalAmount ?? o.orderTotal ?? 0;
  });
  filteredPurchases.forEach((o) => {
    const k = getMonthKey(o.orderDate || o.createdAt);
    if (!monthMap[k]) monthMap[k] = { month:k, sales:0, purchases:0 };
    monthMap[k].purchases += o.totalAmount ?? o.orderTotal ?? 0;
  });
  const trendData = Object.values(monthMap).sort((a,b) => a.month.localeCompare(b.month));

  /* top products */
  const topProducts = [...items]
    .sort((a,b) => (b.stock??0)*(b.sellingPrice??0) - (a.stock??0)*(a.sellingPrice??0))
    .slice(0,5)
    .map((i) => ({
      name:     i.productName || i.name || 'Product',
      value:    (i.stock??0)*(i.sellingPrice??0) || 0,
      quantity: i.stock ?? 0,
    }));

  /* payment methods */
  const salesByPayment = [
    { name:'Cash',   value:35000 },
    { name:'Card',   value:45000 },
    { name:'UPI',    value:32000 },
    { name:'Wallet', value:18000 },
  ];
  const payTotal = salesByPayment.reduce((s,x) => s+x.value, 0);

  /* recent sales */
  const recentSales = filteredSales.slice(0,5).map((sale,i) => ({
    id:       sale._id || i,
    customer: sale.customerName || 'Customer',
    amount:   sale.totalAmount  || sale.orderTotal || 0,
    date:     sale.orderDate    || sale.createdAt,
  }));

  /* KPIs */
  const kpiCards = [
    { label:'Total Products',   value: items.length,                                subtitle:'Active SKUs',           icon:Inventory2Outlined,    color:'#3b6ff4', lightColor:'#eef2ff', trend:4  },
    { label:'Low Stock Alerts', value: lowStock.length,                             subtitle:'Needs reorder',          icon:WarningAmberOutlined,  color:'#d97706', lightColor:'#fffbeb', trend:-2 },
    { label:'All Orders',       value: filteredSales.length,                        subtitle:`Last ${days} days`,      icon:ShoppingCartOutlined,  color:'#0ea66e', lightColor:'#e6f9f2', trend:12 },
    { label:'Total Sales',      value: formatCurrency(totalSales),                  subtitle:`Last ${days} days`,      icon:TrendingUpOutlined,    color:'#7c5bf1', lightColor:'#f3f0ff', trend:8  },
    { label:'All Purchases',    value: formatCurrency(totalPurchases),              subtitle:`Last ${days} days`,      icon:LocalShippingOutlined, color:'#f5820d', lightColor:'#fff4e6', trend:-3 },
    { label:'Gross Revenue',    value: formatCurrency(totalIncome),                 subtitle:'All income sources',     icon:AttachMoneyOutlined,   color:'#0d9488', lightColor:'#f0fdfa', trend:6  },
    { label:'Net Profit',       value: formatCurrency(totalIncome - totalExpenses), subtitle:'After expenses',         icon:ReceiptOutlined,       color:'#db2777', lightColor:'#fdf2f8', trend:5  },
    { label:'Inventory Value',  value: formatCurrency(inventoryValue),              subtitle:'Total stock worth',      icon:StoreOutlined,         color:'#0891b2', lightColor:'#e0f7fa'            },
  ];

  const selectSx = {
    '& .MuiOutlinedInput-root': {
      bgcolor:'#fff', borderRadius:'10px', fontSize:13,
      '& fieldset':{ borderColor:'#e2e8f4' },
      '&:hover fieldset':{ borderColor:'#3b6ff4' },
      '&.Mui-focused fieldset':{ borderColor:'#3b6ff4' },
    },
    '& .MuiInputLabel-root':{ fontSize:13 },
  };

  /* ════════════ RENDER ════════════ */
  return (
    <Box sx={{ width:'100%', minHeight:'100vh', bgcolor:'#f0f2f8', p:{ xs:2, md:3 }, boxSizing:'border-box' }}>

      {/* ── Header ── */}
      <Box sx={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:2, mb:3 }}>
        <Box>
          <Box sx={{ display:'flex', alignItems:'center', gap:1.5, mb:0.5 }}>
            <Box sx={{ width:5, height:28, borderRadius:3, background:'linear-gradient(180deg,#3b6ff4,#7c5bf1)' }} />
            <Typography sx={{ fontSize:'1.5rem', fontWeight:800, color:'#1a2035', letterSpacing:-0.5 }}>
              Dashboard
            </Typography>
          </Box>
          <Typography sx={{ fontSize:'0.8rem', color:'#8896b8', ml:'21px' }}>
            Welcome back — here's your business at a glance
          </Typography>
        </Box>
        <Box sx={{ display:'flex', gap:1.5, flexWrap:'wrap' }}>
          <FormControl size="small" sx={{ minWidth:145, ...selectSx }}>
            <InputLabel>Date Range</InputLabel>
            <Select value={dateRange} label="Date Range" onChange={(e) => setDateRange(e.target.value)}>
              <MenuItem value="7">Last 7 days</MenuItem>
              <MenuItem value="30">Last 30 days</MenuItem>
              <MenuItem value="90">Last 90 days</MenuItem>
              <MenuItem value="365">Last Year</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth:165, ...selectSx }}>
            <InputLabel>Warehouse</InputLabel>
            <Select value={warehouseFilter} label="Warehouse" onChange={(e) => setWarehouseFilter(e.target.value)}>
              <MenuItem value="all">All Warehouses</MenuItem>
              {warehouses.map((w) => (
                <MenuItem key={w._id} value={w._id}>{w.name || w.warehouseName}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* ── KPI Cards — CSS Grid, 4 cols on desktop ── */}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs:'1fr', sm:'repeat(2,1fr)', md:'repeat(4,1fr)' },
        gap: '20px',
        mb: 3,
      }}>
        {kpiCards.map((kpi,i) => <KpiCard key={i} kpi={kpi} />)}
      </Box>

      {/* ── Row 1: Bar Chart (66%) + Donut (33%) ── */}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs:'1fr', md:'2fr 1fr' },
        gap: '20px',
        mb: '20px',
      }}>
        {/* Bar Chart */}
        <Paper elevation={0} sx={{ ...cardStyle, p:3 }}>
          <SectionTitle title="Sales & Purchases" sub="Monthly trend comparison" />
          <Box sx={{ width:'100%', height:340 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trendData} margin={{ top:5, right:10, left:0, bottom:0 }} barCategoryGap="32%">
                <defs>
                  <linearGradient id="gSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor="#3b6ff4" stopOpacity={1}   />
                    <stop offset="100%" stopColor="#3b6ff4" stopOpacity={0.3} />
                  </linearGradient>
                  <linearGradient id="gPurch" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor="#0ea66e" stopOpacity={1}   />
                    <stop offset="100%" stopColor="#0ea66e" stopOpacity={0.3} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#edf0f7" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize:12, fill:'#8896b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize:12, fill:'#8896b8' }} axisLine={false} tickLine={false} tickFormatter={(v) => '₹'+(v/1000).toFixed(0)+'k'} />
                <Tooltip content={<ChartTooltip />} cursor={{ fill:'rgba(0,0,0,0.02)' }} />
                <Legend iconType="circle" iconSize={9} wrapperStyle={{ paddingTop:14, fontSize:13, color:'#4a5578' }} />
                <Bar dataKey="sales"     name="Sales"     fill="url(#gSales)" radius={[6,6,0,0]} maxBarSize={36} />
                <Bar dataKey="purchases" name="Purchases" fill="url(#gPurch)" radius={[6,6,0,0]} maxBarSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Paper>

        {/* Donut Chart */}
        <Paper elevation={0} sx={{ ...cardStyle, p:3, display:'flex', flexDirection:'column' }}>
          <SectionTitle title="Top Products" sub="By inventory value" />
          {topProducts.length > 0 ? (
            <>
              <Box sx={{ width:'100%', height:200 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={topProducts} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={55} outerRadius={88} paddingAngle={3} stroke="none">
                      {topProducts.map((_,i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
                    </Pie>
                    <Tooltip content={<ChartTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
              <Box sx={{ mt:2 }}>
                {topProducts.slice(0,4).map((p,i) => (
                  <Box key={i} sx={{ display:'flex', justifyContent:'space-between', alignItems:'center', py:0.9, borderBottom: i<3 ? '1px solid #e2e8f4' : 'none' }}>
                    <Box sx={{ display:'flex', alignItems:'center', gap:1.2 }}>
                      <Box sx={{ width:10, height:10, borderRadius:'50%', bgcolor:CHART_COLORS[i], flexShrink:0 }} />
                      <Typography sx={{ fontSize:12.5, color:'#4a5578', maxWidth:110, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                        {p.name}
                      </Typography>
                    </Box>
                    <Typography sx={{ fontSize:12.5, fontWeight:700, color:'#1a2035' }}>{formatCurrency(p.value)}</Typography>
                  </Box>
                ))}
              </Box>
            </>
          ) : (
            <Box sx={{ display:'flex', alignItems:'center', justifyContent:'center', flex:1 }}>
              <Typography sx={{ color:'#8896b8', fontSize:13 }}>No product data</Typography>
            </Box>
          )}
        </Paper>
      </Box>

      {/* ── Row 2: Payment Methods (5) + Stock Value (7) ── */}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs:'1fr', md:'5fr 7fr' },
        gap: '20px',
        mb: '20px',
      }}>
        {/* Payment Methods */}
        <Paper elevation={0} sx={{ ...cardStyle, p:3 }}>
          <SectionTitle title="Sales by Payment" sub="Method breakdown" />
          {salesByPayment.map((item,i) => {
            const pct = ((item.value / payTotal) * 100).toFixed(1);
            return (
              <Box key={i} sx={{ mb:2.5 }}>
                <Box sx={{ display:'flex', justifyContent:'space-between', alignItems:'center', mb:0.9 }}>
                  <Box sx={{ display:'flex', alignItems:'center', gap:1.5 }}>
                    <Box sx={{ width:34, height:34, borderRadius:'9px', bgcolor:CHART_COLORS[i]+'14', display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <Box sx={{ width:10, height:10, borderRadius:'50%', bgcolor:CHART_COLORS[i] }} />
                    </Box>
                    <Typography sx={{ fontSize:13.5, fontWeight:600, color:'#4a5578' }}>{item.name}</Typography>
                  </Box>
                  <Box sx={{ textAlign:'right' }}>
                    <Typography sx={{ fontSize:13.5, fontWeight:800, color:'#1a2035' }}>{formatCurrency(item.value)}</Typography>
                    <Typography sx={{ fontSize:11.5, color:'#8896b8' }}>{pct}%</Typography>
                  </Box>
                </Box>
                <Box sx={{ height:8, bgcolor:CHART_COLORS[i]+'14', borderRadius:4, overflow:'hidden' }}>
                  <Box sx={{ height:'100%', width:`${pct}%`, borderRadius:4, background:`linear-gradient(90deg,${CHART_COLORS[i]},${CHART_COLORS[i]}cc)` }} />
                </Box>
              </Box>
            );
          })}
        </Paper>

        {/* Top Stock Value */}
        <Paper elevation={0} sx={{ ...cardStyle, p:3 }}>
          <SectionTitle title="Top Stock Value" sub="Highest value inventory items" />
          {topProducts.slice(0,4).map((item,i) => {
            const maxVal = topProducts[0]?.value || 1;
            const pct    = ((item.value / maxVal) * 100).toFixed(0);
            return (
              <Box key={i} sx={{
                display:'flex', alignItems:'center', gap:2,
                p:2, mb:1.5, borderRadius:'12px',
                border:'1px solid #e2e8f4',
                transition:'all 0.2s',
                '&:hover':{ borderColor:CHART_COLORS[i]+'50', bgcolor:CHART_COLORS[i]+'04', transform:'translateX(4px)' },
              }}>
                <Box sx={{ width:46, height:46, borderRadius:'12px', bgcolor:CHART_COLORS[i]+'14', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, fontWeight:800, color:CHART_COLORS[i], flexShrink:0 }}>
                  {item.name.charAt(0)}
                </Box>
                <Box sx={{ flex:1, minWidth:0 }}>
                  <Box sx={{ display:'flex', justifyContent:'space-between', mb:0.7 }}>
                    <Typography sx={{ fontSize:13, fontWeight:700, color:'#1a2035', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', mr:1 }}>
                      {item.name}
                    </Typography>
                    <Typography sx={{ fontSize:13, fontWeight:800, color:CHART_COLORS[i], flexShrink:0 }}>
                      {formatCurrency(item.value)}
                    </Typography>
                  </Box>
                  <Box sx={{ display:'flex', alignItems:'center', gap:1.5 }}>
                    <Box sx={{ flex:1, height:5, bgcolor:CHART_COLORS[i]+'18', borderRadius:3, overflow:'hidden' }}>
                      <Box sx={{ height:'100%', width:`${pct}%`, bgcolor:CHART_COLORS[i], borderRadius:3 }} />
                    </Box>
                    <Typography sx={{ fontSize:11.5, color:'#8896b8', flexShrink:0 }}>Qty: {item.quantity}</Typography>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Paper>
      </Box>

      {/* ── Stock Alerts Table — full width ── */}
      <Paper elevation={0} sx={{ ...cardStyle, p:3, mb:'20px' }}>
        <SectionTitle
          title="Stock Alerts"
          sub="Items requiring immediate attention"
          action={
            <Chip
              label={`${lowStock.length} Items`} size="small"
              sx={{ bgcolor:'#fffbeb', color:'#d97706', fontWeight:700, fontSize:11.5, height:24, border:'1px solid #d9770630' }}
            />
          }
        />
        <Box sx={{ overflowX:'auto' }}>
          <Table size="small" sx={{ minWidth:640, width:'100%' }}>
            <TableHead>
              <TableRow>
                {['Product Code','Product Name','Warehouse','Quantity','Alert Qty','Status'].map((h) => (
                  <TableCell key={h} sx={{ color:'#8896b8', fontWeight:700, fontSize:'0.68rem', textTransform:'uppercase', letterSpacing:0.5, borderBottom:'2px solid #e2e8f4', bgcolor:'#f6f8fd', py:1.4, whiteSpace:'nowrap' }}>
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {lowStock.slice(0,10).map((item,i) => {
                const stock   = item.stock ?? item.minStock ?? 0;
                const reorder = item.reorderPoint ?? item.reorderLevel ?? item.minStock ?? 0;
                const isOut   = stock <= 0;
                const isLow   = !isOut && stock <= reorder;
                const statusLabel = isOut ? 'Out of Stock' : isLow ? 'Low Stock' : 'In Stock';
                const statusColor = isOut ? '#e84646' : isLow ? '#d97706' : '#0ea66e';
                const statusBg    = isOut ? '#fff0f0' : isLow ? '#fffbeb' : '#e6f9f2';
                return (
                  <TableRow key={item._id || i} sx={{ '&:hover td':{ bgcolor:'#f6f8fd' }, '& td':{ borderBottom:'1px solid #e2e8f4', py:1.4 } }}>
                    <TableCell sx={{ color:'#8896b8', fontWeight:500, fontSize:13 }}>{item.SKUcode || item.skuCode || '—'}</TableCell>
                    <TableCell sx={{ color:'#1a2035', fontWeight:700, fontSize:13 }}>{item.productName || item.name || '—'}</TableCell>
                    <TableCell sx={{ color:'#4a5578', fontSize:13 }}>{item.warehouse?.name || 'Main'}</TableCell>
                    <TableCell>
                      <Box sx={{ display:'inline-flex', alignItems:'center', justifyContent:'center', minWidth:36, px:1.3, py:0.4, borderRadius:'7px', bgcolor:statusBg, color:statusColor, fontWeight:700, fontSize:13 }}>
                        {stock}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ color:'#4a5578', fontSize:13 }}>{reorder}</TableCell>
                    <TableCell>
                      <Box sx={{ display:'inline-flex', alignItems:'center', px:1.3, py:0.4, borderRadius:'7px', bgcolor:statusBg, color:statusColor, fontWeight:700, fontSize:11.5, border:`1px solid ${statusColor}30`, whiteSpace:'nowrap' }}>
                        {statusLabel}
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
        {lowStock.length === 0 && (
          <Box sx={{ py:6, textAlign:'center' }}>
            <Typography sx={{ color:'#8896b8', fontSize:13 }}>✓ All stock levels are healthy</Typography>
          </Box>
        )}
      </Paper>

      {/* ── Bottom Row: Recent Sales + Top Customers ── */}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs:'1fr', md:'1fr 1fr' },
        gap: '20px',
      }}>
        {/* Recent Sales */}
        <Paper elevation={0} sx={{ ...cardStyle, p:3 }}>
          <SectionTitle title="Recent Sales" sub="Latest transactions" />
          {recentSales.length > 0 ? recentSales.map((sale,i) => (
            <Box key={sale.id} sx={{
              display:'flex', justifyContent:'space-between', alignItems:'center',
              p:1.5, mb:1, borderRadius:'12px', border:'1px solid #e2e8f4',
              transition:'all 0.2s',
              '&:hover':{ bgcolor:'#f6f8fd', borderColor:CHART_COLORS[i % CHART_COLORS.length]+'50' },
            }}>
              <Box sx={{ display:'flex', alignItems:'center', gap:1.5 }}>
                <Avatar sx={{ bgcolor:CHART_COLORS[i % CHART_COLORS.length]+'18', color:CHART_COLORS[i % CHART_COLORS.length], width:42, height:42, fontSize:15, fontWeight:800 }}>
                  {sale.customer.charAt(0)}
                </Avatar>
                <Box>
                  <Typography sx={{ fontSize:13.5, fontWeight:700, color:'#1a2035' }}>{sale.customer}</Typography>
                  <Typography sx={{ fontSize:11.5, color:'#8896b8' }}>
                    {sale.date ? new Date(sale.date).toLocaleDateString('en-IN') : '—'}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ px:1.5, py:0.5, borderRadius:'8px', bgcolor:'#e6f9f2', border:'1px solid #0ea66e30' }}>
                <Typography sx={{ fontSize:13.5, fontWeight:800, color:'#0ea66e' }}>{formatCurrency(sale.amount)}</Typography>
              </Box>
            </Box>
          )) : (
            <Typography sx={{ color:'#8896b8', fontSize:13 }}>No recent sales</Typography>
          )}
        </Paper>

        {/* Top Customers */}
        <Paper elevation={0} sx={{ ...cardStyle, p:3 }}>
          <SectionTitle title="Top Customers" sub="Most valuable buyers" />
          {[
            { name:'John Doe',     orders:45, amount:125000 },
            { name:'Sarah Smith',  orders:38, amount:98000  },
            { name:'Mike Johnson', orders:32, amount:87500  },
            { name:'Emily Davis',  orders:28, amount:76000  },
            { name:'David Wilson', orders:24, amount:65000  },
          ].map((c,i) => (
            <Box key={i} sx={{
              display:'flex', alignItems:'center', gap:2,
              p:1.5, mb:1, borderRadius:'12px', border:'1px solid #e2e8f4',
              transition:'all 0.2s',
              '&:hover':{ bgcolor:'#f6f8fd', borderColor:CHART_COLORS[i]+'50' },
            }}>
              <Box sx={{ width:38, height:38, borderRadius:'10px', bgcolor:CHART_COLORS[i]+'14', display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, fontWeight:800, color:CHART_COLORS[i], flexShrink:0 }}>
                {i + 1}
              </Box>
              <Box sx={{ flex:1, minWidth:0 }}>
                <Typography sx={{ fontSize:13.5, fontWeight:700, color:'#1a2035' }}>{c.name}</Typography>
                <Typography sx={{ fontSize:11.5, color:'#8896b8' }}>{c.orders} orders</Typography>
              </Box>
              <Typography sx={{ fontSize:14, fontWeight:800, color:CHART_COLORS[i] }}>{formatCurrency(c.amount)}</Typography>
            </Box>
          ))}
        </Paper>
      </Box>

    </Box>
  );
}