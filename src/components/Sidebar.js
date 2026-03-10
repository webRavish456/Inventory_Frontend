'use client';

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import DashboardOutlined from "@mui/icons-material/DashboardOutlined";
import PeopleOutlined from "@mui/icons-material/PeopleOutlined";
import Inventory2Outlined from "@mui/icons-material/Inventory2Outlined";
import PersonOutlined from "@mui/icons-material/PersonOutlined";
import LocalShippingOutlined from "@mui/icons-material/LocalShippingOutlined";
import WarehouseOutlined from "@mui/icons-material/WarehouseOutlined";
import InventoryOutlined from "@mui/icons-material/InventoryOutlined";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import PointOfSaleOutlined from "@mui/icons-material/PointOfSaleOutlined";
import AssessmentOutlined from "@mui/icons-material/AssessmentOutlined";
import ReportProblemOutlined from "@mui/icons-material/ReportProblemOutlined";
import ReceiptOutlined from "@mui/icons-material/ReceiptOutlined";
import AccountBalanceOutlined from "@mui/icons-material/AccountBalanceOutlined";
import AnalyticsOutlined from "@mui/icons-material/AnalyticsOutlined";
import SecurityOutlined from "@mui/icons-material/SecurityOutlined";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import VerticalShadesIcon from "@mui/icons-material/VerticalShades";

const EXPANDED_W  = 256;
const COLLAPSED_W = 64;

const MenuItems = [
  { icon: DashboardOutlined,     label: "Dashboard",           href: "/dashboard" },
  { icon: PeopleOutlined,        label: "Staff",               href: "/staff" },
  {
    icon: WarehouseOutlined,     label: "Warehouse",           href: "/warehouse/setup",
    item: [
      { label: "Multi-Warehouse Setup", href: "/warehouse/setup" },
      { label: "Capacity Planning",     href: "/warehouse/capacity" },
      { label: "Bin & Rack Management", href: "/warehouse/bin-rack" },
    ],
  },
  { icon: LocalShippingOutlined, label: "Supplier",            href: "/supplier" },
  { icon: VerticalShadesIcon,    label: "Branch",              href: "/branch" },
  {
    icon: Inventory2Outlined,    label: "Item Management",     href: "/item/all-products",
    item: [
      { label: "All Products",            href: "/item/all-products" },
      { label: "Categories",              href: "/item/categories" },
      { label: "Subcategories",           href: "/item/subcategories" },
      { label: "Batch & Serial Tracking", href: "/item/batch-serial" },
      { label: "HSN/SAC Codes",           href: "/item/hsn-sac" },
    ],
  },
  { icon: PersonOutlined,        label: "Customer",            href: "/customer" },
  {
    icon: InventoryOutlined,     label: "Stock Management",    href: "/stock/in-out",
    item: [
      { label: "Stock In/Out",       href: "/stock/in-out" },
      { label: "Opening Stock",      href: "/stock/opening" },
      { label: "Real-Time Updates",  href: "/stock/real-time" },
      { label: "Stock Transfer",     href: "/stock/transfer" },
    ],
  },
  {
    icon: ShoppingCartOutlined,  label: "Purchase",            href: "/purchase/purchase-orders",
    item: [
      { label: "Purchase Orders",      href: "/purchase/purchase-orders" },
      { label: "Purchase Returns",     href: "/purchase/purchase-returns" },
      { label: "Pending Orders",       href: "/purchase/pending-orders" },
      { label: "Cost Price Tracking",  href: "/purchase/cost-tracking" },
      { label: "Goods Receipt Note",   href: "/purchase/goods-receipt-note" },
    ],
  },
  {
    icon: PointOfSaleOutlined,   label: "Sales & Orders",      href: "/sales/orders",
    item: [
      { label: "Sales Orders",      href: "/sales/orders" },
      { label: "Sales Returns",     href: "/sales/sales-returns" },
      { label: "Order Tracking",    href: "/sales/order-tracking" },
      { label: "Delivery Challans", href: "/sales/delivery-challans" },
    ],
  },
  {
    icon: AssessmentOutlined,    label: "Valuation",           href: "/valuation/fifo",
    item: [
      { label: "FIFO/LIFO/Weighted Avg", href: "/valuation/fifo-lifo-weighted" },
      { label: "Dead Stock",             href: "/valuation/dead-stock" },
      { label: "COGS",                   href: "/valuation/cogs" },
    ],
  },
  {
    icon: ReportProblemOutlined, label: "Damage Tracking",     href: "/damage/write-off",
    item: [
      { label: "Stock Write-Off",       href: "/damage/write-off" },
      { label: "Attach Receipts/Bills", href: "/damage/receipts" },
    ],
  },
  { icon: ReceiptOutlined,       label: "Invoices",            href: "/invoices" },
  {
    icon: AccountBalanceOutlined, label: "Finance",            href: "/finance/expense",
    item: [
      { label: "Expense", href: "/finance/expense" },
      { label: "Income",  href: "/finance/income" },
    ],
  },
  {
    icon: AnalyticsOutlined,     label: "Reports & Analytics", href: "/reports/summary",
    item: [
      { label: "Stock Summary",    href: "/reports/summary" },
      { label: "Item-Wise Sales",  href: "/reports/item-sales" },
      { label: "Stock Aging",      href: "/reports/stock-aging" },
      { label: "Valuation Report", href: "/reports/valuation" },
    ],
  },
  { icon: SecurityOutlined,      label: "Roles & Permissions", href: "/roles-permissions" },
];

function CollapsedTooltip({ item, anchorEl, visible }) {
  const [top, setTop] = useState(0);
  useEffect(() => {
    if (visible && anchorEl) {
      const rect = anchorEl.getBoundingClientRect();
      setTop(rect.top);
    }
  }, [visible, anchorEl]);

  if (!visible || !item?.item) return null;
  return (
    <div style={{
      position: 'fixed', left: COLLAPSED_W + 6, top, zIndex: 9999,
      background: '#ffffff', borderRadius: '10px',
      boxShadow: '0 8px 28px rgba(0,0,0,0.13), 0 1px 4px rgba(0,0,0,0.07)',
      minWidth: '200px', border: '1px solid #e4e8f0', overflow: 'hidden',
      animation: 'sbTooltipIn 0.14s ease',
    }}>
      <div style={{
        padding: '9px 14px 7px', borderBottom: '1px solid #f0f2f7',
        fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.11em',
        textTransform: 'uppercase', color: '#1565c0', fontFamily: 'DM Sans, sans-serif',
      }}>
        {item.label}
      </div>
      {item.item.map((sub, i) => (
        <Link key={i} href={sub.href} style={{
          display: 'block', padding: '8px 16px', fontSize: '0.84rem',
          color: '#374151', textDecoration: 'none', fontFamily: 'DM Sans, sans-serif',
          transition: 'background 0.13s, color 0.13s',
        }}
          onMouseEnter={e => { e.currentTarget.style.background = '#eef4ff'; e.currentTarget.style.color = '#1565c0'; }}
          onMouseLeave={e => { e.currentTarget.style.background = ''; e.currentTarget.style.color = '#374151'; }}
        >
          {sub.label}
        </Link>
      ))}
    </div>
  );
}

const Sidebar = ({ collapsed, onToggle }) => {
  const pathname = usePathname();
  const [openIndex,    setOpenIndex]    = useState(null);
  const [tooltipIndex, setTooltipIndex] = useState(null);
  const itemEls = useRef({});

  useEffect(() => {
    MenuItems.forEach((item, idx) => {
      if (item.item?.some(s => s.href === pathname)) setOpenIndex(idx);
    });
  }, [pathname]);

  const isActive = (item) =>
    item.href === pathname || item.item?.some(s => s.href === pathname);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');

        @keyframes sbTooltipIn {
          from { opacity:0; transform:translateX(-5px); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes sbSubmenuIn {
          from { opacity:0; transform:translateY(-4px); }
          to   { opacity:1; transform:translateY(0); }
        }

        .sb {
          height: 100vh;
          display: flex;
          flex-direction: column;
          background: #ffffff;
          border-right: 1px solid #e4e8f0;
          box-shadow: 2px 0 12px rgba(0,0,0,0.06);
          font-family: 'DM Sans', sans-serif;
          overflow: hidden;
          transition: width 0.26s cubic-bezier(0.4,0,0.2,1);
        }

        .sb-header {
          height: 64px;
          flex-shrink: 0;
          border-bottom: 1px solid #e4e8f0;
          display: flex;
          align-items: center;
          background: #ffffff;
          overflow: hidden;
          padding-right: 10px;
          gap: 6px;
        }

        /* ── Logo wrapper: relative + sized so Next.js Image fill works ── */
        .sb-logo-wrap-expanded {
          position: relative;
          flex: 1;
          height: 44px;
          min-width: 0;
          margin-left: 12px;
        }
        .sb-logo-wrap-collapsed {
          position: relative;
          width: 36px;
          height: 36px;
          flex-shrink: 0;
        }

        .sb-toggle-btn {
          width: 26px;
          height: 26px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f0f4ff;
          border: 1px solid #d0daf5;
          border-radius: 6px;
          cursor: pointer;
          color: #1565c0;
          transition: background 0.18s, color 0.18s;
        }
        .sb-toggle-btn:hover { background: #1565c0; color: #ffffff; border-color: #1565c0; }

        .sb-nav { flex: 1; overflow-y: auto; overflow-x: hidden; padding: 8px 0; }
        .sb-nav::-webkit-scrollbar { width: 3px; }
        .sb-nav::-webkit-scrollbar-track { background: transparent; }
        .sb-nav::-webkit-scrollbar-thumb { background: #d0daf5; border-radius: 4px; }

        .sb-item { position: relative; }

        .sb-row {
          display: flex; align-items: center;
          height: 42px; margin: 1px 8px; padding: 0 10px;
          border-radius: 8px; cursor: pointer; text-decoration: none;
          color: #4b5675; font-size: 0.875rem; font-weight: 400;
          white-space: nowrap; overflow: hidden;
          transition: background 0.16s, color 0.16s;
          position: relative; gap: 10px;
        }
        .sb-row:hover { background: #eef4ff; color: #1565c0; }
        .sb-row.sb-active { background: #e8f0fe; color: #1565c0; font-weight: 600; }
        .sb-row.sb-active::before {
          content: ''; position: absolute;0
          left: 0; top: 20%; height: 60%; width: 3px;
          background: #1565c0; border-radius: 0 3px 3px 0;
        }

        .sb-icon { width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: inherit; }

        .sb-label { flex: 1; overflow: hidden; text-overflow: ellipsis; min-width: 0; transition: opacity 0.16s, max-width 0.16s; opacity: 1; max-width: 200px; }
        .sb-label.sb-hidden { opacity: 0; max-width: 0; pointer-events: none; }

        .sb-arrow { width: 18px; height: 18px; flex-shrink: 0; color: #94a3b8; transition: transform 0.22s ease, opacity 0.16s; opacity: 1; }
        .sb-arrow.sb-open { transform: rotate(180deg); }
        .sb-arrow.sb-hidden { opacity: 0; max-width: 0; }

        .sb-submenu { overflow: hidden; animation: sbSubmenuIn 0.18s ease; }
        .sb-sub-row {
          display: flex; align-items: center;
          height: 36px; margin: 1px 8px 1px 20px; padding: 0 10px 0 24px;
          border-radius: 7px; text-decoration: none;
          font-size: 0.825rem; color: #64748b; white-space: nowrap;
          transition: background 0.14s, color 0.14s; position: relative; gap: 8px;
        }
        .sb-sub-row::before { content: ''; width: 5px; height: 5px; border-radius: 50%; background: #cbd5e1; flex-shrink: 0; transition: background 0.14s; }
        .sb-sub-row:hover { background: #f0f6ff; color: #1565c0; }
        .sb-sub-row:hover::before { background: #1565c0; }
        .sb-sub-row.sb-active { color: #1565c0; font-weight: 600; }
        .sb-sub-row.sb-active::before { background: #1565c0; }

        .sb-footer { border-top: 1px solid #e4e8f0; padding: 10px 8px; flex-shrink: 0; }
        .sb-user-row { display: flex; align-items: center; gap: 10px; padding: 8px; border-radius: 8px; background: #f5f7ff; border: 1px solid #e4e8f0; overflow: hidden; }
        .sb-user-avatar { width: 32px; height: 32px; background: linear-gradient(135deg, #1565c0, #0d47a1); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 700; font-size: 0.8rem; flex-shrink: 0; box-shadow: 0 2px 6px rgba(21,101,192,0.30); }
        .sb-user-info { overflow: hidden; min-width: 0; transition: opacity 0.18s, max-width 0.18s; max-width: 200px; }
        .sb-user-info.sb-hidden { opacity: 0; max-width: 0; }
        .sb-user-name { font-size: 0.82rem; font-weight: 600; color: #1e293b; white-space: nowrap; }
        .sb-user-role { font-size: 0.70rem; color: #94a3b8; white-space: nowrap; }
      `}</style>

      <div className="sb" style={{ width: collapsed ? COLLAPSED_W : EXPANDED_W }}>

        {/* ── Header / Logo ── */}
        <div className="sb-header">
          {collapsed ? (
            // Collapsed: 36×36 square wrapper, logo.jpeg fills it
            <div className="sb-logo-wrap-collapsed">
              <Image
                src="/logo.jpeg"
                alt="Venturing Digitally"
                fill
                style={{ objectFit: 'contain', objectPosition: 'center' }}
                priority
              />
            </div>
          ) : (
            // Expanded: flex-1 wrapper, logo.png fills it preserving aspect ratio
            <div className="sb-logo-wrap-expanded">
              <Image
                src="/logo.png"
                alt="Venturing Digitally"
                fill
                style={{ objectFit: 'contain', objectPosition: 'left center' }}
                priority
              />
            </div>
          )}

          <button className="sb-toggle-btn" onClick={onToggle}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
            {collapsed
              ? <ChevronRight style={{ fontSize: 15 }} />
              : <ChevronLeft  style={{ fontSize: 15 }} />}
          </button>
        </div>

        {/* ── Navigation ── */}
        <nav className="sb-nav">
          {MenuItems.map((item, idx) => {
            const Icon   = item.icon;
            const active = isActive(item);
            const open   = openIndex === idx && !collapsed;

            return (
              <div key={idx} className="sb-item"
                ref={el => { itemEls.current[idx] = el; }}
                onMouseEnter={() => collapsed && item.item && setTooltipIndex(idx)}
                onMouseLeave={() => setTooltipIndex(null)}
              >
                {item.item ? (
                  <div
                    className={`sb-row${active ? ' sb-active' : ''}`}
                    onClick={() => !collapsed && setOpenIndex(open ? null : idx)}
                    title={collapsed ? item.label : undefined}
                  >
                    <span className="sb-icon"><Icon style={{ fontSize: 20 }} /></span>
                    <span className={`sb-label${collapsed ? ' sb-hidden' : ''}`}>{item.label}</span>
                    <KeyboardArrowDown
                      className={`sb-arrow${open ? ' sb-open' : ''}${collapsed ? ' sb-hidden' : ''}`}
                      style={{ fontSize: 18 }}
                    />
                  </div>
                ) : (
                  <Link href={item.href}
                    className={`sb-row${active ? ' sb-active' : ''}`}
                    title={collapsed ? item.label : undefined}
                  >
                    <span className="sb-icon"><Icon style={{ fontSize: 20 }} /></span>
                    <span className={`sb-label${collapsed ? ' sb-hidden' : ''}`}>{item.label}</span>
                  </Link>
                )}

                {item.item && open && (
                  <div className="sb-submenu">
                    {item.item.map((sub, si) => (
                      <Link key={si} href={sub.href}
                        className={`sb-sub-row${pathname === sub.href ? ' sb-active' : ''}`}>
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}

                <CollapsedTooltip
                  item={item}
                  anchorEl={itemEls.current[idx]}
                  visible={tooltipIndex === idx && collapsed}
                />
              </div>
            );
          })}
        </nav>

        {/* ── Footer ── */}
        <div className="sb-footer">
          <div className="sb-user-row">
            <div className="sb-user-avatar">A</div>
            <div className={`sb-user-info${collapsed ? ' sb-hidden' : ''}`}>
              <div className="sb-user-name">Admin</div>
              <div className="sb-user-role">Super Administrator</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;