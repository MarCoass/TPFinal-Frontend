const AuthCard = ({ logo, children }) => (
    <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-naranja-100">
        <div>{logo}</div>

        <div className="items-center rounded-md border-2 border-black bg-[#bc95d4] p-20 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ">
            {children}
        </div>
    </div>
)

export default AuthCard
