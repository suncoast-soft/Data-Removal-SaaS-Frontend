import SanityImage from '@/components/modules/SanityImage'
import SanityRichText from '@/components/modules/SanityRichText'
import { Button } from '@/components/ui/button'
import { BlockContent, ImageCTASection } from '@/sanity.types'
import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'

export default function ImageCTA({ data }: { data: ImageCTASection }) {
  const { image, title, description, buttons } = data

  return (
    <section className="py-12 lg:py-20">
      <div className="container max-w-6xl">
        {title && (
          <h2 className="text-3xl lg:text-5xl font-bold text-dark text-center mb-12">
            {title}
          </h2>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5">
            <SanityImage src={image} width={500} height={500} alt={title} />
          </div>

          <div className="lg:col-span-7 lg:px-8 self-center">
            <SanityRichText content={description as BlockContent} />

            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-5">
              {buttons?.map((button, index) => (
                <Button
                  key={index}
                  variant={index === 0 ? 'secondary' : 'outline'}
                  asChild
                >
                  <Link href={button.link ?? ''}>
                    <span>{button.name}</span>
                    {index === 0 && <ArrowRightIcon className="ml-2" />}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
