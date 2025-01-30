import Title from '@/components/modules/Title'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'

interface ColumnProps {
  image: string
  title: string
  description: string
}

interface SectionProps {
  title: string
  subtitle?: string
  description: string
  columns: ColumnProps[]
}

export default function FeaturedColumns({
  title,
  subtitle,
  description,
  columns
}: SectionProps) {
  return (
    <>
      <Title title={title} subtitle={subtitle} description={description} />

      <div className="mt-6 lg:mt-10 gap-10 flex items-center flex-col lg:flex-row">
        {columns.map((column, index) => (
          <Card
            key={index}
            className="bg-transparent shadow-none border-none p-0 max-w-[364px]"
          >
            <CardHeader className="p-0">
              <CardTitle>
                <div className="flex flex-col items-center">
                  <Image
                    src={column.image}
                    width={200}
                    height={200}
                    alt={`Feature ${index + 1}`}
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
    </>
  )
}
