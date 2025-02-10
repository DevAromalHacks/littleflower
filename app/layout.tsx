import type { Metadata } from "next";
import "./globals.css";
import "@fontsource/nunito";

export const metadata: Metadata = {
  title: "Little Flower English Medium Higher Secondary School",
  description: "Experience excellence in education at Little Flower English Medium Higher Secondary School, a premier CBSE-affiliated institution in Kochi, Kerala, dedicated to nurturing future leaders.",
  keywords: [
    "Little Flower English Medium Higher Secondary School",
    "CBSE schools in Kochi",
    "best higher secondary schools in Kerala",
    "top CBSE schools in Kerala",
    "quality education in Kochi",
    "CBSE affiliated schools in Kerala",
    "leading higher secondary schools in Kochi",
    "Little Flower School Kerala",
    "holistic education in Kerala",
    "top-ranked CBSE schools in Kochi",
  ].join(", "),
  openGraph: {
    title: "Little Flower English Medium Higher Secondary School",
    description: "Join Little Flower English Medium Higher Secondary School in Kochi, Kerala, and experience top-tier CBSE education fostering academic excellence and holistic development.",
    url: "https://lfemhs.com",
    type: "website",
    images: [
      {
        url: "/logo-littleflower.avif",
        width: 1200,
        height: 630,
        alt: "Little Flower English Medium Higher Secondary School",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Little Flower English Medium Higher Secondary School | Premier CBSE Education in Kerala",
    description: "Discover the premier CBSE education at Little Flower English Medium Higher Secondary School in Kochi, Kerala, dedicated to nurturing future leaders.",
    images: ["/images/twitter-image-littleflower.jpg"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="canonical" href="https://littleflowerhsskochi.com" />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="antialiased" style={{ fontFamily: "Nunito" }}>
        {children}
      </body>
    </html>
  );
}
