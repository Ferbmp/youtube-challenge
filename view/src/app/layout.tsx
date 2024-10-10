"use client";

import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import { CssBaseline } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Playlist Viewer</title>

        <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml" />
        <link
          rel="shortcut icon"
          href="/assets/favicon.svg"
          type="image/svg+xml"
        />
      </head>
      <body className={roboto.variable}>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <ToastContainer />
            <CssBaseline />
            <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
