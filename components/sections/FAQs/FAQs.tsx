import SanityImage from '@/components/modules/SanityImage'
import SanityRichText from '@/components/modules/SanityRichText'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { BlockContent, FaqsSection, Settings } from '@/sanity.types'
import { cn } from '@/utils/cn'
import { sanityClient } from '@/utils/sanity/lib/client'

export default async function FAQs({ data }: { data: FaqsSection }) {
  const { title, description, image, columns } = data

  const settings = (await sanityClient.fetch(
    `*[_type == "settings"][0]`
  )) as Settings
  const faqs = settings?.faqs ?? []

  return (
    <div className="container max-w-5xl">
      <div className="text-center max-w-2xl mx-auto flex flex-col justify-center">
        <SanityImage
          src={image}
          width={540}
          height={320}
          alt={title}
          className="w-full h-80 object-contain mb-8"
        />

        <h1 className="text-4xl font-bold text-center mb-4">{title}</h1>

        <SanityRichText
          content={description as BlockContent}
          className="text-dark/70"
        />
      </div>

      <div className="mb-12">
        <Accordion
          type="multiple"
          className={cn(
            'w-full grid gap-x-8 gap-y-6',
            columns === 1 ? 'grid-cols-1' : 'grid-cols-2'
          )}
        >
          {faqs?.map((faq) => (
            <AccordionItem
              key={faq._key}
              value={faq._key}
              className="p-4 lg:p-6 rounded-[20px] border border-dark/20 [&[data-state='open']]:bg-dark [&[data-state='open']]:text-white shrink-0 transition duration-200"
            >
              <AccordionTrigger className="w-full text-left p-0 font-semibold text-lg lg:text-xl">
                {faq.question}
              </AccordionTrigger>

              <AccordionContent className="p-0 mt-3 text-white/70 text-lg lg:text-xl">
                <hr className="my-4 border-t border-white/20 w-5/6" />
                <SanityRichText content={faq.answer as BlockContent} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
