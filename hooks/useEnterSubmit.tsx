import { type RefObject, useRef } from 'react'

export function useEnterSubmit(): {
  formRef: RefObject<HTMLFormElement>
  // eslint-disable-next-line no-unused-vars
  onKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void
} {
  const formRef = useRef<HTMLFormElement>(null)

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ): void => {
    if (
      event.key === 'Enter' &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    ) {
      formRef.current?.requestSubmit()
      event.preventDefault()
    }
  }

  return { formRef, onKeyDown: handleKeyDown }
}
