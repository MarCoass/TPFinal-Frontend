

const Button = ({ type = 'submit', className, ...props }) => (
    <button
        type={type}
        className={`${className} inline-flex items-center justify-center px-4 py-2 bg-violeta-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-violeta-600 active:bg-violeta-800 focus:outline-none focus:border-gray-900 focus:ring ring-violeta-200 disabled:opacity-25 transition ease-in-out duration-150`}
        {...props}
    />
)

export default Button

export const DeleteButton = ({type = 'delete', className, ...props})=>(
    <button
        type={type}
        className={`${className} items-center p-1 pr-3 flex bg-red-500 hover:bg-red-600 rounded text-white`}
        {...props}
    />  
)

export const UpdateButton = ({ className, ...props})=>(
    <button
        className={`${className}  items-center p-1 pr-3 flex bg-violeta-500 hover:bg-violeta-600 rounded text-white`}
        {...props}
    />
)


export const NewButton = ({ className, ...props})=>(
    <button
        className={`${className} inline-flex items-center justify-center m-2 px-2 py-1 bg-violeta-500 border border-transparent rounded-md font-semibold text-s text-white uppercase tracking-widest hover:bg-violeta-600 active:bg-violeta-800 focus:outline-none focus:border-gray-900 focus:ring ring-violeta-200 disabled:opacity-25 transition ease-in-out duration-150`}
        {...props}
    />
)


export const NeoButton = ({ className, ...props})=>(
    <button
      className="flex cursor-pointer items-center rounded-md border-2 border-black bg-rosado-500 px-10 py-3 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none disabled:bg-rosado-200 disabled:shadow-none disabled:translate-y-[3px] disabled:translate-x-[3px] "
        {...props}
    />
)

export const NeoButtonChico = ({ className, ...props})=>(
    <button
      className="flex cursor-pointer items-center rounded-md border-2 border-black bg-rosado-500 px-5 py-3 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none disabled:bg-rosado-200 disabled:shadow-none disabled:translate-y-[3px] disabled:translate-x-[3px] "
        {...props}
    />
)


