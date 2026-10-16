import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vaeltrix — Payment promises, made enforceable.",
  description: "An open protocol design for measurable, stake-backed payment delivery promises on Stellar. Explore the Vaeltrix testnet blueprint.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
