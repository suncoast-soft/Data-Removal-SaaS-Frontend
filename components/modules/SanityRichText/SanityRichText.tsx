import OrangeCircleCheck from '@/components/icons/OrangeCircleCheck'
import { BlockContent } from '@/sanity.types'
import { PortableText, PortableTextReactComponents } from 'next-sanity'
import Image from 'next/image'

const components: Partial<PortableTextReactComponents> = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-3xl lg:text-5xl font-bold mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl lg:text-4xl font-bold mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl lg:text-2xl font-semibold mb-3">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg lg:text-xl font-medium my-3">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="text-lg text-gray/80 mb-2">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-slate-300 pl-4 italic text-slate-500">
        {children}
      </blockquote>
    )
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-gray-900">{children}</strong>
    ),
    em: ({ children }) => <em className="italic text-gray-700">{children}</em>,
    link: ({ value, children }) => {
      const href = value?.href as string
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          {children}
        </a>
      )
    }
  },
  list: {
    bullet: ({ children }) => <ul className="list-none">{children}</ul>
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex gap-4 items-center mb-3">
        <span className="w-fit flex-shrink-0">
          <OrangeCircleCheck />
        </span>
        <p className="text-lg text-dark">{children}</p>
      </li>
    )
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null
      return (
        <div className="my-6 flex justify-center">
          <Image
            src={value.asset.url}
            alt={value.alt || 'Sanity Image'}
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
      )
    }
  }
}

export default function SanityRichText({
  value
}: {
  value: BlockContent | undefined
}) {
  if (!value) {
    return <></>
  }

  return (
    <div className="mb-8">
      <PortableText value={value} components={components} />
    </div>
  )
}
