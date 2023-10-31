const Input = ({ disabled = false, className, ...props }) => (
    <input
        disabled={disabled}
        className={`${className} rounded-md shadow-sm border-gray-300 focus:border-violeta-300 focus:ring focus:ring-violeta-200 focus:ring-opacity-50`}
        {...props}
    />
)

export default Input

export const NeoInput = ({ disabled = false, className, ...props }) => (
    <input
        disabled={disabled}
        className="rounded-md border-2 border-black p-[10px] font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none transition-all focus:translate-x-[3px] focus:translate-y-[3px] focus:shadow-none"
        {...props}
    />
)

export const NeoInputChico = ({ disabled = false, className, ...props }) => (
    <input
        disabled={disabled}
        className="w-20 rounded-md border-2 border-black p-[10px] font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none transition-all focus:translate-x-[3px] focus:translate-y-[3px] focus:shadow-none"
        {...props}
    />
)
