type HeadingProps = {
    connect: () => void;
    initProposals: () => void;
    user: string;
}

const Heading: React.FC<HeadingProps> = ({ connect, initProposals, user }) => {

    const address = !user ? "" : user.substring(0, 5) + '...' + user.substring(user.length - 5, user.length - 1);

    return (
        <div className="flex flex-row justify-between w-full p-2 shadow-md">
            <div className="flex items-center pt-1">
                <img className="pb-1 w-20 h-8 sm:w-40 sm:h-12 mr-2" src="/photos/block.png" alt="Block team" />
                <span className="text-2xl sm:text-4xl pb-1 font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-800 to-blue-200">Voting</span>
            </div>

            <div className="m-2 sm:block">
                <button className="bg-purple-600 ml-2 p-2 text-white rounded font-semibold" onClick={() => connect()}>
                    {
                        !user ? 'Connect Wallet' : address
                    }
                </button>
            </div>
        </div>
    )
}

export default Heading;