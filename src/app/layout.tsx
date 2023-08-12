import "@/presentation/styles/global.css";

import type { Metadata, NextPage } from "next";
import { Roboto } from "next/font/google";
import { ReactNode } from "react";

const roboto = Roboto({ weight: ["400", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "4Dev - Enquetes para programadores",
  description: "Enquetes para programadores",
};

const RootLayout: NextPage<{ children: ReactNode }> = ({ children }) => {
  return (
    <html lang="pt-br">
      <body className={roboto.className}>{children}</body>
    </html>
  );
};

export default RootLayout;
