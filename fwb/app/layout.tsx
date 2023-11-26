import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { SupabaseProvider } from "@/backend/supabaseContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Friends With Benefits",
  description: "Discounts Have Never Been Easier To Find!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <ClerkProvider>
        <SupabaseProvider>
        <html lang="en">
          <body className={inter.className}>{children}</body>
        </html>
        </SupabaseProvider>
      </ClerkProvider>
    </ThemeProvider>
  );
}
