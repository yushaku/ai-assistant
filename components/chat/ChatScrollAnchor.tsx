'use client'

import { useAtBottom } from 'hooks/useAtBottom'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

interface ChatScrollAnchorProps {
  trackVisibility?: boolean
}

export function ChatScrollAnchor({ trackVisibility }: ChatScrollAnchorProps) {
  const isAtBottom = useAtBottom()
  const { ref, entry, inView } = useInView({
    trackVisibility,
    delay: 100,
    rootMargin: '0px 0px -150px 0px'
  })

  useEffect(() => {
    entry?.target.scrollIntoView({
      block: 'start',
      behavior: 'smooth'
    })
  }, [entry?.target])

  useEffect(() => {
    if (isAtBottom && trackVisibility && !inView) {
      entry?.target.scrollIntoView({
        block: 'start',
        behavior: 'smooth'
      })
    }
  }, [inView, entry?.target, isAtBottom, trackVisibility])

  return <div ref={ref} className="h-px w-full bg-gray-200/50" />
}
