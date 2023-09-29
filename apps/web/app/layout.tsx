import "./globals.css";
import "tailwind-config/tailwind.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Provider } from "../components/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "School AI assistents",
  description: "Generate answer for student's questions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
