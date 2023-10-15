import Image from 'next/image'

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <section className="grid h-screen w-screen grid-cols-1 md:grid-cols-2">
      <div className="flex min-h-[250px] items-center justify-center bg-[#234f66]">
        <Image src="/spaceUp.gif" alt="space up" width={700} height={700} />
      </div>

      <div className="flex-center bg-[#F1F2F3]">{children}</div>
    </section>
  )
}
