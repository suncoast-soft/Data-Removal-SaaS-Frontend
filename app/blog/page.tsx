import { Button } from '@/components/ui/button'
import { CalendarRange, ChevronRight, Clock5 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function BlogPage() {
  const categories = [
    { title: 'Category' },
    { title: 'Category' },
    { title: 'Category' },
    { title: 'Category' }
  ]

  const bestBlogs = [
    {
      category: 'Cybersecurity',
      title: 'The Trojan Horses Haunting Your Al Models',
      date: 'August 11, 2024',
      read: '12 minute read',
      list: [
        {
          category: 'Cybersecurity',
          title: 'The Crucial Role of the AI Red Team in Modern Cybersecurity',
          date: 'August 11, 2024',
          read: '12 minute read'
        },

        {
          category: 'Cybersecurity',
          title: 'The Crucial Role of the AI Red Team in Modern Cybersecurity',
          date: 'August 11, 2024',
          read: '12 minute read'
        },

        {
          category: 'Cybersecurity',
          title: 'The Crucial Role of the AI Red Team in Modern Cybersecurity',
          date: 'August 11, 2024',
          read: '12 minute read'
        },

        {
          category: 'Cybersecurity',
          title: 'The Crucial Role of the AI Red Team in Modern Cybersecurity',
          date: 'August 11, 2024',
          read: '12 minute read'
        }
      ]
    },
    {
      category: 'Cybersecurity',
      title: 'The Trojan Horses Haunting Your Al Models',
      date: 'August 11, 2024',
      read: '12 minute read',
      list: [
        {
          category: 'Cybersecurity',
          title: 'The Crucial Role of the AI Red Team in Modern Cybersecurity',
          date: 'August 11, 2024',
          read: '12 minute read'
        },

        {
          category: 'Cybersecurity',
          title: 'The Crucial Role of the AI Red Team in Modern Cybersecurity',
          date: 'August 11, 2024',
          read: '12 minute read'
        },

        {
          category: 'Cybersecurity',
          title: 'The Crucial Role of the AI Red Team in Modern Cybersecurity',
          date: 'August 11, 2024',
          read: '12 minute read'
        },

        {
          category: 'Cybersecurity',
          title: 'The Crucial Role of the AI Red Team in Modern Cybersecurity',
          date: 'August 11, 2024',
          read: '12 minute read'
        }
      ]
    },
    {
      category: 'Cybersecurity',
      title: 'The Trojan Horses Haunting Your Al Models',
      date: 'August 11, 2024',
      read: '12 minute read',
      list: [
        {
          category: 'Cybersecurity',
          title: 'The Crucial Role of the AI Red Team in Modern Cybersecurity',
          date: 'August 11, 2024',
          read: '12 minute read'
        },

        {
          category: 'Cybersecurity',
          title: 'The Crucial Role of the AI Red Team in Modern Cybersecurity',
          date: 'August 11, 2024',
          read: '12 minute read'
        },

        {
          category: 'Cybersecurity',
          title: 'The Crucial Role of the AI Red Team in Modern Cybersecurity',
          date: 'August 11, 2024',
          read: '12 minute read'
        },

        {
          category: 'Cybersecurity',
          title: 'The Crucial Role of the AI Red Team in Modern Cybersecurity',
          date: 'August 11, 2024',
          read: '12 minute read'
        }
      ]
    },
    {
      category: 'Cybersecurity',
      title: 'The Trojan Horses Haunting Your Al Models',
      date: 'August 11, 2024',
      read: '12 minute read',
      list: [
        {
          category: 'Cybersecurity',
          title: 'The Crucial Role of the AI Red Team in Modern Cybersecurity',
          date: 'August 11, 2024',
          read: '12 minute read'
        },

        {
          category: 'Cybersecurity',
          title: 'The Crucial Role of the AI Red Team in Modern Cybersecurity',
          date: 'August 11, 2024',
          read: '12 minute read'
        },

        {
          category: 'Cybersecurity',
          title: 'The Crucial Role of the AI Red Team in Modern Cybersecurity',
          date: 'August 11, 2024',
          read: '12 minute read'
        },

        {
          category: 'Cybersecurity',
          title: 'The Crucial Role of the AI Red Team in Modern Cybersecurity',
          date: 'August 11, 2024',
          read: '12 minute read'
        }
      ]
    }
  ]
  return (
    <div>
      <div className="hero bg-lp-blog-section-bg bg-cover bg-bottom pt-[31px] pb-[47px] lg:pb-[40px] text-white">
        <div className="container mx-auto px-4 lg:px-[110px] max-w-[1245px]">
          <div className="text-center max-w-[475px] mx-auto">
            <h1 className="text-[34px] lg:text-[50px] leading-[55px] font-bold text-center ">
              The Pup Erase Blog
            </h1>
            <p className="mt-6 lg:mt-4 text-lg leading-[18px] lg:text-[22px] lg:leading-[26px]  text-center opacity-60">
              Dig into product updates & company news, and learn how to become a
              cybersecurity expert.
            </p>
          </div>
          <div className="mt-5 mb-8">
            <p className="text-center text-sm font-normal">
              Browse by category
            </p>
            <div className="flex overflow-x-auto gap-[14px] mt-2 justify-center">
              {categories.map((c) => (
                <span className="px-6 py-2 border-[1.4px] border-greenMain text-center rounded-[33px] text-xs font-semibold">
                  {c.title}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center lg:flex-row gap-[27px] lg:gap-[51px]">
            <Image
              src={'/blog/hero-image.png'}
              width={589}
              height={448}
              alt={`Vector`}
            />
            <div className="flex flex-col gap-[27px] lg:gap-6 max-w-[380px]">
              <span className="px-3 py-2 bg-greenMain text-center rounded-[33px]  text-xs font-semibold text-darkMain w-fit">
                Cybersecurity
              </span>
              <h2 className="text-[22px] leading-6 font-bold lg:text-[32px] lg:leading-[30px]">
                The Crucial Role of the AI Red Team in Modern Data Security
              </h2>
              <p className="opacity-60 text-base leading-[18px] font-normal lg:text-[22px] lg:leading-[26px]">
                Introduction In the fourth chapter of navigating Al/ML security
                concerns, lets explore...
              </p>
              <hr className="opacity-20 border-white" />
              <div className="flex gap-4">
                <div className="flex gap-2 items-center text-base font-normal">
                  <Clock5 className="w-5 text-greenMain" />
                  <span>August 11, 2024</span>
                </div>
                <div className="flex gap-2 items-center text-base font-normal">
                  <CalendarRange className="w-5 text-greenMain" />
                  <span>12 minute read</span>
                </div>
              </div>
              <div className="border border-greenMain rounded-xl p-6 w-fit">
                <span className="text-base leading-[19.2px] font-bold mb-2.5">
                  You need to keep up with AI/ML security in a time of constant
                  change
                </span>

                <Link
                  href={'/blog'}
                  className="text-xs leading-[14px] transition ease-in-out duration-75 cursor-pointer text-greenMain hover:text-greenMain/90 font-bold no-underline border-b border-greenMain"
                >
                  Learn how ProtectAI can help you
                </Link>
              </div>
            </div>
          </div>
          <hr className="opacity-60 border-white mt-8 mb-6 lg:mt-[50px] lg:mb-8" />
          <div>
            <h3 className="font-bold text-[24px] leading-7 mb-6 lg:mb-4">
              The Best of the ProtectAI Blog
            </h3>
            <div className="flex flex-wrap xl:flex-nowrap items-center gap-2 lg:gap-4">
              {bestBlogs.map((b) => (
                <div className="lg:min-w-[241px] lg:w-[241px] bg-darkSecondary rounded-2xl p-4">
                  <span className="px-3 py-2 border-[1.4px] border-greenMain text-center rounded-[33px] text-xs font-semibold">
                    {b.category}
                  </span>
                  <h4 className="font-bold my-4 lg:my-6 text-lg leading-[21px]">
                    {b.title}
                  </h4>
                  <div className="flex justify-between">
                    <div className="flex gap-1 items-center text-xs font-normal">
                      <Clock5 className="w-3 text-greenMain" />
                      <span>{b.date}</span>
                    </div>
                    <div className="flex gap-1 items-center text-xs font-normal">
                      <CalendarRange className="w-3 text-greenMain" />
                      <span>{b.read}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-[110px] max-w-[1245px]">
        <div className="mt-[60px] mb-6 lg:my-[33px]">
          <div className="flex justify-between mb-6 lg:mb-8">
            <span className="px-3 py-2 bg-greenMain text-center rounded-[33px]  text-xs font-semibold text-darkMain w-fit">
              Cybersecurity
            </span>
            <div className="flex items-center">
              <Link
                href="/blog"
                className="text-base leading-[19px] transition ease-in-out duration-75 cursor-pointer text-darkMain hover:text-darkMain/90 font-semibold no-underline border-b border-darkMain"
              >
                View all
              </Link>
              <ChevronRight className="h-[20px]" />
            </div>
          </div>
          <div className="flex flex-wrap xl:flex-nowrap items-center gap-[14px] lg:gap-4">
            {bestBlogs[0].list.map((b) => (
              <div className="max-w-[48%] lg:min-w-[244px] lg:w-[244px] bg-white border-[1.4px] border-darkMain rounded-[14px] p-2 lg:p-4">
                <Image
                  src={'/blog/blog-thumbnail.png'}
                  width={209}
                  height={167}
                  alt={`Blog`}
                  className="w-full"
                />
                <h4 className="font-bold my-4 text-lg leading-[21px]">
                  {b.title}
                </h4>
                <div className="lg:flex  justify-between">
                  <div className="flex gap-1 items-center text-xs font-normal">
                    <Clock5 className="w-3 text-greenMain" />
                    <span>{b.date}</span>
                  </div>
                  <div className="flex gap-1 items-center text-xs font-normal">
                    <CalendarRange className="w-3 text-greenMain" />
                    <span>{b.read}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="hidden lg:my-[60px] lg:block">
          <div className="flex justify-between mb-6 lg:mb-8">
            <span className="px-3 py-2 bg-greenMain text-center rounded-[33px]  text-xs font-semibold text-darkMain w-fit">
              Cybersecurity
            </span>
            <div className="flex items-center">
              <Link
                href="/blog"
                className="text-base leading-[19px] transition ease-in-out duration-75 cursor-pointer text-darkMain hover:text-darkMain/90 font-semibold no-underline border-b border-darkMain"
              >
                View all
              </Link>
              <ChevronRight className="h-[20px]" />
            </div>
          </div>
          <div className="flex flex-wrap xl:flex-nowrap items-center gap-[14px] lg:gap-4">
            {bestBlogs[1].list.map((b) => (
              <div className="max-w-[48%] lg:min-w-[244px] lg:w-[244px] bg-white border-[1.4px] border-darkMain rounded-[14px] p-2 lg:p-4">
                <Image
                  src={'/blog/blog-thumbnail.png'}
                  width={209}
                  height={167}
                  alt={`Blog`}
                  className="w-full"
                />
                <h4 className="font-bold my-4 text-lg leading-[21px]">
                  {b.title}
                </h4>
                <div className="lg:flex  justify-between">
                  <div className="flex gap-1 items-center text-xs font-normal">
                    <Clock5 className="w-3 text-greenMain" />
                    <span>{b.date}</span>
                  </div>
                  <div className="flex gap-1 items-center text-xs font-normal">
                    <CalendarRange className="w-3 text-greenMain" />
                    <span>{b.read}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center flex items-center flex-col gap-6 lg:flex-row lg:gap-[50px]">
          <Image
            src={'/blog/book-now-image.png'}
            width={500}
            height={500}
            alt={`Book Now`}
          />
          <div className="max-w-[398px]">
            <h2 className="text-2xl lg:text-[32px] lg:leading-[38px] font-bold text-left text-darkMain">
              Pup Erase is your all-in-one Cybersecurity Solution
            </h2>
            <div className="mt-4 flex justify-start">
              <Button
                variant="secondary"
                color="white"
                className="w-full lg:w-[200px] z-10 font-semibold text-lg text-darkMain border-greenMain border-2"
                type="submit"
              >
                Book a Demo now
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-[60px] mb-6 lg:my-[33px]">
          <div className="flex justify-between mb-6 lg:mb-8">
            <span className="px-3 py-2 bg-greenMain text-center rounded-[33px]  text-xs font-semibold text-darkMain w-fit">
              Cybersecurity
            </span>
            <div className="flex items-center">
              <Link
                href="/blog"
                className="text-base leading-[19px] transition ease-in-out duration-75 cursor-pointer text-darkMain hover:text-darkMain/90 font-semibold no-underline border-b border-darkMain"
              >
                View all
              </Link>
              <ChevronRight className="h-[20px]" />
            </div>
          </div>
          <div className="flex flex-wrap xl:flex-nowrap items-center gap-[14px] lg:gap-4">
            {bestBlogs[2].list.map((b) => (
              <div className="max-w-[48%] lg:min-w-[244px] lg:w-[244px] bg-white border-[1.4px] border-darkMain rounded-[14px] p-2 lg:p-4">
                <Image
                  src={'/blog/blog-thumbnail.png'}
                  width={209}
                  height={167}
                  alt={`Blog`}
                  className="w-full"
                />
                <h4 className="font-bold my-4 text-lg leading-[21px]">
                  {b.title}
                </h4>
                <div className="lg:flex  justify-between">
                  <div className="flex gap-1 items-center text-xs font-normal">
                    <Clock5 className="w-3 text-greenMain" />
                    <span>{b.date}</span>
                  </div>
                  <div className="flex gap-1 items-center text-xs font-normal">
                    <CalendarRange className="w-3 text-greenMain" />
                    <span>{b.read}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="hidden lg:my-[60px] lg:block">
          <div className="flex justify-between mb-6 lg:mb-8">
            <span className="px-3 py-2 bg-greenMain text-center rounded-[33px]  text-xs font-semibold text-darkMain w-fit">
              Cybersecurity
            </span>
            <div className="flex items-center">
              <Link
                href="/blog"
                className="text-base leading-[19px] transition ease-in-out duration-75 cursor-pointer text-darkMain hover:text-darkMain/90 font-semibold no-underline border-b border-darkMain"
              >
                View all
              </Link>
              <ChevronRight className="h-[20px]" />
            </div>
          </div>
          <div className="flex flex-wrap xl:flex-nowrap items-center gap-[14px] lg:gap-4">
            {bestBlogs[3].list.map((b) => (
              <div className="max-w-[48%] lg:min-w-[244px] lg:w-[244px] bg-white border-[1.4px] border-darkMain rounded-[14px] p-2 lg:p-4">
                <Image
                  src={'/blog/blog-thumbnail.png'}
                  width={209}
                  height={167}
                  alt={`Blog`}
                  className="w-full"
                />
                <h4 className="font-bold my-4 text-lg leading-[21px]">
                  {b.title}
                </h4>
                <div className="lg:flex  justify-between">
                  <div className="flex gap-1 items-center text-xs font-normal">
                    <Clock5 className="w-3 text-greenMain" />
                    <span>{b.date}</span>
                  </div>
                  <div className="flex gap-1 items-center text-xs font-normal">
                    <CalendarRange className="w-3 text-greenMain" />
                    <span>{b.read}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center flex items-center flex-col gap-6 lg:flex-row lg:gap-[50px] mb-[30px] lg:mb-20">
          <div className="max-w-[398px]">
            <h2 className="text-2xl lg:text-[32px] lg:leading-[38px] font-bold text-left text-darkMain">
              Want to get articles like this in your inbox?
            </h2>
            <div className="mt-4 flex justify-start">
              <Button
                variant="secondary"
                color="white"
                className="w-full lg:w-[200px] z-10 font-semibold text-lg text-white bg-darkMain border-darkMain border-2 hover:bg-darkMain/90"
                type="submit"
                asChild
              >
                <Link href="/singin/singup" className="no-underline">
                  Sign Up now
                </Link>
              </Button>
            </div>
          </div>
          <Image
            src={'/blog/signup-now-image.png'}
            width={500}
            height={500}
            alt={`Book Now`}
          />
        </div>
      </div>
    </div>
  )
}
