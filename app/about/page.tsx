import OrangeCircleCheck from '@/components/icons/OrangeCircleCheck'
import { cn } from '@/utils/cn'
import Image from 'next/image'

interface TeamMember {
  name: string
  role: string
  description: string
}

const teamMembers: TeamMember[] = [
  {
    name: 'Jesse Giles',
    role: 'CEO & Co-Founder',
    description: 'Lorem ipsum dolor sit amet consecte adipiscing elit amet'
  },
  {
    name: 'Jesse Giles',
    role: 'CEO & Co-Founder',
    description: 'Lorem ipsum dolor sit amet consecte adipiscing elit amet'
  },
  {
    name: 'Jesse Giles',
    role: 'CEO & Co-Founder',
    description: 'Lorem ipsum dolor sit amet consecte adipiscing elit amet'
  },
  {
    name: 'Jesse Giles',
    role: 'CEO & Co-Founder',
    description: 'Lorem ipsum dolor sit amet consecte adipiscing elit amet'
  }
]

const data: string[] = [
  "We're not a subsidiary of some faceless corporation.",
  "We're not in bed with the data brokers profiting off your information.",
  "And we're not backed by venture capitalists eager to squeeze every dollar they can out of you.",
  "We're just a small, independent team of likeminded friends who believe everyone has the right to privacy."
]

export default async function AboutUsPage() {
  return (
    <>
      <section className="lg:bg-blue-dots-bg bg-cover bg-bottom pt-[21px] pb-7 lg:py-[92px]">
        <div className="container">
          <div className="flex-col flex items-center justify-center gap-10">
            <div className="max-w-5xl">
              <h1 className="text-4xl lg:text-5xl font-bold text-dark text-center mb-6">
                About Us
              </h1>

              <p className="text-dark/70 text-lg lg:text-xl mb-4">
                Remember when the internet was about exploration and
                self-expression? We sure do. And we’re just as frustrated as you
                that it has become the playground for predatory marketers,
                shadowy hackers, and other ne’er-do-wells.
              </p>

              <p className="text-dark/70 text-lg lg:text-xl mb-4">
                That’s why we’ve made it our mission to make the internet a bit
                safer for everyone. We can’t build a time machine, but we can
                keep prying eyes away from what they want most: your personal
                information.
              </p>

              <p className="text-dark/70 text-lg lg:text-xl mb-4">
                Protecting user privacy, or Pup, is our guiding principle. We
                long for a day when our service isn’t necessary. But until then,
                we’re focused on one thing: keeping your personal information
                personal.
              </p>
            </div>

            <div className="max-w-6xl px-4">
              <Image
                src={'/about-us-hero-image.png'}
                width={1220}
                height={555}
                alt={'Team image'}
                className="object-contain"
              />
            </div>

            <div className="lg:hidden flex gap-2.5 flex-wrap">
              {teamMembers.map((item, index) => (
                <div
                  key={index}
                  className="max-w-[48%] px-2.5 py-4 border border-dark/10 flex flex-col gap-2 justify-center items-center rounded-xl"
                >
                  <h4 className="font-bold text-[20px] text-dark">
                    {item.name}
                  </h4>
                  <h6 className="font-bold text-primary text-xs">
                    {item.role}
                  </h6>
                  <p className="text-center text-base text-dark/60">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <div className="container">
          <h1 className="text-5xl font-bold text-dark text-center mb-8">
            Why Trust Us
          </h1>

          <div className="text-center flex items-center flex-col lg:flex-row gap-[56px]">
            <div>
              <Image
                src={'/about-us-image.png'}
                width={536}
                height={538}
                alt={`Create Account`}
              />
            </div>

            <div className="mt-4 mb-6 lg:mb-[30px] flex flex-col flex-wrap justify-between gap-4 lg:gap-10 max-w-[651px]">
              {data.map((item, index) => (
                <div key={index} className={cn('flex gap-3 items-center')}>
                  <div className="[&>svg>g>path]:stroke-white [&>svg>g>path]:fill-secondary">
                    <OrangeCircleCheck />
                  </div>
                  <p className="font-normal text-base lg:text-[22px] lg:leading-[28px] text-left">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
