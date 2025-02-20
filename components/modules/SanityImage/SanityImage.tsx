import { urlFor } from '@/utils/sanity/lib/image'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import Image from 'next/image'

interface ModuleProps {
  src: SanityImageSource | undefined
  width: number
  height: number
  alt?: string | undefined
  className?: string | undefined
}

export default function SanityImage({
  src,
  width,
  height,
  alt,
  className
}: ModuleProps) {
  if (!src) {
    return <></>
  }

  return (
    <Image
      src={urlFor(src).width(width).url()}
      width={width}
      height={height}
      className={className}
      alt={alt ?? 'Image'}
    />
  )
}
