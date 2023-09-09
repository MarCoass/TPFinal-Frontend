const Button = ({ type = 'submit', className, ...props }) => (
    <button
        type={type}
        className={`${className} inline-flex items-center px-4 py-2 bg-violeta-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-violeta-600 active:bg-violeta-800 focus:outline-none focus:border-gray-900 focus:ring ring-violeta-200 disabled:opacity-25 transition ease-in-out duration-150`}
        {...props}
    />
)

export default Button
