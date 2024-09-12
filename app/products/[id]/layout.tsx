import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Product Detail',
  description: 'Details of a product',
};

export default function ProductDetailsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
