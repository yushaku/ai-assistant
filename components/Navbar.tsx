import { Avata } from './Avata'
import { QuestionMarkCircleIcon } from '@heroicons/react/24/solid'
import {
  Avatar,
  List,
  Popover,
  PopoverContent,
  PopoverHandler
} from '@material-tailwind/react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

export const Navbar = () => {
  const { data: section } = useSession()
  const styled = section?.user?.isAdmin ? 'flex-center' : 'hidden'
  const router = useRouter()

  useHotkeys('ctrl+alt+c', () => router.push('/'), [])
  useHotkeys('ctrl+alt+f', () => router.push('/files'), [])
  useHotkeys('ctrl+alt+p', () => router.push('/prompts'), [])

  return (
    <nav className="absolute top-0 z-10 flex h-14 w-full items-center bg-dark-200">
      <div className="flex-between w-full px-6">
        <Link
          href="/"
          className="green_text_gradient flex-center gap-2 text-xl font-bold"
        >
          <Avatar src="/huce.jpg" size="sm" />
          <span className="hidden md:block">HUCE Assistents</span>
        </Link>

        <ul className={`${styled} gap-4`}>
          {features.map((feat) => {
            return (
              <li key={feat.title}>
                <Link className="link" href={feat.href}>
                  {feat.title}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="flex-center gap-4">
          <span className="rounded bg-dark-300 px-2 text-[12px] text-green-300">
            Beta version
          </span>
          <Popover placement="bottom-end">
            <PopoverHandler>
              <QuestionMarkCircleIcon
                className="h-6 w-6 hover:text-teal-200"
                color="white"
              />
            </PopoverHandler>
            <PopoverContent className="z-10">
              <List>
                {shortcuts.map(({ key, desc }, index) => {
                  return (
                    <li key={index}>
                      <strong>{key}</strong>
                      <span>{desc}</span>
                    </li>
                  )
                })}
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

const shortcuts = [
  {
    key: 'Alt + h',
    desc: ': toggle chat list'
  },
  {
    key: 'Alt + l',
    desc: ': toggle prompt list'
  },
  {
    key: 'Ctrl + Alt + c',
    desc: ': jump to chat page'
  },
  {
    key: 'Ctrl + Alt + f',
    desc: ': jump to files page'
  },
  {
    key: 'Ctrl + Alt + p',
    desc: ': jump to prompts page'
  }
]
