import './globals.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google';
import {AppProvider} from '../context/AppProvider';

const montserrat = Montserrat({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Igor - Virtual Store IstPay',
  description: 'Virtual Store IstPay - Igor Barbosa',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <AppProvider>
        <body className={montserrat.className}>{children}</body>
      </AppProvider>
    </html>
  )
}
