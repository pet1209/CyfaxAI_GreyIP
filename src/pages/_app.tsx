import Intl from "@/components/intl";
import Layout from "@/components/layout";
import defaultSEOConfiguration from "@/seo/defaultSEOConfiguration";
import "@/styles/globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import { Inter, Mulish, Poppins } from "next/font/google";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SelectedValueProvider } from '@/context/selectedValueContext';

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function MyCustomApp({ Component, pageProps }: AppProps) {
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
          --font-poppins: ${poppins.style.fontFamily};
          --font-inter: ${inter.style.fontFamily};
        }
      `}</style>
      <QueryClientProvider client={queryClient}>
        <SelectedValueProvider>
          <Intl>
            <Layout>
              <DefaultSeo {...defaultSEOConfiguration} />
              <Component {...pageProps} />
              <GoogleAnalytics gaId="G-JPQQNPQ5PG" />
            </Layout>
          </Intl>
        <ToastContainer stacked position="top-right" />
        </SelectedValueProvider>
      </QueryClientProvider>
    </>
  );
}
