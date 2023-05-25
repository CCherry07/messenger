import "./globals.css";
// import { QueryClient, QueryClientProvider, Hydrate, dehydrate } from 'react-query'
// const queryClient = new QueryClient()
// import { ReactQueryDevtools } from 'react-query/devtools'
export const metadata = {
  title: "messenger",
  description: "messenger app",
};

export default function RootLayout({
  children,
  pageProps,
}: {
  children: React.ReactNode;
  pageProps: any;
}) {
  return (
    <html lang="en">
      <body>
        {/* <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </Hydrate>
        </QueryClientProvider> */}
        {children}
      </body>
    </html>
  );
}

// export async function getStaticProps() {
//   const queryClient = new QueryClient()

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   }
// }
