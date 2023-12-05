import Link from 'next/link'

const NavLink = ({ active = false, children, ...props }) => (
    <Link
        {...props}
        className={`xl:text-xl lg:text-md md:text-md hover:border-black rounded-[5px] border-2 border-transparent border-black flex xl:p-4 lg:p-2 md:p-2  hover:bg-lila-600 ${active ? 'bg-lila-500' : ''}`}>
        {children}
    </Link>
)

export default NavLink
