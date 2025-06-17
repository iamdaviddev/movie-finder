import type { Metadata } from "next";
import { Bebas_Neue } from "next/font/google";
import "./globals.css";

const bebas = Bebas_Neue({
  subsets: ['latin'],
  weight: '400', 
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Moviefinder",
  description: "Encontre filmes mais populares",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bebas.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
