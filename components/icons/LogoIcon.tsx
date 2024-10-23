import Image from 'next/image'

const LogoIcon = ({ ...props }) => (
  <Image
    src="/logo-icon.svg"
    width={80}
    height={80}
    alt="Logo"
    className="h-12 text-white"
  />
)

export default LogoIcon
