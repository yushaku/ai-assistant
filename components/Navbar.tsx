import { UserButton } from '@clerk/nextjs'
import { Bars3BottomRightIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import React from 'react'

export const Navbar = () => {
  return (
    <nav className="absolute top-0 z-10 flex h-14 w-full items-center bg-dark-100">
      <div className="flex-between container">
        <Link href="/" className="green_text_gradient text-xl font-bold">
          HUCE Assistents
        </Link>

        <ul className="flex-center gap-4">
          {features.map((feat) => {
            return (
              <li key={feat.title}>
                <Link href={feat.href}>{feat.title}</Link>
              </li>
            )
          })}
        </ul>

        <div className="flex-center gap-4">
          <Bars3BottomRightIcon className="h-6 w-6" color="white" />
          <UserButton />
        </div>
      </div>
    </nav>
  )
}

const features = [
  {
    title: 'Files',
    href: '#'
  },
  {
    title: 'Prompts',
    href: '#'
  },
  {
    title: 'Users',
    href: '#'
  },
  {
    title: 'Settings',
    href: '#'
  }
]
