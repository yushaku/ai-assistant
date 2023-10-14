import { Provider } from '../components/Provider'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Poppins, Roboto } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ["200", "300", "500", "600", "700"],
})

const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
  weight: ["300", "500", "700"],
})


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
    <html lang="en" className={`${roboto.variable} ${poppins.variable} font-sans`}>
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
