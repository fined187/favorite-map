import type { AppProps } from "next/app";
import "../styles/globals.css";
import Layout from "@/components/Layout";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  const { session } = pageProps;
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ReactQueryDevtools />
      </SessionProvider>
    </QueryClientProvider>
  );
}
