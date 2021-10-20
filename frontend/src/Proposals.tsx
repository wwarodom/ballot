import { ethers } from "ethers";

type ProposalType = {
    name: string;
    voteCount: ethers.BigNumber;
};

type ProposalsProps = {
    proposal: ProposalType;
    key: number;
    proposalIndex: number;
    name: string;
    url: string;
    vote: (proposalId: number) => void;
    isWinner: boolean;
    isSelected: boolean;
    disabled?: boolean;
}

const ProposalsFC: React.FC<ProposalsProps> = ({ proposal, proposalIndex, name, url, isWinner, isSelected, disabled, vote }) => {
    return (
        <div
            key={proposalIndex}
            className={`rounded overflow-hidden shadow-lg ${isWinner && `bg-yellow-200`}`}
        >
            <div className="px-6 py-4">
                <div className='flex mr-2'>
                    <div className="font-bold text-xl mb-2">{name}</div>
                    {isWinner && (<img src="/photos/winner.png" alt="winner" className="w-8  h-8" />)}
                </div>
                <img className="rounded w-41 h-40 m-auto border border-black" src={url} alt="photo" />
            </div>
            <div className="px-6 pb-2 bg-grey-500 flex justify-around">
                <div className="py-1">
                    Count: {proposal.voteCount.toString()}
                </div>
                <div>
                    <button
                        disabled={disabled}
                        className={`p-2 text-white
                                   text-sm rounded
                                  disabled:bg-gray-300 disabled:cursor-not-allowed
                                  ${isSelected ? `bg-green-500 cursor-default` : `bg-green-400 hover:bg-green-600 cursor-pointer`}
                                  `}
                        onClick={() => !isSelected && vote(proposalIndex)}>
                            {isSelected ? 'Voted' : 'Vote'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProposalsFC;