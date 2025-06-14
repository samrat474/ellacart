import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Layout from "@/components/base-app/layout";
import { AuthProvider } from "@/lib/auth-context";

const inter = Inter({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-sans",
});

export const metadata = {
  title: {
    template: "%s - Ellacart",
    default: "Ellacart - The best place to buy the electronics you love.",
  },
  description: "The best place to buy the electronics you love.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} antialiased scroll-smooth`}>
      <body>
        <AuthProvider>
          <Layout>{children}</Layout>
        </AuthProvider>
      </body>
    </html>
  );
}
