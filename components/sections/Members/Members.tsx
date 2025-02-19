import { MembersSection } from '@/sanity.types'
import { urlFor } from '@/utils/sanity/lib/image'
import { PortableText } from 'next-sanity'
import Image from 'next/image'

const ProfileCard = ({
  name,
  role,
  description
}: {
  name?: string
  role?: string
  description?: string
}) => {
  return (
    <div className="relative bg-white px-1 py-4 border border-dark/20 space-y-2 text-center rounded-xl">
      <h4 className="font-bold text-lg text-dark">{name}</h4>

      <h6 className="font-bold uppercase text-primary text-xs">{role}</h6>
      <p className="text-center text-xs text-dark/60">{description}</p>
    </div>
  )
}

export default function Members({ data }: { data: MembersSection }) {
  const { title, description, background_image, members } = data

  return (
    <section className="lg:bg-blue-dots-bg bg-cover bg-bottom py-12 lg:py-20">
      <div className="container">
        <div className="flex-col flex items-center justify-center gap-10">
          <div className="max-w-5xl">
            <h1 className="text-4xl lg:text-5xl font-bold text-dark text-center mb-6">
              {title}
            </h1>

            {description && <PortableText value={description} />}
          </div>

          <div className="max-w-6xl relative">
            {background_image && (
              <Image
                src={urlFor(background_image).width(1220).url()}
                width={1200}
                height={560}
                alt={title ?? 'Image'}
                className="object-contain"
              />
            )}

            {[
              {
                bottom: '16%',
                left: '1%',
                imageSrc: '/icons/dot-arrow-2.svg',
                imgWidth: 113,
                imgHeight: 283,
                imgClass: 'w-1/2 h-auto absolute bottom-[20px] right-[24px]'
              },
              {
                bottom: '32%',
                left: '19%',
                imageSrc: '/icons/dot-arrow-3.svg',
                imgWidth: 71,
                imgHeight: 89,
                imgClass: 'w-1/3 h-auto absolute bottom-[100px] right-[24px]'
              },
              {
                bottom: '3%',
                left: '32%',
                imageSrc: '/icons/dot-arrow-4.svg',
                imgWidth: 75,
                imgHeight: 191,
                imgClass: 'w-1/3 h-auto absolute bottom-[120px] right-[24px]'
              },
              {
                bottom: '24%',
                left: '50%',
                imageSrc: '/icons/dot-arrow-5.svg',
                imgWidth: 75,
                imgHeight: 191,
                imgClass: 'w-1/2 h-auto absolute bottom-[120px] left-[40px]'
              },
              {
                bottom: '2%',
                left: '70%',
                imageSrc: '/icons/dot-arrow-6.svg',
                imgWidth: 75,
                imgHeight: 191,
                imgClass: 'w-1/2 h-auto absolute bottom-[100px] left-[20px]'
              },
              {
                bottom: '29%',
                left: '82%',
                imageSrc: '/icons/dot-arrow-7.svg',
                imgWidth: 75,
                imgHeight: 191,
                imgClass: 'w-1/3 h-auto absolute bottom-[100px] right-[20px]'
              }
            ].map((pos, index) => (
              <div
                key={index}
                className={`hidden lg:block absolute bottom-[${pos.bottom}] left-[${pos.left}] w-[17%]`}
              >
                {members?.[index] && (
                  <>
                    <Image
                      src={pos.imageSrc}
                      width={pos.imgWidth}
                      height={pos.imgHeight}
                      alt={`Arrow ${index + 2}`}
                      className={pos.imgClass}
                    />
                    <ProfileCard
                      name={members?.[index]?.name ?? ''}
                      role={members?.[index].role ?? ''}
                      description={members?.[index].description ?? ''}
                    />
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 lg:hidden gap-2">
            {members?.map((item, index) => (
              <ProfileCard
                key={index}
                name={item.name}
                role={item.role}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
