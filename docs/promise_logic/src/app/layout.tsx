import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Layout } from "@/components/layout/Layout";


export const metadata: Metadata = {
  title: "PromiseLogic - Compose promises with logic gate semantics",
  description: "PromiseLogic provides logical gate semantics for Promise composition. Forget APIs, remember logic.",
  keywords: ["promise", "logic", "async", "logic-gates", "javascript", "typescript"],
  authors: [{ name: "PromiseLogic Team" }],
  openGraph: {
    title: "PromiseLogic - Logic Gate Semantics for Promises",
    description: "Compose promises with logic gate semantics (AND, OR, XOR, NAND, NOR, XNOR, Majority)",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>

      <body className="font-sans antialiased bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="promise-logic-theme"
        >
            <Layout>
              {children}
            </Layout>
        </ThemeProvider>
    </body>
    </html >
  );
}
