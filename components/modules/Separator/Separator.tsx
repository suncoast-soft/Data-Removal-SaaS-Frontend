interface SeparatorProps {
  text: string
}

export default function Separator({ text }: SeparatorProps) {
  return (
    <div className="relative">
      <div className="relative flex items-center py-1">
        <div className="grow border-t border-white/70"></div>

        <span className="mx-3 shrink text-sm leading-8 text-white/70">
          {text}
        </span>

        <div className="grow border-t border-white/70"></div>
      </div>
    </div>
  )
}
