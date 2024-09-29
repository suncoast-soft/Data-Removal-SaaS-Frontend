import React, { InputHTMLAttributes, ChangeEvent } from 'react'
import cn from 'classnames'

import s from './Input.module.css'

interface Props extends Omit<InputHTMLAttributes<any>, 'onChange'> {
  variant?: 'black' | 'white'
  className?: string
  onChange?: (value: string) => void
}
const Input = (props: Props) => {
  const {
    variant = 'black',
    type,
    className,
    children,
    onChange,
    ...rest
  } = props

  const rootClassName = cn(s.root, s[variant], className)

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (onChange) {
      onChange(e.target.value)
    }
    return null
  }

  return (
    <label>
      {type === 'textarea' ? (
        <textarea
          className={rootClassName}
          onChange={handleOnChange}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          {...rest}
        />
      ) : (
        <input
          type={type}
          className={rootClassName}
          onChange={handleOnChange}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          {...rest}
        />
      )}
    </label>
  )
}

export default Input
