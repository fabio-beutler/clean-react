"use client";
import "@/presentation/styles/global.css";

import type { AppProps } from "next/app";

import { ApiContextProvider } from "@/presentation/contexts";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApiContextProvider>
      <Component {...pageProps} />
    </ApiContextProvider>
  );
}
