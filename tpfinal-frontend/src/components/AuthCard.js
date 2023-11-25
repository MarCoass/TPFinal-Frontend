const AuthCard = ({ logo, children }) => (
    <div className="bg-violeta-100 min-h-screen  flex flex-col sm:justify-center items-center  sm:pt-0 d">
        <div className="min-h-screen w-full sm:w-max sm:min-h-min items-center  rounded-[5px] border-2 border-black bg-lila-500   sm:px-20 sm:py-6 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col">
            <div className="hidden sm:block" >{logo}</div>
            {children}
        </div>
    </div>
)

export default AuthCard
