import Link from 'next/link'

const NavLink = ({ active = false, children, ...props }) => (
    <Link
        {...props}
        className={`lg:text-xl md:text-md hover:border-black rounded-[5px] border-2 border-transparent border-black flex lg:p-4 md:p-2  hover:bg-lila-600 ${active ? 'bg-lila-500' : ''}`}>
        {children}
    </Link>
)

export default NavLink
