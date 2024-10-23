import Image from 'next/image'

const LogoText = ({ ...props }) => (
  <Image
    src="/logo-text.svg"
    width={200}
    height={70}
    alt="Logo"
    className="text-white"
    {...props}
  />
)

export default LogoText
