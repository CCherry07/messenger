import "../styles/globals.css";
import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";

import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

export function App({ Component, pageProps: { ...pageProps } }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default appWithTranslation(App);
