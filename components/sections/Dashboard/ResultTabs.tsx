'use client'

import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/utils/cn'
import { format } from 'date-fns'
import { ChevronDown } from 'lucide-react'
import React, { useState, ReactNode } from 'react'

type Tab = {
  value: string
  name: string
  count?: number
}

interface ResultTabsProps {
  tabs: Tab[]
  defaultValue?: string
  onChange?: (value: string) => void
  children: ReactNode
}

export default function ResultTabs({
  tabs = [],
  defaultValue,
  onChange,
  children
}: ResultTabsProps) {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const searchDates = ['1 Dec 2024', '2 Dec 2024', '11 Dec 2024', '12 Dec 2024']

  return (
    <Tabs defaultValue={defaultValue} className="w-full">
      <div className="flex mb-6 justify-between border-b border-dark/10 items-center flex-wrap">
        {/* Tab List */}
        <TabsList className="h-12 bg-transparent rounded-none !justify-start py-0 w-fit">
          {tabs.map((tablist) => (
            <TabsTrigger
              key={tablist.value}
              value={tablist.value}
              className="p-1 pb-0 lg:p-4 flex gap-2 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:font-bold text-xs lg:text-base lg:px-6 data-[state=active]:bg-transparent !pl-0 h-[55px] whitespace-pre-wrap"
              onClick={() => onChange?.(tablist.value)}
            >
              <span>
                {tablist.name} {tablist.count ? `(${tablist.count})` : ''}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Popover for Search Dates */}
        <Popover>
          <PopoverTrigger asChild>
            <div className="relative w-fit flex justify-end">
              <Button
                type="button"
                variant="outline"
                className={cn(
                  'w-full lg:w-fit flex items-center gap-4 pl-[52px] bg-transparent border-none hover:bg-transparent hover:text-dark font-normal text-dark justify-start p-0 text-center h-[53px]'
                )}
              >
                <span className="opacity-60 text-left leading-[20px]">
                  Last Scan: <br />
                  {date ? format(date, 'yyyy-MM-dd') : 'N/A'}
                </span>
                <ChevronDown />
              </Button>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <div className="flex flex-col">
              {searchDates.map((searchDate, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  className="no-underline p-0 h-fit hover:!bg-gray-100 py-2 px-4 rounded-none border-none justify-start"
                  onClick={() => setDate(new Date(searchDate))}
                >
                  <span className="text-lg text-dark font-normal opacity-90">
                    {searchDate}
                  </span>
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
      {children}
    </Tabs>
  )
}
