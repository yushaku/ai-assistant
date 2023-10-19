import { Avata } from './Avata'
import { QuestionMarkCircleIcon } from '@heroicons/react/24/solid'
import {
  List,
  Popover,
  PopoverContent,
  PopoverHandler
} from '@material-tailwind/react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

export const Navbar = () => {
  const { data: section } = useSession()
  const styled = section?.user?.isAdmin ? 'flex-center' : 'hidden'

  return (
    <nav className="absolute top-0 z-10 flex h-14 w-full items-center bg-dark-200">
      <div className="flex-between w-full px-6">
        <Link href="/" className="green_text_gradient text-xl font-bold">
          HUCE Assistents
        </Link>

        <ul className={`${styled} gap-4`}>
          {features.map((feat) => {
            return (
              <li key={feat.title}>
                <Link href={feat.href}>{feat.title}</Link>
              </li>
            )
          })}
        </ul>

        <div className="flex-center gap-4">
          <Popover placement="bottom-end">
            <PopoverHandler>
              <QuestionMarkCircleIcon
                className="h-6 w-6 hover:text-teal-200"
                color="white"
              />
            </PopoverHandler>
            <PopoverContent className="z-10">
              <List>
                <li>
                  <strong>Alt + h</strong>
                  <span>: toggle chat list</span>
                </li>
                <li>
                  <strong>Alt + L</strong>
                  <span>: toggle prompt list</span>
                </li>
              </List>
            </PopoverContent>
          </Popover>
          <Avata />
        </div>
      </div>
    </nav>
  )
}

const features = [
  {
    title: 'Chats',
    href: '/'
  },
  {
    title: 'Files',
    href: '/files'
  },
  {
    title: 'Prompts',
    href: '/prompts'
  }
]
