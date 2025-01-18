interface ModuleProps {
  title: string
  subtitle?: string
  description: string
}

export default function SectionHeader({
  title,
  subtitle,
  description
}: ModuleProps) {
  return (
    <div className="text-center max-w-3xl mx-auto mb-12">
      {subtitle && (
        <h6 className="text-secondary text-lg font-extrabold tracking-widest uppercase mb-2">
          {subtitle}
        </h6>
      )}

      <h2 className="text-3xl lg:text-4xl font-bold text-center text-dark">
        {title}
      </h2>

      <p className="text-base lg:text-lg mt-4 text-dark/60 text-center">
        {description}
      </p>
    </div>
  )
}
