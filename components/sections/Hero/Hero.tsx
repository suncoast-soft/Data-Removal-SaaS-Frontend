import Image from 'next/image'
import SearchForm from '../Forms/SearchForm'
import { HeroSection } from '@/sanity.types'
import ContactForm from '../Forms/ContactForm'
import OAuthForm from '../Forms/OAuthForm'
import SanityImage from '@/components/modules/SanityImage'

export default function Hero({
  slug,
  data
}: {
  slug: string | undefined
  data: HeroSection
}) {
  const { title, text, image, formType } = data

  if (slug === 'home') {
    return (
      <section className="bg-lp-hero-section-bg bg-cover bg-bottom py-6 lg:py-28">
        <div className="container max-w-sm lg:max-w-7xl px-4 lg:px-16">
          <div className="flex-col flex justify-between items-center lg:flex-row gap-10 lg:gap-4">
            <div className="max-w-fit lg:max-w-xl">
              <div className="relative text-[27px] lg:text-[44px] leading-tight font-bold">
                {text?.includes('Take a look.') ? (
                  <h1>
                    <span>{text.replace('Take a look.', '').trim()}</span>
                    <span className="ml-2 bg-dark leading-none text-white px-2 relative">
                      Take a look.{' '}
                    </span>
                  </h1>
                ) : (
                  <h1>{text}</h1>
                )}

                <Image
                  src={'/icons/dot-arrow-0.svg'}
                  width={250}
                  height={260}
                  alt={'Take a Look Arrow'}
                  className="hidden lg:block absolute top-32 right-14"
                />
              </div>

              {formType === 'search' ? (
                <SearchForm />
              ) : formType === 'contact' ? (
                <ContactForm />
              ) : formType === 'login' ? (
                <OAuthForm />
              ) : (
                <></>
              )}
            </div>

            <div className="relative">
              <SanityImage src={image} width={600} height={500} alt={title} />

              <Image
                src={'/icons/dot-arrow-1.svg'}
                width={160}
                height={200}
                alt={'Take a Look Arrow'}
                className="lg:hidden absolute right-[25px] -top-[200px]"
              />
            </div>
          </div>
        </div>
      </section>
    )
  } else if (slug === 'blog') {
    return (
      <div className="bg-lp-blog-section-bg bg-repeat bg-bottom py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-28">
          <div className="flex items-center flex-col lg:flex-row justify-between gap-8 lg:gap-16">
            <div className="rounded-3xl bg-transparent p-4 py-6 lg:pb-10 lg:p-10 lg:w-1/2 flex-shrink-0">
              <h1 className="font-bold text-3xl lg:text-[44px] leading-tight text-white mb-4">
                {title}
              </h1>

              <p className="font-light text-xl leading-snug tracking-wide mb-4 text-white/60">
                {text}
              </p>
            </div>

            {image && (
              <SanityImage src={image} width={600} height={500} alt={title} />
            )}
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="bg-lp-hero-section-bg bg-cover bg-bottom py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-28">
          <div className="flex items-center flex-col lg:flex-row justify-between gap-8 lg:gap-16">
            <div className="rounded-3xl bg-dark p-4 py-6 lg:pb-10 lg:p-10 lg:w-1/2 flex-shrink-0">
              <h1 className="font-bold text-3xl lg:text-[44px] leading-tight text-white mb-4">
                {title}
              </h1>

              <p className="font-light text-xl leading-snug tracking-wide mb-4 text-white/60">
                {text}
              </p>

              {formType === 'search' ? (
                <SearchForm />
              ) : formType === 'contact' ? (
                <ContactForm />
              ) : formType === 'login' ? (
                <OAuthForm />
              ) : (
                <></>
              )}
            </div>

            {image && (
              <SanityImage src={image} width={600} height={500} alt={title} />
            )}
          </div>
        </div>
      </div>
    )
  }
}
