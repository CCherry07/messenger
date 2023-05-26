import "../styles/globals.css";
import "nprogress/nprogress.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import ToasterContext from "@/context/ToasterContext";

import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

export function App({ Component, pageProps: { ...pageProps } }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ToasterContext />
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default appWithTranslation(App);
