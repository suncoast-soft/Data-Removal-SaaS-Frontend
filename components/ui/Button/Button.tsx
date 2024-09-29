'use client'

import cn from 'classnames'
import React, { forwardRef, useRef, ButtonHTMLAttributes } from 'react'
import { mergeRefs } from 'react-merge-refs'

import LoadingDots from '@/components/ui/LoadingDots'

import styles from './Button.module.css'

interface Props
  extends ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  variant?: 'slim' | 'flat'
  size?: 'text' | 'icon'
  color?: 'black' | 'white' | 'primary' | 'secondary'
  active?: boolean
  width?: number
  loading?: boolean
  link?: string
}

const Button = forwardRef<HTMLButtonElement & HTMLAnchorElement, Props>(
  (props, buttonRef) => {
    const {
      className,
      variant = 'flat',
      size = 'text',
      color = 'black',
      children,
      active,
      width,
      loading = false,
      disabled = false,
      style = {},
      link,
      ...rest
    } = props

    const Component = link ? 'a' : 'button'
    const ref = useRef(null)

    const rootClassName = cn(
      styles.root,
      {
        [styles.slim]: variant === 'slim',
        [styles.icon]: size === 'icon',
        [styles.loading]: loading,
        [styles.disabled]: disabled
      },
      styles[color],
      className
    )

    return (
      <Component
        aria-pressed={active}
        data-variant={variant}
        ref={mergeRefs([ref, buttonRef])}
        className={rootClassName}
        style={{
          width,
          ...style
        }}
        {...(Component === 'a' ? { href: link } : { disabled })}
        {...rest}
      >
        {children}
        {loading && (
          <i className="flex pl-2 m-0">
            <LoadingDots />
          </i>
        )}
      </Component>
    )
  }
)

Button.displayName = 'Button'

export default Button
