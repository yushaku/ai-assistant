import Image from 'next/image'
import React from 'react'

export const Loading = ({ show }: { show: boolean }) => {
  return (
    <div
      className={`${
        show ? 'block' : 'hidden'
      } fixed inset-0 z-20 flex h-screen w-screen items-center justify-center bg-dark/60`}
    >
      <Image
        className="rounded-full"
        src="/catRunning.gif"
        alt="loading"
        width={150}
        height={150}
        sizes="150px"
      />
    </div>
  )
}
