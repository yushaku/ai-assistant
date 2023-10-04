import { Option, Select } from '@material-tailwind/react'
import type { Model } from 'lib/constants'
import { AI_MODELS } from 'lib/constants'

type Props = {
  onclick: (model: Model) => void
}
export const SelectModel = ({ onclick }: Props) => {
  return (
    <div className="w-72">
      <Select label="Select Model" className="text-gray-100">
        {AI_MODELS.map((model, index) => {
          return (
            <Option key={index} onClick={() => onclick(model)}>
              {model.title}
            </Option>
          )
        })}
      </Select>
    </div>
  )
}
