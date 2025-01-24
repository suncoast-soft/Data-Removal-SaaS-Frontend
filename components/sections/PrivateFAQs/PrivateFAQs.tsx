import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'

const faqs = [
  {
    id: 'faq1',
    question: 'How much does it cost to remove my data?',
    answer:
      'Our services include both free options and a pay-as-you-go model based on your specific needs.'
  },
  {
    id: 'faq2',
    question: 'How do I get started?',
    answer:
      'You can get started by signing up for a free account. Click "Get Started" in any of our pricing plans to begin.'
  },
  {
    id: 'faq3',
    question: 'What kind of analytics does your service provide?',
    answer:
      'We offer free analytics about your personal data and insights into its presence across various data brokers.'
  },
  {
    id: 'faq4',
    question: 'Can I choose which data brokers to remove my data from?',
    answer:
      'Yes, our pay-as-you-go model allows you to select specific brokers to remove your data from, giving you control over the process.'
  },
  {
    id: 'faq5',
    question: 'How long does the data removal process take?',
    answer:
      'The time it takes to remove your data varies by broker, but we typically indicate estimated timelines in your dashboard after signing up.'
  },
  {
    id: 'faq6',
    question: 'Is my personal information safe with your service?',
    answer:
      'Absolutely! We prioritize user privacy and employ industry-standard encryption and security measures to protect your data at all times.'
  }
]

export default function PrivateFAQs() {
  return (
    <div className="bg-result-faqs-bg rounded-2xl px-4 py-6 lg:px-8 lg:py-10">
      <div className="mb-4 lg:mb-8">
        <h2 className="text-2xl lg:text-3xl font-bold text-center ">FAQs</h2>

        <p className="text-dark/70 text-lg lg:text-xl mt-4 text-center">
          Learn more about how puperase works
        </p>
      </div>

      <Accordion
        type="multiple"
        className="w-full grid grid-cols-2 gap-2 lg:gap-4"
      >
        {faqs.map(({ id, question, answer }) => (
          <AccordionItem
            key={id}
            value={id}
            className={
              'p-4 lg:p-6 rounded-xl border mb-4 bg-white border-none transition duration-200'
            }
          >
            <AccordionTrigger className="w-full text-left p-0 font-semibold text-lg no-underline hover:no-underline [&[data-state=open]>div]:rotate-45">
              {question}
            </AccordionTrigger>

            <AccordionContent className="p-0 mt-3 text-lg text-dark/70">
              {answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
