'use client'

import { GithubIcon } from '@/component/icons/GithubIcon'
import { GoogleIcon } from '@/component/icons/GoogleIcon'
import { signIn } from 'next-auth/react'

export default function Page() {
  return (
    <div className="mt-24 flex flex-col gap-5">
      <button
        className="flex items-center gap-2 rounded-lg border border-dark bg-[#234f66] px-6 py-3 hover:shadow-xl"
        onClick={() => signIn('google', { callbackUrl: '/' })}
      >
        <GoogleIcon />
        Sign in with gooogle
      </button>

      <button
        className="flex items-center gap-2 rounded-lg border border-dark bg-[#234f66] px-6 py-3 hover:shadow-xl"
        onClick={() => signIn('github', { callbackUrl: '/' })}
      >
        <GithubIcon />
        Sign in with github
      </button>
    </div>
  )
}
