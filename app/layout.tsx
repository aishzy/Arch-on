import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Manku | Architecture portfolio',
  description: 'Architecture, drawings, models and ideas by Manku.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
