import Image from 'next/image'

const LogoWhite = ({ ...props }) => (
  <Image
    src="/logo-white.svg"
    width={188}
    height={47}
    alt="Logo"
    className="text-white"
    {...props}
  />
)

export default LogoWhite
