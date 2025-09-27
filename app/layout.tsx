import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'
import './globals.css'

export const metadata: Metadata = {
  title: 'Lightning Protocol — Decentralized Social Layer for Data Incentivization',
  description: 'Drop-in NPM SDK + open EIP that lets any commerce app pay users an on-chain "data dividend" when first-party data is monetized, backed by consent proofs, encrypted receipts on Lighthouse, Sybil-resistant identities via World ID, and VC-anchored permissions via Self Protocol.',
  generator: 'Lightning Protocol',
  keywords: 'decentralized social, data monetization, privacy, blockchain, EIP-712, World ID, Lighthouse, Self Protocol, data dividends, consent management, ERC-20, smart contracts',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        {children}
        <Analytics />
        <Toaster position="top-center" richColors />
      </body>
    </html>
  )
}
