import SanityImage from '@/components/modules/SanityImage'
import Title from '@/components/modules/Title'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FeaturedColumnsSection } from '@/sanity.types'

export default function FeaturedColumns({
  data
}: {
  data: FeaturedColumnsSection
}) {
  const { title, subtitle, description, columns } = data

  return (
    <section className="py-12 lg:py-20">
      <div className="container max-w-7xl">
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
                    <SanityImage
                      src={column.image}
                      width={200}
                      height={200}
                      alt={title}
                    />
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
