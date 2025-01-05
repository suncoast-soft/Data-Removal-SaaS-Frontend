import Image from 'next/image'

const LogoText = ({ ...props }) => (
  <Image
    src="/logo-text.svg"
    width={261}
    height={34.5}
    alt="Logo"
    className="text-white"
    {...props}
  />
)

export default LogoText
