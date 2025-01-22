import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { cn } from '@/utils/cn'

export default function FAQs({
  accordionClassName,
  accordionContentClassName,
  accordionItemClassName,
  accordionTriggerClassName
}: {
  accordionClassName?: string
  accordionContentClassName?: string
  accordionItemClassName?: string
  accordionTriggerClassName?: string
}) {
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
    <Accordion type="multiple" className={cn('w-full', accordionClassName)}>
      {faqs.map((faq) => (
        <AccordionItem
          key={faq.id}
          value={faq.id}
          className={cn(
            "p-4 lg:p-6 rounded-[20px] border border-dark/20 mb-4 [&[data-state='open']]:bg-dark [&[data-state='open']]:text-white shrink-0 transition duration-200",
            accordionItemClassName
          )}
        >
          <AccordionTrigger
            className={cn(
              'w-full text-left p-0 font-semibold text-lg lg:text-2xl no-underline hover:no-underline',
              accordionTriggerClassName
            )}
          >
            {faq.question}
          </AccordionTrigger>

          <AccordionContent
            className={cn(
              'p-0 mt-3 text-white/60 text-lg lg:text-xl',
              accordionContentClassName
            )}
          >
            <hr className="my-4 border-t border-white/20 w-5/6" />
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
