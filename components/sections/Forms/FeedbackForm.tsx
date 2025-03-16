'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import FormTextarea from '@/components/modules/FormTextarea'
import { createFeedbackAction } from '@/utils/supabase/server'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Form } from '@/components/ui/form'

const questions = [
  'In your own words, what service does PupErase offer (to both free account users and paid subscribers)?',
  'Was the website easy to navigate? If you encountered any difficulties, please describe them.',
  'Did you encounter any issues or bugs? If so, please describe.',
  'Did you find the language on the website clear and compelling? If not, please provide examples.',
  'How would you describe the PupErase brand and website aesthetics?',
  'Do you have any suggestions for features to add?',
  'Any other feedback or comments?'
]

const feedbackSchema = z.object({
  question_1_response: z.string().optional(),
  question_2_response: z.string().optional(),
  question_3_response: z.string().optional(),
  question_4_response: z.string().optional(),
  question_5_response: z.string().optional(),
  question_6_response: z.string().optional(),
  question_7_response: z.string().optional()
})

type FeedbackFormData = z.infer<typeof feedbackSchema>

export function FeedbackForm({ onSuccess }: { onSuccess: () => void }) {
  const form = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema)
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function onSubmit(data: FeedbackFormData) {
    setIsSubmitting(true)
    try {
      const response = await createFeedbackAction(data)
      if (response === 'Success') {
        form.reset()
        onSuccess()
      } else {
        // Handle error case
        console.error('Feedback submission failed:', response)
      }
    } catch (error) {
      console.error('feedback submission failed:', error)
    }
    setIsSubmitting(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {questions.map((question, index) => (
          <div key={index} className="space-y-2">
            <FormTextarea
              control={form.control}
              name={`question_${index + 1}_response`}
              label={question}
              placeholder="Your response..."
              theme="dark"
            />
          </div>
        ))}
        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
        </Button>
      </form>
    </Form>
  )
} 