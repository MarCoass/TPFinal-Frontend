import Link from 'next/link'

const NavLink = ({ active = false, children, ...props }) => (
    <Link
        {...props}
        className={`text-xl hover:border-black rounded-[5px] border-2 border-transparent border-black flex p-4  hover:bg-lila-600 ${active ? 'bg-lila-500' : ''}`}>
        {children}
    </Link>
)

export default NavLink
