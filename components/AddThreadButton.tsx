import { Loading } from './Loading'
import { ThreadDialog } from './dialog/ThreadDialog'
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useCreateThread } from 'services'

export const AddThreadBtn = () => {
  const { mutateAsync: create, isLoading } = useCreateThread()

  const [isOpen, setIsOpen] = useState(false)

  const router = useRouter()
  const searchParams = usePathname()
  const threadId = searchParams.split('/')[2]

  async function handleConfirm(title: string) {
    setIsOpen(false)
    const newone = await create({ title })
    router.push(`/chat/${newone.id}`)
  }

  return (
    <div className={`${threadId ? 'hidden' : 'block'}`}>
      <button
        onClick={() => setIsOpen(true)}
        className="btn-outline flex gap-3"
      >
        <PlusCircleIcon className="h-5 w-5" />
        Add New Thread
      </button>

      <Loading show={isLoading} />

      <ThreadDialog
        title=""
        open={isOpen}
        onOpen={() => setIsOpen(false)}
        onConfirm={handleConfirm}
      />
    </div>
  )
}
