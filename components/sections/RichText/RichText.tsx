import SanityRichText from '@/components/modules/SanityRichText'
import { BlockContent, RichTextSection } from '@/sanity.types'

export default function RichText({ data }: { data: RichTextSection }) {
  if (!data.content) {
    return <></>
  }

  return (
    <section className="py-12 lg:py-20">
      <div className="container max-w-7xl">
        {data.title && (
          <h2 className="text-2xl lg:text-4xl font-bold mb-8">{data.title}</h2>
        )}

        <SanityRichText content={data.content as BlockContent} />
      </div>
    </section>
  )
}
