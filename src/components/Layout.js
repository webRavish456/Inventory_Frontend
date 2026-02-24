"use client";
import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useAuth } from "../context/AuthContext";

export default function Layout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated && pathname !== "/login") {
      router.replace("/login");
      return;
    }
    if (isAuthenticated && pathname === "/login") {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, pathname, router]);

  if (pathname === "/login") {
    return <>{children}</>;
  }

  return (
    <div className="app-container">
      <aside className="sidebar">
        <Sidebar />
      </aside>
      <div className="main-content">
        <Header />
        <main className="content-area">{children}</main>
      </div>
    </div>
  );
}
