import React from 'react'
import CardGroup from '@/components/sections/CardGroup'
import FeaturedCTA from '@/components/sections/ImageCTA'

const categories = ['Category', 'Category', 'Category', 'Category']

const blogSections = [
  {
    title: 'Cybersecurity',
    blogs: Array(4).fill({
      category: 'Cybersecurity',
      title: 'The Crucial Role of the AI Red Team in Modern Cybersecurity',
      date: 'August 11, 2024',
      read: '12 minute read'
    }),
    link: '#'
  },
  {
    title: 'Cybersecurity',
    blogs: Array(4).fill({
      category: 'Cybersecurity',
      title: 'The Crucial Role of the AI Red Team in Modern Cybersecurity',
      date: 'August 11, 2024',
      read: '12 minute read'
    }),
    link: '#'
  }
]

const BlogCategoryChip = ({ title }: { title: string }) => (
  <span className="px-4 py-2 border border-primary text-center rounded-full text-xs font-semibold">
    {title}
  </span>
)

export default function BlogPage() {
  return (
    <>
      <div className="hero bg-lp-blog-section-bg bg-cover bg-bottom pt-8 pb-12 text-white">
        <div className="container mx-auto px-4 lg:px-24 max-w-screen-lg">
          <div className="text-center max-w-md mx-auto">
            <h1 className="text-2xl lg:text-4xl font-bold leading-tight">
              The Pup Erase Blog
            </h1>
            <p className="mt-6 text-base lg:text-lg leading-7 opacity-60">
              Dig into product updates & company news, and learn how to become a
              cybersecurity expert.
            </p>
          </div>

          <div className="mt-6">
            <p className="text-center text-sm font-normal">
              Browse by category
            </p>
            <div className="flex overflow-x-auto gap-4 mt-4 justify-center">
              {categories.map((category, index) => (
                <BlogCategoryChip key={index} title={category} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-5xl mb-20">
        {blogSections.map((section, index) => (
          <CardGroup
            key={index}
            title={section.title}
            cards={section.blogs}
            link={section.link}
          />
        ))}
      </div>

      <div className="container max-w-6xl mb-20">
        <FeaturedCTA
          image="/blog/book-now-image.png"
          title="Pup Erase is your all-in-one Cybersecurity Solution"
          buttons={[{ name: 'Book a Demo Now', link: '/contact' }]}
        />
      </div>
    </>
  )
}
