import Link from 'next/link'
import { Menu } from '@headlessui/react'

const DropdownLink = ({ children, ...props }) => (
    <Menu.Item>
        {({ active }) => (
            <Link
                {...props}
                className={`w-full text-left block px-4 py-2 text-sm leading-5 text-gray-700 ${
                    active ? 'bg-gray-100' : ''
                } focus:outline-none transition duration-150 ease-in-out`}>
                {children}
            </Link>
        )}
    </Menu.Item>
)

export const DropdownButton = ({ children, ...props }) => (
    <Menu.Item>
        {({ active }) => (
            <button
                className='block w-full border-b-2 border-black bg-[#bc95d4] px-7 py-3 first:rounded-t-[5px] last:rounded-b-[5px] hover:bg-[#a36ec4]'
                {...props}>
                {children}
            </button>
        )}
    </Menu.Item>
)

export default DropdownLink
