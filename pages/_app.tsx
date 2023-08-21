import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import NoteContextProvider from "@/components/NoteContext";
import AuthContextProvider from "@/components/AuthContext";
import { ThemeProvider } from "@/components/theme-provider";
import NextNProgress from "nextjs-progressbar";
import { useTheme } from "next-themes";

const client = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={client}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <AuthContextProvider>
          <NoteContextProvider>
            <Component {...pageProps} />
            <NextNProgress />
          </NoteContextProvider>
        </AuthContextProvider>
      </ThemeProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}
