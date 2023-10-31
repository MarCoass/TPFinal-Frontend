import Link from 'next/link'

const NavLink = ({ active = false, children, ...props }) => (
    <Link
        {...props}
        className={` flex p-4 border-b-2 border-black hover:bg-[#a876c7] ${active ? 'bg-[#9065aa]' : ''}`}>
        {children}
    </Link>
)

export default NavLink
