import Title from '@/components/modules/Title'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FeaturedColumnsSection } from '@/sanity.types'
import { urlFor } from '@/utils/sanity/lib/image'
import Image from 'next/image'

export default function FeaturedColumns({
  data
}: {
  data: FeaturedColumnsSection
}) {
  const { title, subtitle, description, columns } = data

  return (
    <section className="bg-white my-16 lg:my-24">
      <div className="container mx-auto px-4 lg:px-28">
        <Title title={title} subtitle={subtitle} description={description} />

        <div className="mt-6 lg:mt-10 gap-10 flex items-center flex-col lg:flex-row">
          {columns?.map((column, index) => (
            <Card
              key={index}
              className="bg-transparent shadow-none border-none p-0 max-w-[364px]"
            >
              <CardHeader className="p-0">
                <CardTitle>
                  <div className="flex flex-col items-center">
                    {column.image && (
                      <Image
                        src={urlFor(column.image).width(200).url()}
                        width={200}
                        height={200}
                        alt={title ?? 'Image'}
                      />
                    )}
                  </div>
                </CardTitle>
              </CardHeader>

              <CardContent className="p-0 text-dark">
                <h3 className="text-2xl font-bold text-center mt-2 lg:mt-4">
                  {column.title}
                </h3>
                <p className="lg:mt-4 text-center lg:text-lg opacity-60">
                  {column.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
