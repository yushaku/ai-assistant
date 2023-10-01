import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Provider } from '../components/Provider'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI assistents',
  description: "Generate answer for student's questions"
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Provider>{children}</Provider>
        </body>
      </html>
    </ClerkProvider>
  )
}
