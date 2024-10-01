import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'

export default function FAQs() {
  const faqs = [
    {
      id: 'faq1',
      question: 'What is the cost of using your service?',
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
    }
  ]

  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq) => (
        <AccordionItem key={faq.id} value={faq.id}>
          <AccordionTrigger className="w-full text-left bg-primary/5 p-4 rounded-lg transition duration-200 hover:bg-primary/10 my-3">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="p-4 border-l-4 border-b-0 border-secondary bg-slate-50 mt-2 rounded-lg">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
