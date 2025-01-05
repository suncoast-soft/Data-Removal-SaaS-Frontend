'use client'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/utils/cn'
import { formatDate } from 'date-fns'
import { ChevronDown } from 'lucide-react'
import React, { useState } from 'react'

export default function ResultTabs({ tabs = [], ...props }: any) {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const searchDates = ['1 Dec 2024', '2 Dec 2024', '11 Dec 2024', '12 Dec 2024']
  return (
    <Tabs defaultValue={props.defaultValue} className="w-full">
      <div className="flex mb-6 justify-between border-b border-darkMain/10 items-center flex-wrap">
        <TabsList className="h-12 bg-transparentrounded-none !justify-start py-0 w-fit">
          {tabs.map((tablist: any, index: number) => (
            <TabsTrigger
              key={index}
              value={tablist.value}
              className="p-1 pb-0 lg:p-4 flex gap-2 data-[state=active]:border-b-2 data-[state=active]:border-greenMain data-[state=active]:font-bold text-xs lg:text-base lg:px-6 data-[state=active]:bg-transparent !pl-0 h-[55px] whitespace-pre-wrap"
              onChange={props.onChange}
            >
              <span>
                {tablist.name} {tablist.count ? `(${tablist.count})` : ''}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
        <Popover>
          <PopoverTrigger asChild>
            <div className="relative w-fit flex justify-end">
              <Button
                type="button"
                variant={'outline'}
                className={cn(
                  'w-full lg:w-fit flex items-center gap-4 pl-[52px] bg-transparent border-none border-white hover:bg-transparent hover:text-darkMain font-normal text-darkMain justify-start p-0 text-center h-[53px]'
                )}
              >
                <span className="opacity-60 text-left leading-[20px]">
                  Last Scan: <br />
                  {date && formatDate(date, 'yyyy-MM-dd')}
                </span>
                <ChevronDown />
              </Button>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <div className="flex flex-col">
              {searchDates.map((date) => (
                <Button
                  variant={'outline'}
                  className="no-underline p-0 h-fit hover:!bg-gray-100 py-2 px-4 rounded-none border-none justify-start"
                >
                  <span className="text-lg text-darkMain font-normal opacity-90">
                    {date}
                  </span>
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
      {props.children}
    </Tabs>
  )
}
