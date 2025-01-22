import SearchForm from '@/components/modules/AccountForms/SearchForm'
import FeaturedCTA from '@/components/sections/FeaturedCTA'
import FeaturedColumns from '@/components/sections/FeaturedColumns'
import PricingTable from '@/components/sections/PricingTable'
import Image from 'next/image'

export default async function HomePage() {
  return (
    <>
      <section className="bg-lp-hero-section-bg bg-cover bg-bottom py-6 lg:py-28">
        <div className="container max-w-sm lg:max-w-full px-4 lg:px-16">
          <div className="flex-col flex items-center lg:flex-row gap-10 lg:gap-4">
            <div className="max-w-fit lg:max-w-xl">
              <div className="relative text-3xl lg:text-5xl leading-wide font-bold">
                <h1>
                  <span>
                    Your private information is everywhere. Don’t believe us?
                  </span>
                  <span className="ml-2 bg-dark leading-[55px] text-white px-2 relative">
                    Take a look.{' '}
                  </span>
                </h1>

                <Image
                  src={'/icons/dot-arrow-0.svg'}
                  width={300}
                  height={312}
                  alt={'Take a Look Arrow'}
                  className="hidden lg:block absolute top-28 right-6"
                />
              </div>

              <SearchForm />
            </div>

            <div className="relative">
              <Image
                src={'/hero-image.png'}
                width={634}
                height={530}
                alt={'Take a Look'}
                className="hidden lg:block"
              />
              <Image
                src={'/hero-image-mb.png'}
                width={398}
                height={370}
                alt={'Take a Look'}
                className="lg:hidden"
              />
              <Image
                src={'/icons/dot-arrow-1.svg'}
                width={180}
                height={230}
                alt={'Take a Look Arrow'}
                className="lg:hidden absolute right-[25px] -top-[228px]"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="bg-[#F9FCFF] mt-16 lg:mt-24">
        <div className="container mx-auto px-4 lg:px-28 py-10 lg:py-16">
          <FeaturedColumns
            title="Prying eyes are eager to access your information"
            description="Lorem ipsum dolor sit amet consectetur adipiscing elit tortor eu egestas morbi sem vulputate etiam facilisis pellentesque ut quis."
            columns={[
              {
                image: '/lp-features-1.png',
                title: 'Data Removal',
                description:
                  'We help you remove your personal information from various websites, safeguarding your privacy.'
              },
              {
                image: '/lp-features-2.png',
                title: 'Regular Monitoring',
                description:
                  'Our regular monitoring ensures that your private information doesn`t reappear on the internet.'
              },
              {
                image: '/lp-features-3.png',
                title: 'Customer Support',
                description:
                  'Get access to our dedicated customer support team who are ready to assist you 24/7.'
              }
            ]}
          />
        </div>
      </section>

      <section id="process" className="bg-white my-16 lg:my-24">
        <div className="container mx-auto px-4 lg:px-28">
          <FeaturedColumns
            title="Get started as easy as 1, 2, 3"
            subtitle="Our process"
            description="Lorem ipsum dolor sit amet consectetur adipiscing elit tortor eu egestas morbi sem vulputate etiam facilisis pellentesque ut quis."
            columns={[
              {
                image: '/lp-process-1.png',
                title: 'Create an account',
                description:
                  'Lorem ipsum dolor sit amet consecte tur adipiscing elit semper dalar consectur elementum tempus hac.'
              },
              {
                image: '/lp-process-2.png',
                title: 'Run a quick search',
                description:
                  'Lorem ipsum dolor sit amet consecte tur adipiscing elit semper dalar consectur elementum tempus hac.'
              },
              {
                image: '/lp-process-3.png',
                title: 'We remove your info',
                description:
                  'Lorem ipsum dolor sit amet consecte tur adipiscing elit semper dalar consectur elementum tempus hac.'
              }
            ]}
          />
        </div>
      </section>

      <section id="pricing-plans" className="bg-white my-16 lg:my-24">
        <div className="container mx-auto px-4 lg:px-24">
          <PricingTable />
        </div>
      </section>

      <section id="create-your-account" className="bg-white my-16 lg:my-24">
        <div className="container mx-auto px-2 lg:px-28">
          <FeaturedCTA />
        </div>
      </section>
    </>
  )
}
