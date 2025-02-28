import { ReactNode } from 'react'

interface ModuleProps {
  title: string
  cta1?: ReactNode
  cta2?: ReactNode
}

export default function SectionHeader({ title, cta1, cta2 }: ModuleProps) {
  return (
    <div className="flex gap-6 flex-col lg:flex-row lg:justify-between lg:items-center mt-12 mb-8">
      <h1 className="text-2xl lg:text-3xl font-bold text-dark">{title}</h1>

      <div className="flex gap-3">
        {cta1 && cta1}
        {cta2 && cta2}
      </div>
    </div>
  )
}
