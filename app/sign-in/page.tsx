'use client'

import { GithubIcon } from '@/component/icons/GithubIcon'
import { GoogleIcon } from '@/component/icons/GoogleIcon'
import { Button } from '@material-tailwind/react'
import { signIn } from 'next-auth/react'

export default function Page() {
  return (
    <div className="mt-24">
      <Button
        className="flex items-center gap-2"
        onClick={() => signIn('google', { callbackUrl: '/' })}
      >
        <GoogleIcon />
        Sign in with gooogle
      </Button>

      <Button
        className="flex items-center gap-2"
        onClick={() => signIn('github', { callbackUrl: '/' })}
      >
        <GithubIcon />
        Sign in with github
      </Button>
    </div>
  )
}
