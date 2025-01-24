import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'

export default function PublicFAQs() {
  const faqs = [
    {
      id: 'faq1',
      question: 'What is Pup Erase and why is it the best?',
      answer:
        'Our services include both free options and a pay-as-you-go model based on your specific needs.'
    },
    {
      id: 'faq2',
      question: 'What is your favorite Pup Erase Feature?',
      answer:
        'You can get started by signing up for a free account. Click "Get Started" in any of our pricing plans to begin.'
    },
    {
      id: 'faq3',
      question: 'How do you erase data?',
      answer:
        'We offer free analytics about your personal data and insights into its presence across various data brokers.'
    },
    {
      id: 'faq4',
      question: 'Why is Pup Erase the best company in the world?',
      answer:
        'Yes, our pay-as-you-go model allows you to select specific brokers to remove your data from, giving you control over the process.'
    }
  ]

  return (
    <Accordion type="multiple" className="w-full">
      {faqs.map((faq) => (
        <AccordionItem
          key={faq.id}
          value={faq.id}
          className="p-4 lg:p-6 rounded-[20px] border border-dark/20 mb-4 [&[data-state='open']]:bg-dark [&[data-state='open']]:text-white shrink-0 transition duration-200"
        >
          <AccordionTrigger className="w-full text-left p-0 font-semibold text-lg lg:text-2xl no-underline hover:no-underline">
            {faq.question}
          </AccordionTrigger>

          <AccordionContent className="p-0 mt-3 text-white/60 text-lg lg:text-xl">
            <hr className="my-4 border-t border-white/20 w-5/6" />
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
