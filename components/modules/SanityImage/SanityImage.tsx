import Image, { ImageLoaderProps } from 'next/image'

const sanityLoader = ({ src, width, quality }: ImageLoaderProps) => {
  const prj = 'zp7mbokg'
  const dataset = 'production'
  const url = new URL(`https://cdn.sanity.io/images/${prj}/${dataset}${src}`)
  url.searchParams.set('auto', 'format')
  url.searchParams.set('fit', 'max')
  url.searchParams.set('w', width.toString())
  if (quality) {
    url.searchParams.set('q', quality.toString())
  }
  return url.href
}

export default function SanityImage() {
  return (
    <Image
      loader={sanityLoader}
      src="me.png"
      width={500}
      alt="Picture of the author"
    />
  )
}
