import { Provider } from '../components/Provider'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Roboto } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
  weight: ['300', '500', '700']
})

export const metadata: Metadata = {
  title: 'Yu AI',
  description: "Generate answer for student's questions",
  icons: [
    {
      rel: 'apple-touch-icon',
      url: '/apple-touch-icon.png'
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon-32x32.png'
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon-16x16.png'
    },
    {
      rel: 'icon',
      url: '/favicon.ico'
    }
  ]
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html lang="en" className={`${roboto.variable}  font-sans`}>
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
