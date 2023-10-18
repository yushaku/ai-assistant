'use client'

import { Navbar } from './Navbar'
import { ThemeProvider } from '@material-tailwind/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SessionProvider } from 'next-auth/react'
import React, { useState } from 'react'
import { Toaster } from 'react-hot-toast'

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 2,
            // refetchOnMount: "always",
            // refetchOnWindowFocus: "always",
            // refetchOnReconnect: "always",
            cacheTime: 1000 * 60 * 15, // 15 mins
            // refetchInterval: 1000 * 30, //30 seconds
            // staleTime: 1000 * 30, //30 seconds
            refetchIntervalInBackground: false,
            suspense: false
          },
          mutations: {
            retry: 2
          }
        }
      })
  )

  return (
    <SessionProvider>
      <QueryClientProvider client={client}>
        <ThemeProvider>
          <main className="relative bg-dark">
            <Toaster position="top-center" />
            <Navbar />
            {children}
          </main>
        </ThemeProvider>

        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SessionProvider>
  )
}
