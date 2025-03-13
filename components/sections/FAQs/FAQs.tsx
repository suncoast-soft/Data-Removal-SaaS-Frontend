import SanityImage from '@/components/modules/SanityImage'
import SanityRichText from '@/components/modules/SanityRichText'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { BlockContent, FaqsSection } from '@/sanity.types'

export default function FAQs({ data }: { data: FaqsSection }) {
  const { title, description, image, faqs } = data

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

      <div className="mt-6 lg:mt-10">
        <Accordion type="multiple" className="w-full">
          {faqs?.map((faq) => (
            <AccordionItem
              key={faq._key}
              value={faq._key}
              className="p-4 lg:p-6 rounded-[20px] border border-dark/20 mb-4 [&[data-state='open']]:bg-dark [&[data-state='open']]:text-white shrink-0 transition duration-200"
            >
              <AccordionTrigger className="w-full text-left p-0 font-semibold text-lg lg:text-2xl">
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
