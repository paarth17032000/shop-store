import type { Metadata } from 'next';
import './globals.css';

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
      <body>{children}</body>
    </html>
  );
}
