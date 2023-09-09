const Input = ({ disabled = false, className, ...props }) => (
    <input
        disabled={disabled}
        className={`${className} rounded-md shadow-sm border-gray-300 focus:border-violeta-300 focus:ring focus:ring-violeta-200 focus:ring-opacity-50`}
        {...props}
    />
)

export default Input
