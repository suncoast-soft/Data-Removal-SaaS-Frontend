import { RichTextSection } from '@/sanity.types'
import { PortableText } from '@portabletext/react'

export default function RichText({ data }: { data: RichTextSection }) {
  return (
    <section className="py-6 lg:py-28">
      <h2>{data.title}</h2>
      <PortableText value={data.content ?? []} />
    </section>
  )
}
