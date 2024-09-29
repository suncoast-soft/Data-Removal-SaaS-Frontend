import { ReactNode } from 'react'

import styles from './Card.module.css'
import { cn } from '@/utils/cn'

interface Props {
  icon?: ReactNode
  color?: 'black' | 'white' | 'slate'
  title?: string
  description?: string
  footer?: ReactNode
  className?: string
  children: ReactNode
}

export default function Card({
  color = 'white',
  icon,
  title,
  description,
  footer,
  className,
  children
}: Props) {
  return (
    <div className={cn(styles.root, styles[color], className)}>
      <div className="px-5 py-4">
        {icon && icon}
        {title && <h3 className="mt-4 text-2xl font-semibold">{title}</h3>}
        {description && <p className="my-4">{description}</p>}
        {children}
      </div>
      {footer && (
        <div className="p-4 border-t rounded-b-md  text-slate-500">
          {footer}
        </div>
      )}
    </div>
  )
}
