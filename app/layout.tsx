import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/storeContext';

export const metadata: Metadata = {
  title: "Shopper's Stop ",
  description: 'One stop shopping solution for everyone.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
