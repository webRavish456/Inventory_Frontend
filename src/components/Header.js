'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Person, Settings, Logout, Email } from '@mui/icons-material';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { logout, admin } = useAuth(); // ✅ admin object se real data aayega
  const dropdownRef = useRef(null);

  // ✅ Dropdown band ho jaye agar bahar click karein
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const headerTitle = () => {
    if (pathname === '/dashboard' || pathname === '/Dashboard') return 'Dashboard';
    else if (pathname === '/branch') return 'Branch';
    else if (pathname === '/customers') return 'Customer Management';
    else if (pathname === '/supplier/list') return 'Supplier Management';
    else if (pathname === '/staff/list') return 'Staff Management';
    else if (pathname === '/items/addEdit-products') return 'Add/Edit Products';
    else if (pathname === '/items/products-categories') return 'Product Categories';
    else if (pathname === '/items/hsn-code') return 'HSN Code';
    else if (pathname === '/items/batch-tracking') return 'Batch Tracking';
    else if (pathname === '/stock-management') return 'Stock Management';
    else if (pathname === '/purchase/purchase-orders') return 'Purchase Orders';
    else if (pathname === '/purchase/purchase-returns') return 'Purchase Returns';
    else if (pathname === '/sales') return 'Sales';
    else if (pathname === '/finance/income') return 'Income';
    else if (pathname === '/finance/expense') return 'Expense';
    else if (pathname === '/inventory-costing/weighted-methods') return 'Weighted Methods';
    else if (pathname === '/inventory-costing/dead-stock') return 'Dead Stock';
    else if (pathname === '/damage/writeoff') return 'Damage Write-off';
    else if (pathname === '/Users') return 'User Management';
    else if (pathname === '/roles-permissions') return 'Roles & Permissions';
    else if (pathname.startsWith('/roles-permissions/manage')) return 'Manage permissions';
    else return 'Inventory Management';
  };

  const handleLogout = () => {
    setIsProfileOpen(false);
    logout();
    router.push('/login');
  };

  const handleSettings = () => {
    setIsProfileOpen(false);
    router.push('/settings'); // apna settings route yahan dalein
  };

  // ✅ Avatar initials banao name se
  const getInitials = (name) => {
    if (!name) return 'AD';
    return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  };

  // ✅ Real user data from AuthContext (admin object)
  const userName  = admin?.name  || admin?.username  || 'Admin';
  const userEmail = admin?.email || 'superadmin@gmail.com';
  const userRole  = admin?.role  || 'admin';
  const initials  = getInitials(userName);

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="page-title">{headerTitle()}</h1>
      </div>

      <div className="header-right">
        {/* ✅ Avatar with dropdown */}
        <div className="avatar-wrapper" ref={dropdownRef}>
          <div
            className="avatar"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            style={{ cursor: 'pointer', userSelect: 'none' }}
          >
            {initials}
          </div>

          {/* ✅ My Account Dropdown */}
          {isProfileOpen && (
            <div className="profile-dropdown">

              {/* My Account Title */}
              <div className="dropdown-header">
                <span className="dropdown-title">My Account</span>
              </div>

              <div className="dropdown-divider" />

              {/* Name + Role */}
              <div className="dropdown-user-info">
                <div className="dropdown-avatar-big">{initials}</div>
                <div>
                  <div className="dropdown-name">{userName}</div>
                  <div className="dropdown-role">{userRole}</div>
                </div>
              </div>

              <div className="dropdown-divider" />

              {/* Email */}
              <div className="dropdown-email-row">
                <Email sx={{ fontSize: 15, color: '#8896b8' }} />
                <span className="dropdown-email">{userEmail}</span>
              </div>

              <div className="dropdown-divider" />

              {/* Settings */}
              <button className="dropdown-item" onClick={handleSettings}>
                <Settings sx={{ fontSize: 16, color: '#555' }} />
                <span>Settings</span>
              </button>

              <div className="dropdown-divider" />

              {/* Logout */}
              <button className="dropdown-item danger" onClick={handleLogout}>
                <Logout sx={{ fontSize: 16 }} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ✅ Inline styles — globals.css mein bhi daal sakte hain */}
      <style jsx>{`
        .avatar-wrapper {
          position: relative;
        }
        .avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background-color: #e53935;
          color: white;
          font-weight: 700;
          font-size: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .profile-dropdown {
          position: absolute;
          right: 0;
          top: calc(100% + 10px);
          background: #fff;
          border: 1px solid #e2e8f4;
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.13);
          min-width: 230px;
          z-index: 9999;
          overflow: hidden;
        }
        .dropdown-header {
          padding: 12px 16px 10px;
        }
        .dropdown-title {
          font-weight: 700;
          font-size: 15px;
          color: #1a2035;
        }
        .dropdown-divider {
          height: 1px;
          background: #e2e8f4;
          margin: 0;
        }
        .dropdown-user-info {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 16px;
        }
        .dropdown-avatar-big {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: #e53935;
          color: white;
          font-weight: 700;
          font-size: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .dropdown-name {
          font-weight: 700;
          font-size: 13.5px;
          color: #1a2035;
        }
        .dropdown-role {
          font-size: 11.5px;
          color: #8896b8;
          text-transform: capitalize;
        }
        .dropdown-email-row {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
        }
        .dropdown-email {
          font-size: 12.5px;
          color: #4a5578;
        }
        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 11px 16px;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 13.5px;
          color: #4a5578;
          text-align: left;
          transition: background 0.15s;
        }
        .dropdown-item:hover {
          background: #f6f8fd;
        }
        .dropdown-item.danger {
          color: #e53935;
        }
        .dropdown-item.danger:hover {
          background: #fff5f5;
        }
      `}</style>
    </header>
  );
};

export default Header;
