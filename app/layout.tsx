import type { Metadata } from 'next';
import { CartProvider } from '@/context/storeContext';
import './globals.css';

export const metadata: Metadata = {
  title: "Shopper's Stop",
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
        {/* wrapping context around the app */}
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
