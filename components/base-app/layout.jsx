"use client";
import Footer from "./footer";
import Navbar from "./navbar";
import { usePathname } from "next/navigation";

const Layout = ({ children }) => {
  return (
    <div className="relative">
      {!usePathname().startsWith("/auth") && <Navbar />}
      {children}
      {!usePathname().startsWith("/auth") && <Footer />}
    </div>
  );
};

export default Layout;
