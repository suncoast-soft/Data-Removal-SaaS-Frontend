import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { BadgeCent, ClipboardPenLine, ScrollText } from 'lucide-react'

export default function Pricing() {
  const cards = [
    {
      icon: <ClipboardPenLine className="mx-auto text-secondary w-auto h-12" />,
      title: 'FREE Signup',
      description:
        'Create your account for free and get started with our services instantly.',
      button: 'Create a Free Account',
      link: '/signin/signup'
    },
    {
      icon: <ScrollText className="mx-auto text-secondary w-auto h-12" />,
      title: 'FREE Analytics',
      description:
        'Get free analytics about your personal data by searching data brokers.',
      button: 'Start free analytics',
      link: '/signin/signup'
    },
    {
      icon: <BadgeCent className="mx-auto text-secondary w-auto h-12" />,
      title: 'Pay As You Go',
      description:
        'Select the brokers you want to remove your data from and pay based on your selection.',
      button: 'Get Started',
      link: '/signin/signup'
    }
  ]

  return (
    <>
      <h2 className="text-4xl font-bold text-center">Our Pricing Model</h2>
      <p className="mt-4 text-xl text-center">
        Flexible and transparent pricing to fit your needs.
      </p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
        {cards.map((card, index) => (
          <Card key={index} color="white" icon={card.icon}>
            <div className="text-center">
              <h3 className="text-2xl font-semibold mt-4">{card.title}</h3>
              <p className="mt-4 text-center my-4">{card.description}</p>
              <Button variant="slim" color="secondary" link={card.link}>
                {card.button}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </>
  )
}
