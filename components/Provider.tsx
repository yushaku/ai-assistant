'use client'

import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'
import { ThemeProvider } from '@material-tailwind/react'
import { SessionProvider } from 'next-auth/react'
import React, { useState } from 'react'
import { Prompt } from './Prompt'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
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
            suspense: false,
          },
          mutations: {
            retry: 2,
          },
        },
      })
  );

  return (
    <SessionProvider>
      <QueryClientProvider client={client}>
        <ThemeProvider>
          <main className="relative bg-dark">
            <Toaster position="top-center" />
            <Navbar />
            <section className="flex overflow-hidden">
              <Sidebar />
              <article className="flex-1">{children}</article>
              <Prompt />
            </section>
          </main>
        </ThemeProvider>

        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SessionProvider>
  )
}
