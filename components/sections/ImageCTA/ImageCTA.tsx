import { Button } from '@/components/ui/button'
import { ImageCTASection } from '@/sanity.types'
import { urlFor } from '@/utils/sanity/lib/image'
import { ArrowRightIcon } from 'lucide-react'
import { PortableText } from 'next-sanity'
import Image from 'next/image'
import Link from 'next/link'

export default function ImageCTA({ data }: { data: ImageCTASection }) {
  const { image, title, description, buttons } = data

  return (
    <section id="create-your-account" className="bg-white my-16 lg:my-24">
      <div className="container mx-auto px-2 lg:px-28">
        <div className="text-center flex items-center flex-col lg:flex-row gap-8">
          <div className="order-2 lg:order-1 w-full lg:w-5/12 flex-shrink-0">
            {image && (
              <Image
                src={urlFor(image).width(500).url()}
                width={500}
                height={500}
                alt={title ?? 'Image'}
              />
            )}
          </div>

          <div className="order-1 lg:order-2 px-2">
            <h2 className="text-3xl lg:text-5xl font-bold lg:text-left text-dark text-center">
              {title}
            </h2>

            {description && <PortableText value={description} />}

            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-2 lg:gap-6 mt-4 lg:mt-10">
              {buttons?.map((button, index) => (
                <Button
                  key={index}
                  variant={index === 0 ? 'secondary' : 'outline'}
                  asChild
                >
                  <Link href={button.link ?? ''} className="no-underline">
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
