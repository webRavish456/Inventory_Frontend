
'use client';

import React, { useState } from 'react';
import { Person, Settings } from '@mui/icons-material';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';

const Header = () => {

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathname=usePathname();

  const router=useRouter();

  const headerTitle=()=>{
    if(pathname==='/Dashboard'){
      return 'Dashboard';
    }
    else if(pathname==='/branch'){
      return 'Branch';
    }
    else if(pathname==='/customers'){
      return 'Customer Management';
    }
    else if(pathname==='/supplier/list'){
      return 'Supplier Management';
    }
    else if(pathname==='/staff/list'){
      return 'Staff Management';
    }
    else if(pathname==='/items/addEdit-products'){
      return 'Add/Edit Products';
    }
    else if(pathname==='/items/products-categories'){
      return 'Product Categories';
    }
    else if(pathname==='/items/hsn-code'){
      return 'HSN Code';
    }
    else if(pathname==='/items/batch-tracking'){
      return 'Batch Tracking';
    }
    else if(pathname==='/stock-management'){
      return 'Stock Management';
    }
    else if(pathname==='/purchase/purchase-orders'){
      return 'Purchase Orders';
    }
    else if(pathname==='/purchase/purchase-returns'){
      return 'Purchase Returns';
    }
    else if(pathname==='/sales'){
      return 'Sales';
    }
    else if(pathname==='/finance/income'){
      return 'Income';
    }
    else if(pathname==='/finance/expense'){
      return 'Expense';
    }
    else if(pathname==='/inventory-costing/weighted-methods'){
      return 'Weighted Methods';
    }
    else if(pathname==='/inventory-costing/dead-stock'){
      return 'Dead Stock';
    }
    else if(pathname==='/damage/writeoff'){
      return 'Damage Write-off';
    }
    else if(pathname==='/Users'){
      return 'User Management';
    }
    else {
      return 'Inventory Management';
    }
   }

   const handleLogout=()=>{
     // Redirect to login
     router.push('/login');
   }

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="page-title">{headerTitle()}</h1>
      </div>

      <div className="header-right">
        
        <div
          className="avatar"
          onClick={() => setIsProfileOpen(!isProfileOpen)}
        >
          <Person sx={{ fontSize: 18 }} />
          {isProfileOpen && (
            <div className="avatar-dropdown">
              <Button onClick={handleLogout} className="dropdown-item danger">Logout</Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;