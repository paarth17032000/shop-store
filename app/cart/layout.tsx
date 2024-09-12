import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cart Page',
  description: 'Details of a Cart',
};

export default function ProductDetailsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
