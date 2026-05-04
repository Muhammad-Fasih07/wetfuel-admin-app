import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import MuiProvider from "@/components/providers/MuiProvider";
import QueryProvider from "@/components/providers/QueryProvider";
import ToastContainer from "@/components/ui/Toast";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "WetFuel Admin Panel",
  description: "Super-admin panel for WetFuel internal operations",
  icons: {
    icon: "/wetfeullogo.png",
    apple: "/wetfeullogo.png",
    shortcut: "/wetfeullogo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <QueryProvider>
          <MuiProvider>
            {children}
            <ToastContainer />
          </MuiProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
