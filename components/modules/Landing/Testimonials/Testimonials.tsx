import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Contact } from 'lucide-react'

interface Testimonial {
  image: JSX.Element
  name: string
  text: string
  role: string
}

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      image: <Contact className="mx-auto text-dark w-10 h-10" />,
      name: 'Sarah F.',
      text: 'The free analysis was eye-opening, and the process was seamless. I feel much safer now!',
      role: 'Marketing Manager'
    },
    {
      image: <Contact className="mx-auto text-dark w-10 h-10" />,
      name: 'David K.',
      text: 'Choosing and paying only for the brokers I wanted made it very affordable.',
      role: 'Software Engineer'
    },
    {
      image: <Contact className="mx-auto text-dark w-10 h-10" />,
      name: 'Michelle T.',
      text: 'The pay-as-you-go model is perfect. Great customer support and effective results!',
      role: 'HR Specialist'
    }
  ]

  return (
    <div className="container mx-auto px-4 lg:px-12">
      {/* Section Header */}
      <div className="text-center">
        <h2 className="text-3xl lg:text-4xl font-bold">What Our Users Say</h2>
        <p className="mt-4 text-lg lg:text-xl text-dark">
          See how our service has helped others protect their personal data.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <Card
            key={index}
            className="shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <CardHeader className="text-center">
              <CardTitle>{testimonial.image}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg italic">&quot;{testimonial.text}&quot;</p>
              <p className="mt-3 text-base font-bold">- {testimonial.name}</p>
              <p className="text-sm text-dark/80">{testimonial.role}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
