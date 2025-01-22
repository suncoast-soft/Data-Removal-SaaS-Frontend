import React from 'react'
import { Button } from '@/components/ui/button'
import { CalendarRange, ChevronRight, Clock5 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface Blog {
  category: string
  title: string
  date: string
  read: string
}

interface BlogSectionProps {
  title: string
  blogs: Blog[]
}

const categories = ['Category', 'Category', 'Category', 'Category']

const bestBlogs: BlogSectionProps[] = [
  {
    title: 'The Trojan Horses Haunting Your AI Models',
    blogs: Array(4).fill({
      category: 'Cybersecurity',
      title: 'The Crucial Role of the AI Red Team in Modern Cybersecurity',
      date: 'August 11, 2024',
      read: '12 minute read'
    })
  },
  {
    title: 'The Trojan Horses Haunting Your AI Models',
    blogs: Array(4).fill({
      category: 'Cybersecurity',
      title: 'The Crucial Role of the AI Red Team in Modern Cybersecurity',
      date: 'August 11, 2024',
      read: '12 minute read'
    })
  }
]

const BlogCategoryChip = ({ title }: { title: string }) => (
  <span className="px-4 py-2 border border-primary text-center rounded-full text-xs font-semibold">
    {title}
  </span>
)

const BlogCard = ({ blog }: { blog: Blog }) => (
  <div className="bg-gray rounded-2xl p-4 lg:min-w-[15rem] lg:w-[15rem]">
    <span className="px-3 py-2 border border-primary text-center rounded-full text-xs font-semibold">
      {blog.category}
    </span>
    <h4 className="font-bold my-4 text-base">{blog.title}</h4>
    <div className="flex justify-between">
      <div className="flex gap-1 items-center text-xs font-normal">
        <Clock5 className="w-3 text-primary" />
        <span>{blog.date}</span>
      </div>
      <div className="flex gap-1 items-center text-xs font-normal">
        <CalendarRange className="w-3 text-primary" />
        <span>{blog.read}</span>
      </div>
    </div>
  </div>
)

const BlogSection = ({ title, blogs }: BlogSectionProps) => (
  <div className="mt-10">
    <div className="flex justify-between items-center mb-6">
      <span className="px-3 py-2 bg-primary text-center rounded-full text-xs font-semibold text-dark">
        {title}
      </span>
      <div className="flex items-center">
        <Link
          href="/blog"
          className="text-sm font-semibold border-b border-dark hover:text-dark/90"
        >
          View all
        </Link>
        <ChevronRight className="h-5" />
      </div>
    </div>
    <div className="flex flex-wrap xl:flex-nowrap gap-4">
      {blogs.map((blog, index) => (
        <BlogCard key={index} blog={blog} />
      ))}
    </div>
  </div>
)

export default function BlogPage() {
  return (
    <div>
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

      <div className="container mx-auto px-4 lg:px-24 max-w-screen-lg">
        {bestBlogs.map((section, index) => (
          <BlogSection
            key={index}
            title={section.title}
            blogs={section.blogs}
          />
        ))}
        <div className="text-center flex flex-col lg:flex-row lg:gap-10 mt-16">
          <Image
            src={'/blog/book-now-image.png'}
            width={500}
            height={500}
            alt="Book Now"
          />
          <div className="max-w-sm text-left">
            <h2 className="text-2xl lg:text-4xl font-bold">
              Pup Erase is your all-in-one Cybersecurity Solution
            </h2>
            <Button
              variant="secondary"
              className="mt-4 font-semibold text-lg text-dark border-primary border-2 hover:bg-primary/10"
            >
              Book a Demo now
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
