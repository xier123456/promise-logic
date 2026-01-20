import { DocsLayout } from "@/components/layout/DocsLayout";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <DocsLayout>
        {children}
      </DocsLayout>

  );
}
