import Image from 'next/image'
import PasswordUpdateForm from '@/components/sections/Forms/PasswordUpdateForm'
import SectionHeader from '@/components/modules/SectionHeader'

export default async function ResetPassword() {
  return (
    <div className="relative">
      <SectionHeader title="Your Account Password" />

      <div className="flex items-center flex-col lg:flex-row justify-between gap-8 lg:gap-16 my-32">
        <div className="rounded-3xl bg-dark p-4 py-6 lg:pb-10 lg:p-10 lg:w-1/2 flex-shrink-0">
          <PasswordUpdateForm />
        </div>

        <div>
          <Image
            src={'/signup-image.png'}
            width={554}
            height={708}
            alt="Singup"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  )
}
