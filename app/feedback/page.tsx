'use client'

import { FeedbackForm } from '@/components/sections/Forms/FeedbackForm'
import { useState } from 'react'

export default function FeedbackPage() {
  const [isSuccess, setIsSuccess] = useState(false)

  if (isSuccess) {
    return (
      <div className="pt-4 pb-12 lg:pt-24 lg:pb-10">
        <div className="container mx-auto px-4">
          <div className="text-center mx-auto">
            <h1 className="text-2xl lg:text-4xl font-bold text-green-600">Thank you for your feedback!</h1>
            <p className="opacity-60 text-lg mt-4">
              We appreciate you taking the time to help us improve.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-4 pb-12 lg:pt-24 lg:pb-10">
      <div className="container mx-auto px-4">
        <div className="text-center mx-auto">
          <h1 className="text-2xl lg:text-4xl font-bold">Share Your Feedback</h1>
          <p className="opacity-60 text-lg mt-4 mb-6 lg:mb-8">
            We value your feedback and are constantly working to improve our service.
            Please share your thoughts with us below.
          </p>
        </div>
        <div className="max-w-2xl mx-auto">
          <FeedbackForm onSuccess={() => setIsSuccess(true)} />
        </div>
      </div>
    </div>
  )
} 