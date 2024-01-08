'use client'

import { GoogleIcon } from '@/component/icons/GoogleIcon'
import { signIn } from 'next-auth/react'

export default function Page() {
  return (
    <div className="mt-24 flex flex-col gap-5">
      <h3 className="header-lg">Sign In</h3>
      <p className="text-gray-600">Currently only support HUCE school</p>

      <button
        className="flex items-center gap-2 rounded-lg border border-dark bg-[#234f66] px-8 py-4 text-lg hover:shadow-xl"
        onClick={() => signIn('google', { callbackUrl: '/' })}
      >
        <GoogleIcon />
        Sign In With School Email
      </button>

      {/* <button */}
      {/*   className="flex items-center gap-2 rounded-lg border border-dark bg-[#234f66] px-6 py-3 hover:shadow-xl" */}
      {/*   onClick={() => signIn('github', { callbackUrl: '/' })} */}
      {/* > */}
      {/*   <GithubIcon /> */}
      {/*   Sign in with github */}
      {/* </button> */}
    </div>
  )
}
