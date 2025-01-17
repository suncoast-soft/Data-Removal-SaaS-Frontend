import SearchForm from '@/components/modules/AccountForms/SearchForm'
import CreateAccount from '@/components/modules/Landing/CreateAccount/CreateAccount'
import Features from '@/components/modules/Landing/Features'
import Pricing from '@/components/modules/Landing/Pricing'
import Process from '@/components/modules/Landing/Process/Process'
import { getUser } from '@/utils/supabase/queries'
import { createClient } from '@/utils/supabase/server'
import Image from 'next/image'
import { redirect } from 'next/navigation'

export default async function HomePage() {
  const supabase = createClient()
  const user = await getUser(supabase)

  if (user) {
    return redirect('/dashboard/reports')
  }

  return (
    <>
      <section className="bg-lp-hero-section-bg bg-cover bg-bottom pt-[21px] pb-7 lg:py-[135px]">
        <div className="container mx-auto px-4 lg:px-[110px]">
          <div className="flex-col flex items-center lg:flex-row gap-[42px] lg:gap-4">
            <div className="max-w-fit lg:max-w-[568px]">
              <h1 className="text-[34px] leading-[38px] lg:leading-[55px] lg:text-[50px] font-bold">
                Your private information is everywhere. Don’t believe us?{' '}
                <span className="bg-darkMain leading-[55px] text-white px-2 relative">
                  Take a look.{' '}
                  <Image
                    src={'/hero-section-arrow.png'}
                    width={281}
                    height={328}
                    alt={'Take a Look Arrow'}
                    className="hidden lg:block absolute -right-[19px] top-4"
                  />
                </span>
              </h1>
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
                src={'/hero-section-arrow-mb.png'}
                width={223}
                height={245}
                alt={'Take a Look Arrow'}
                className="lg:hidden absolute right-[25px] -top-[258px]"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="bg-blue50 mt-[60px] lg:mt-[100px]">
        <div className="container mx-auto px-4 lg:px-[110px] lg:py-[60px]">
          <Features />
        </div>
      </section>

      <section id="process" className="bg-white my-[70px] lg:my-[100px]">
        <div className="container mx-auto px-4 lg:px-[110px]">
          <Process />
        </div>
      </section>

      <section id="pricing-plans" className="bg-white my-[70px] lg:my-[100px]">
        <div className="container mx-auto px-4 lg:px-[110px]">
          <Pricing />
        </div>
      </section>

      <section
        id="create-your-account"
        className="bg-white my-[70px] lg:my-[100px]"
      >
        <div className="container mx-auto px-2 lg:px-[110px]">
          <CreateAccount />
        </div>
      </section>
    </>
  )
}
