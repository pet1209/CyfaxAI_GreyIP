import Intl from "@/components/intl";
import Layout from "@/components/layout";
import defaultSEOConfiguration from "@/seo/defaultSEOConfiguration";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import { Mulish } from "next/font/google";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const mulish = Mulish({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 10000,
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <>
      <style jsx global>{`
        :root {
          --font-mulish: ${mulish.style.fontFamily};
        }
      `}</style>
      <QueryClientProvider client={queryClient}>
        <Intl>
          <Layout>
            <DefaultSeo {...defaultSEOConfiguration} />
            <Component {...pageProps} />
          </Layout>
        </Intl>
        <ToastContainer position="top-right" />
      </QueryClientProvider>
    </>
  );
}
