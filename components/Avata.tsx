'use client'

import { GithubIcon } from './icons/GithubIcon'
import { GoogleIcon } from './icons/GoogleIcon'
import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Spinner
} from '@material-tailwind/react'
import { signIn, signOut, useSession } from 'next-auth/react'

export const Avata = () => {
  const { data, status } = useSession()

  if (status === 'loading')
    return (
      <h1>
        <Spinner color="blue" />
      </h1>
    )
  if (status === 'authenticated') {
    return (
      <Menu placement="bottom-end">
        <MenuHandler>
          <Avatar
            size="sm"
            src={data.user?.image ?? '/man.png'}
            alt={data?.user?.name ?? 'avata'}
          />
        </MenuHandler>

        <MenuList>
          <MenuItem onClick={() => signOut()}>Profile</MenuItem>
          <MenuItem onClick={() => signOut()}>Sign out</MenuItem>
        </MenuList>
      </Menu>
    )
  }

  return (
    <Menu placement="bottom-end">
      <MenuHandler>
        <Button className='btn-outline'>login now</Button>
      </MenuHandler>

      <MenuList>
        <MenuItem
          className="flex items-center gap-2"
          onClick={() => signIn('google', { callbackUrl: '/' })}
        >
          <GoogleIcon />
          Sign in with gooogle
        </MenuItem>

        <MenuItem
          className="flex items-center gap-2"
          onClick={() => signIn('github', { callbackUrl: '/' })}
        >
          <GithubIcon />
          Sign in with github
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
