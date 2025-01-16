// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tarot Creator',
  description: 'Blacklight Tarot Deck Creator',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

// app/page.tsx
'use client'

import TarotDeckCreator from '../components/TarotDeckCreator'

export default function Home() {
  return (
    <main className="min-h-screen p-24">
      <TarotDeckCreator />
    </main>
  )
}

// app/globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;
