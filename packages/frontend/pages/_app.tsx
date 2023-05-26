import "../styles/globals.css";
import "nprogress/nprogress.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import AuthContext from "@/context/AuthContext";
import ToasterContext from "@/context/ToasterContext";

import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

export function App({ Component, pageProps: { ...pageProps } }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext>
        <ToasterContext />
        <Component {...pageProps} />
      </AuthContext>
    </QueryClientProvider>
  );
}

export default appWithTranslation(App);
