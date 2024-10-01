import ContactForm from '@/components/modules/AccountForms/ContactForm'
import FAQs from '@/components/modules/FAQs'
import Features from '@/components/modules/Features'
import Pricing from '@/components/modules/Pricing'
import Steps from '@/components/modules/Steps'
import Testimonials from '@/components/modules/Testimonials'
import { Button } from '@/components/ui/button'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function PricingPage() {
  const supabase = createClient()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (user) {
    return redirect('/dashboard')
  }

  return (
    <>
      <section className="bg-slate-100 py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold">
            Effortlessly Protect Your Privacy
          </h1>
          <p className="mt-4 text-xl">
            Quick, easy, and affordable service to remove your personal
            information from the internet.
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <Button variant="default" color="primary" asChild>
              <Link href="/signin/signup">Get Started for FREE</Link>
            </Button>
            <Button variant="default" color="white" asChild>
              <Link href="#how-it-works">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="features" className="bg-white py-20">
        <div className="container mx-auto px-6">
          <Features />
        </div>
      </section>

      <section id="pricing-plans" className="bg-slate-100 py-20">
        <div className="container mx-auto px-6">
          <Pricing />
        </div>
      </section>

      <section id="testimonials" className="bg-white py-20">
        <div className="container mx-auto px-6">
          <Testimonials />
        </div>
      </section>

      <section id="how-it-works" className="bg-slate-100 py-20">
        <div className="container mx-auto px-6">
          <Steps />
        </div>
      </section>

      <section id="faq" className="bg-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-10">
            Frequently Asked Questions
          </h2>

          <div className="max-w-3xl mx-auto">
            <FAQs />
          </div>
        </div>
      </section>

      <section id="contact" className="bg-slate-50 py-20">
        <div className="container mx-auto max-w-lg px-6">
          <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>

          <ContactForm />
        </div>
      </section>
    </>
  )
}
