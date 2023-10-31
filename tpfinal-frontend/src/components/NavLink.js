import Link from 'next/link'

const NavLink = ({ active = false, children, ...props }) => (
    <Link
        {...props}
        className={` flex p-4 border-b-2 border-black hover:bg-lila-600 ${active ? 'bg-lila-500' : ''}`}>
        {children}
    </Link>
)

export default NavLink
