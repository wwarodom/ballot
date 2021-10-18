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
}

const ProposalsFC: React.FC<ProposalsProps> = ({ proposal, proposalIndex, name, url, vote }) => {
    return (
        <div key={proposalIndex} className="max-w-xs rounded overflow-hidden mr-8 shadow-lg">
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{name}</div>
                <img className="rounded w-41 h-40 m-auto border border-black" src={url} alt="photo" />
            </div>
            <div className="px-6 pb-2 bg-grey-500 flex justify-around">
                <div className="py-1">
                    Count: {proposal.voteCount.toString()}
                </div>
                <div>
                    <button
                        className="bg-green-400 p-2 text-white
                                            hover:bg-green-600 text-sm rounded"
                        onClick={() => vote(proposalIndex)}> Vote
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProposalsFC;