import ArrowRight from '@/components/icons/ArrowRight'
import GreenCircleCheck from '@/components/icons/GreenCircleCheck'
import OrangeCircleCheck from '@/components/icons/OrangeCircleCheck'
import SanityImage from '@/components/modules/SanityImage'
import Title from '@/components/modules/Title'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TwoColumnCTASection } from '@/sanity.types'
import { cn } from '@/utils/cn'
import Link from 'next/link'

export default function TwoColumnCTA({ data }: { data: TwoColumnCTASection }) {
  const { title, subtitle, description, columns } = data

  return (
    <section className="py-12 lg:py-20">
      <div className="container max-w-7xl">
        <Title title={title} subtitle={subtitle} description={description} />

        <div className="grid grid-cols-12 gap-3">
          {columns?.map((column) => (
            <div
              key={column._key}
              className={cn(
                'col-span-12',
                'lg:col-span-5',
                'lg:col-span-7',
                `lg:col-span-${column.columnWidth}`
              )}
            >
              <Card
                className={cn(
                  'border-2 border-dark rounded-3xl h-full',
                  column.backgroundType === 'white' ? 'bg-white' : 'bg-dark'
                )}
              >
                <CardHeader>
                  <p
                    className={cn(
                      'text-right text-2xl lg:text-3xl font-bold lg:mb-8',
                      column.backgroundType === 'white'
                        ? 'text-dark'
                        : 'text-secondary'
                    )}
                  >
                    Free
                  </p>

                  <div className="flex flex-col lg:flex-row lg:gap-12 items-center">
                    <SanityImage
                      src={column.image}
                      width={160}
                      height={160}
                      alt={title}
                      className="w-auth h-32"
                    />

                    <div>
                      <CardTitle
                        className={cn(
                          'text-3xl lg:text-4xl font-bold',
                          column.backgroundType === 'white'
                            ? 'text-dark'
                            : 'text-white'
                        )}
                      >
                        {column.title}
                      </CardTitle>

                      <p
                        className={cn(
                          'mt-4',
                          column.backgroundType === 'white'
                            ? 'text-dark/80'
                            : 'text-white'
                        )}
                      >
                        {column.description}
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <ul
                    className={cn(
                      'mt-4 lg:mt-10 mb-8 space-y-4',
                      (column.features?.length ?? 0) > 4 && 'lg:columns-2'
                    )}
                  >
                    {column.features?.map((feature, index) => (
                      <li key={index} className="flex gap-4 items-center">
                        {column.backgroundType === 'white' ? (
                          <GreenCircleCheck />
                        ) : (
                          <OrangeCircleCheck />
                        )}

                        <p
                          className={cn(
                            'font-bold text-lg',
                            column.backgroundType === 'white'
                              ? 'text-dark'
                              : 'text-white'
                          )}
                        >
                          {feature}
                        </p>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={
                      column.backgroundType === 'white' ? 'outline' : 'default'
                    }
                    asChild
                  >
                    <Link
                      href={column.buttonLink ?? ''}
                      className="inline-block w-fit"
                    >
                      <span className="mr-2">{column.buttonText}</span>
                      <ArrowRight />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
