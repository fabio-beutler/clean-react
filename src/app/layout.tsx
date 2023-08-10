import "./globals.css";

import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ReactNode } from "react";

const roboto = Roboto({ weight: ["400", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "4Dev - Enquetes para programadores",
  description: "Enquetes para programadores",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
