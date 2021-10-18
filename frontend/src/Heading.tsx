type HeadingProps = {
    connect: () => void;
    initProposals: () => void;
    user: string;
}

const Heading: React.FC<HeadingProps> = ({ connect, initProposals, user }) => {

    return (
        <div className="flex flex-row justify-between w-full">
            <div className="flex flex-row mb-4 pb-4">
                <img className="pb-1" src="/photos/block.png" width="200px" alt="Block team" />
                <span className="text-5xl pb-1 font-bold ml-4 text-transparent bg-clip-text bg-gradient-to-br from-blue-800 to-blue-200">Voting</span>
            </div>

            <div className="m-2">
                <span>
                    {!user ?
                        "" :
                        user.substring(0, 5) + '...' + user.substring(user.length - 5, user.length - 1) + ' '
                    }
                </span>
                <button className="bg-purple-600 ml-2 p-2 text-white rounded" onClick={() => connect()}>
                    Connect wallet
                </button>
            </div>

        </div>
    )
}

export default Heading;