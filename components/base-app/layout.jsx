"use client";
import Navbar from "./navbar";
import { usePathname } from "next/navigation";

const Layout = ({ children }) => {
  return (
    <div className="relative">
      {!usePathname().startsWith("/auth") && <Navbar />}
      {children}
    </div>
  );
};

export default Layout;
