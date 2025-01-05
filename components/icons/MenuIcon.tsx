import Image from 'next/image'

const MenuIcon = ({ ...props }) => (
  <Image
    src="/menu-icon.svg"
    width={28}
    height={20}
    alt="menu"
    className="text-white"
    {...props}
  />
)

export default MenuIcon
