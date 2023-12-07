import type { AppProps } from "next/app";
import "../styles/globals.css";
import Layout from "@/components/Layout";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  const { session } = pageProps;
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
          <Layout>
            <Component {...pageProps} />
            <ToastContainer autoClose={1000} pauseOnFocusLoss={false} pauseOnHover={false} />
          </Layout>
          <ReactQueryDevtools />
        </SessionProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
}
