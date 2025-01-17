import OrangeCircleCheck from '@/components/icons/OrangeCircleCheck'
import { cn } from '@/utils/cn'
import { getUser } from '@/utils/supabase/queries'
import { createClient } from '@/utils/supabase/server'
import Image from 'next/image'
import { redirect } from 'next/navigation'

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
  const supabase = createClient()
  const user = await getUser(supabase)

  if (user) {
    return redirect('/dashboard/reports')
  }

  return (
    <>
      <AboutSection />
      <TrustSection />
    </>
  )
}

const AboutSection = () => (
  <section className="lg:bg-blue-dots-bg bg-cover bg-bottom pt-[21px] pb-7 lg:py-[92px]">
    <div className="mx-auto px-4 lg:px-[110px] max-w-[1440px]">
      <div className="flex-col flex items-center justify-center gap-10">
        <AboutContent />
        <TeamList />
      </div>
    </div>
  </section>
)

const AboutContent = () => (
  <div className="max-w-fit lg:max-w-[1138px] text-darkMain">
    <h1 className="text-[34px] leading-[38px] lg:leading-[55px] lg:text-[50px] font-bold text-center">
      About Us
    </h1>
    <p className="mt-4 text-base font-normal lg:text-[22px] lg:leading-[26px] text-center text-darkMain/60">
      Remember when the internet was about exploration and self-expression? We
      sure do. And we’re just as frustrated as you that it has become the
      playground for predatory marketers, shadowy hackers, and other
      ne’er-do-wells.
      <br /> <br />
      That’s why we’ve made it our mission to make the internet a bit safer for
      everyone. We can’t build a time machine, but we can keep prying eyes away
      from what they want most: your personal information.
      <br /> <br />
      Protecting user privacy, or Pup, is our guiding principle. We long for a
      day when our service isn’t necessary. But until then, we’re focused on one
      thing: keeping your personal information personal.
    </p>
    <Images />
  </div>
)

const Images = () => (
  <div className="relative">
    <Image
      src={'/about-us-hero-image-mb.png'}
      width={400}
      height={350}
      alt={'Team image'}
      className="lg:hidden"
    />
    <Image
      src={'/about-us-hero-image.png'}
      width={1220}
      height={555}
      alt={'Team image'}
      className="hidden lg:block"
    />
  </div>
)

const TeamList = () => (
  <div className="lg:hidden flex gap-2.5 flex-wrap">
    {teamMembers.map((item, index) => (
      <TeamItem key={index} item={item} />
    ))}
  </div>
)

const TrustSection = () => (
  <section className="mb-[60px] text-darkMain">
    <div className="mx-auto px-4 lg:px-[110px] max-w-[1440px]">
      <h1 className="text-[34px] leading-[38px] lg:leading-[55px] lg:text-[50px] font-bold text-center mb-[82px]">
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
        <TrustStatements />
      </div>
    </div>
  </section>
)

const TrustStatements = () => (
  <div className="mt-4 mb-6 lg:mb-[30px] flex flex-col flex-wrap justify-between gap-4 lg:gap-10 max-w-[651px]">
    {data.map((item, index) => (
      <StatementItem key={index} item={item} />
    ))}
  </div>
)

const StatementItem = ({ item }: { item: string }) => (
  <div className={cn('flex gap-3 items-center')}>
    <div className="[&>svg>g>path]:stroke-white [&>svg>g>path]:fill-orangeMain">
      <OrangeCircleCheck />
    </div>
    <p className="font-normal text-base lg:text-[22px] lg:leading-[28px] text-left">
      {item}
    </p>
  </div>
)

const TeamItem = ({ item }: { item: TeamMember }) => (
  <div className="max-w-[48%] px-2.5 py-4 border border-darkMain/10 flex flex-col gap-2 justify-center items-center rounded-xl">
    <h4 className="font-bold text-[20px] text-darkMain">{item.name}</h4>
    <h6 className="font-bold text-greenMain text-xs">{item.role}</h6>
    <p className="text-center text-base text-darkMain/60">{item.description}</p>
  </div>
)
