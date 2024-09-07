import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Roboto } from "@next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@uploadthing/react/styles.css";

const APP_NAME = "L.F.E.M.H.S.S";
const APP_DESCRIPTION = "This is an example of using next-pwa";
const roboto = Roboto({
  weight: ['400', '500', '700'], // Customize the weights
  subsets: ['latin'],
  variable: '--font-roboto', // Define a custom variable for Tailwind
});

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_NAME,
    template: "%s - PWA App",
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_NAME,
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    shortcut: "/favicon.ico",
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" dir="ltr" className="text-white obsidean">
      <ToastContainer />
      <body className={`${roboto.variable} obsidean`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
