import Link from 'next/link'

const ResponsiveNavLink = ({ active = false, children, ...props }) => (
    <Link
        {...props}
        className={`text-center block pl-3 my-2 pr-4 py-2 border-2 rounded-[5px] text-lg font-bold leading-5 focus:outline-none transition duration-150 ease-in-out ${
            active
                ? 'border-black  bg-rosado-400 '
                : 'border-transparent  hover:bg-rosado-200 hover:border-black  focus:bg-rosado-300 '
        }`}>
        {children}
    </Link>
)

export const ResponsiveNavButton = props => (
    <button
        className="bg-rosado-400 hover:bg-rosado-200  border-black  focus:bg-rosado-300  block pl-3 pr-4 py-2 border-2 rounded-[5px] text-lg font-bold leading-5 focus:outline-none transition duration-150 ease-in-out"
        {...props}
    />
)

export default ResponsiveNavLink
