'use client'

import React from 'react'
import Link from 'next/link'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { usePathname } from 'next/navigation'
import { slugToTitle } from '@/utils/helpers'

export default function DashboardBreadcrumb() {
  const currentPath = usePathname()

  const segments = currentPath.split('/').filter(Boolean)

  return (
    <Breadcrumb className="">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={`/${segments[0]}`}>
              {slugToTitle(decodeURIComponent(segments[0]))}
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator />

        {segments.length > 1 ? (
          <>
            {segments.slice(1).map((segment, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={`/${segments.slice(0, index + 2).join('/')}`}>
                      {slugToTitle(decodeURIComponent(segment))}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {index < segments.length - 2 && <BreadcrumbSeparator />}
              </React.Fragment>
            ))}
          </>
        ) : (
          <BreadcrumbItem>
            <BreadcrumbPage>Home</BreadcrumbPage>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
