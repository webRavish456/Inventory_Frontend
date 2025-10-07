"use client";
import React from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
  const pathname = usePathname();

  // If on login page, don't show sidebar and header
  if (pathname === '/login') {
    return <>{children}</>;
  }

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <Sidebar />
      </aside>
      
      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <Header />
        
        {/* Page Content */}
        <main className="content-area">
          {children}
        </main>
      </div>
    </div>
  );
}
