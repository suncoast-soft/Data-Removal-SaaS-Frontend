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

const ProfileCard = ({ name, role, description }: TeamMember) => {
  return (
    <div className="relative bg-white px-1 py-4 border border-dark/20 space-y-2 text-center rounded-xl">
      <h4 className="font-bold text-lg text-dark">{name}</h4>

      <h6 className="font-bold uppercase text-primary text-xs">{role}</h6>
      <p className="text-center text-xs text-dark/60">{description}</p>
    </div>
  )
}

export default async function AboutUsPage() {
  return (
    <>
      <section className="lg:bg-blue-dots-bg bg-cover bg-bottom py-12 lg:py-20">
        <div className="container">
          <div className="flex-col flex items-center justify-center gap-10">
            <div className="max-w-5xl">
              <h1 className="text-4xl lg:text-5xl font-bold text-dark text-center mb-6">
                About Us
              </h1>

              <p className="text-dark/70 lg:text-xl mb-4">
                Remember when the internet was about exploration and
                self-expression? We sure do. And we’re just as frustrated as you
                that it has become the playground for predatory marketers,
                shadowy hackers, and other ne’er-do-wells.
              </p>

              <p className="text-dark/70 lg:text-xl mb-4">
                That’s why we’ve made it our mission to make the internet a bit
                safer for everyone. We can’t build a time machine, but we can
                keep prying eyes away from what they want most: your personal
                information.
              </p>

              <p className="text-dark/70 lg:text-xl mb-4">
                Protecting user privacy, or Pup, is our guiding principle. We
                long for a day when our service isn’t necessary. But until then,
                we’re focused on one thing: keeping your personal information
                personal.
              </p>
            </div>

            <div className="max-w-6xl relative">
              <Image
                src={'/about-us-hero-image.png'}
                width={1220}
                height={555}
                alt={'Team image'}
                className="object-contain"
              />

              <div className="hidden lg:block absolute bottom-[16%] left-[1%] w-[17%]">
                <Image
                  src={'/icons/dot-arrow-2.svg'}
                  width={113}
                  height={283}
                  alt={'Arrow 2'}
                  className="w-1/2 h-auto absolute bottom-[20px] right-[24px]"
                />
                <ProfileCard
                  name={teamMembers[0].name}
                  role={teamMembers[0].role}
                  description={teamMembers[0].description}
                />
              </div>

              <div className="hidden lg:block absolute bottom-[32%] left-[19%] w-[17%]">
                <Image
                  src={'/icons/dot-arrow-3.svg'}
                  width={71}
                  height={89}
                  alt={'Arrow 3'}
                  className="w-1/3 h-auto absolute bottom-[100px] right-[24px]"
                />
                <ProfileCard
                  name={teamMembers[1].name}
                  role={teamMembers[1].role}
                  description={teamMembers[1].description}
                />
              </div>

              <div className="hidden lg:block absolute bottom-[3%] left-[32%] w-[17%]">
                <Image
                  src={'/icons/dot-arrow-4.svg'}
                  width={75}
                  height={191}
                  alt={'Arrow 4'}
                  className="w-1/3 h-auto absolute bottom-[120px] right-[24px]"
                />
                <ProfileCard
                  name={teamMembers[2].name}
                  role={teamMembers[2].role}
                  description={teamMembers[2].description}
                />
              </div>

              <div className="hidden lg:block absolute bottom-[24%] left-[50%] w-[17%]">
                <Image
                  src={'/icons/dot-arrow-5.svg'}
                  width={75}
                  height={191}
                  alt={'Arrow 5'}
                  className="w-1/2 h-auto absolute bottom-[120px] left-[40px]"
                />
                <ProfileCard
                  name={teamMembers[3].name}
                  role={teamMembers[3].role}
                  description={teamMembers[3].description}
                />
              </div>

              <div className="hidden lg:block absolute bottom-[2%] left-[70%] w-[17%]">
                <Image
                  src={'/icons/dot-arrow-6.svg'}
                  width={75}
                  height={191}
                  alt={'Arrow 6'}
                  className="w-1/2 h-auto absolute bottom-[100px] left-[20px]"
                />
                <ProfileCard
                  name={teamMembers[4].name}
                  role={teamMembers[4].role}
                  description={teamMembers[4].description}
                />
              </div>

              <div className="hidden lg:block absolute bottom-[29%] left-[82%] w-[17%]">
                <Image
                  src={'/icons/dot-arrow-7.svg'}
                  width={75}
                  height={191}
                  alt={'Arrow 7'}
                  className="w-1/3 h-auto absolute bottom-[100px] right-[20px]"
                />
                <ProfileCard
                  name={teamMembers[5].name}
                  role={teamMembers[5].role}
                  description={teamMembers[5].description}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 lg:hidden gap-2">
              {teamMembers.map((item, index) => (
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

      <section className="mb-16">
        <div className="container max-w-6xl">
          <h1 className="text-4xl lg:text-5xl font-bold text-dark text-center mb-8">
            Why Trust Us
          </h1>

          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <Image
              src={'/about-us-image.png'}
              width={536}
              height={538}
              alt={`Create Account`}
              className="lg:w-[45%]"
            />

            <div className="lg:w-[55%] space-y-8">
              {data.map((item, index) => (
                <div key={index} className={cn('flex gap-3 items-center')}>
                  <div className="[&>svg>g>path]:stroke-white [&>svg>g>path]:fill-secondary">
                    <OrangeCircleCheck />
                  </div>
                  <p className="font-medium text-base lg:text-lg">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
