'use client'

import { globlePrompt } from '@/lib/atom'
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  StopIcon,
  SwatchIcon
} from '@heroicons/react/24/solid'
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  List,
  ListItem,
  ListItemPrefix,
  Spinner,
  Typography
} from '@material-tailwind/react'
import { Resizable } from '@yushaku/re-resizable'
import React, { useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { useRecoilState } from 'recoil'
import { useGetPrompts } from 'services/prompt'

export const RightSideBar = () => {
  const [, setGlobalPrompt] = useRecoilState(globlePrompt)
  const [show, setShow] = useState(true)
  const [open, setOpen] = useState(0)
  useHotkeys('alt+l', () => setShow(!show), [show])

  const { data: prompts, isLoading } = useGetPrompts()

  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value)
  }

  const style = show ? '' : 'translate-x-[100%]'
  const btnStyle = show
    ? 'left-[-5%] rotate-180 bg-dark'
    : 'left-[-15%] bg-dark-100'

  return (
    <Resizable
      className={`${style} animate mt-14 bg-dark-200`}
      enable={{
        left: true,
        right: false,
        top: false,
        bottom: false
      }}
      maxWidth={500}
      minWidth={200}
      defaultSize={{ width: 300 }}
    >
      <div className="px-6 py-2">
        <button
          onClick={() => setShow(!show)}
          className={`${btnStyle} animate absolute top-2 z-10 rounded-full border-dark-200 p-1 hover:bg-blue-500`}
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        <h3 className="header-md green_text_gradient text-lg">
          Prompt Example
        </h3>
      </div>

      <List>
        {prompts?.map((cate, index) => {
          return (
            <Accordion
              key={cate.id}
              open={open === index}
              icon={
                <ChevronDownIcon
                  strokeWidth={3}
                  color="white"
                  className={`mx-auto h-5 w-5 transition-transform ${
                    open === index ? 'rotate-180' : ''
                  }`}
                />
              }
            >
              <ListItem
                className="p-0 text-white hover:bg-dark-100"
                selected={open === index}
              >
                <AccordionHeader
                  onClick={() => handleOpen(index)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <SwatchIcon
                      strokeWidth={5}
                      color="white"
                      className="h-5 w-5"
                    />
                  </ListItemPrefix>
                  <Typography
                    color="white"
                    className="mr-auto text-base font-normal"
                  >
                    {cate.title}
                  </Typography>
                </AccordionHeader>
              </ListItem>

              <AccordionBody className="py-1">
                <List className="p-0 text-sm text-gray-300">
                  {cate.Prompt?.map((item) => {
                    return (
                      <ListItem
                        key={item.id}
                        onClick={() => setGlobalPrompt(item.content)}
                        className="rounded-r-none border-r-4 border-transparent hover:border-r-blue-500 hover:bg-dark-100 hover:text-white"
                      >
                        <ListItemPrefix>
                          <StopIcon strokeWidth={3} className="h-3 w-5" />
                        </ListItemPrefix>
                        {item.content}
                      </ListItem>
                    )
                  })}
                </List>
              </AccordionBody>
            </Accordion>
          )
        })}

        {isLoading && <Spinner color="blue" className="mx-auto" />}
      </List>
    </Resizable>
  )
}
