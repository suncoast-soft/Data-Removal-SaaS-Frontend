import Image from 'next/image'

const LogoIcon = () => (
  <Image
    src="/logo-icon.png"
    width={270}
    height={270}
    alt="Logo"
    className="w-12 h-auto text-white"
  />
)

export default LogoIcon
