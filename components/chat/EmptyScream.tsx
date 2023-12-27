import { AddThreadBtn } from '../AddThreadButton'
import { ThreadList } from './ThreadList'
import { ArrowRightIcon } from '@heroicons/react/24/solid'
import type { UseChatHelpers } from 'ai/react/dist'
import Image from 'next/image'
import React from 'react'

const exampleMessages = [
  {
    heading: 'Khi nào mở lớp đăng ký học kỳ?',
    message: `Khi nào mở lớp đăng ký học kỳ ở trường đại học xây dựng?`
  },
  {
    heading: 'Danh sách sinh viên đạt học bỏng kỳ này?',
    message:
      'Danh sách sinh viên đạt học bỏng kỳ này của trường đại học xây dựng: \n'
  },
  {
    heading: 'Tiêu chuẩn đầu ra tiếng anh của trường HUCE?',
    message: `Tiêu chuẩn đầu ra tiếng anh của trường HUCE: \n`
  }
]

export const EmptyScreem = ({ setInput }: Pick<UseChatHelpers, 'setInput'>) => {
  return (
    <div className="mx-auto flex h-full w-[500px] flex-col justify-center">
      <div className="flex gap-5">
        <Image
          src="/bot.png"
          className="mx-auto"
          width={100}
          height={100}
          alt="wellcome"
        />
        <p>
          Tôi là Tigon, một cộng sự sáng tạo và hữu ích của bạn. Tôi có một số
          hạn chế và không phải lúc nào cũng đúng. Tuy nhiên, phản hồi của bạn
          sẽ giúp tôi cải thiện.
        </p>
      </div>

      <br />
      <div className="mt-4 flex flex-col items-start space-y-2">
        <strong>
          Bạn có thể bắt đầu cuộc trò chuyện tại đây hoặc thử ví dụ sau:
        </strong>

        {exampleMessages.map((message, index) => (
          <button
            key={index}
            className="flex-center h-auto gap-2 text-blue-200"
            onClick={() => setInput(message.message)}
          >
            <ArrowRightIcon className="h-5 w-5" />
            {message.heading}
          </button>
        ))}
      </div>

      <br />

      <strong>Chọn cuộc trò chuyện bạn đã bỏ dở:</strong>
      <ThreadList />
      <AddThreadBtn />
    </div>
  )
}
