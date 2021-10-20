import { ethers } from "ethers";
import { getSigner } from "../utils/provider";
import { address } from './contracts/Ballot-address.json';
import { abi } from './contracts/Ballot-abi.json';
import { Ballot3 } from './contracts/types/Ballot3'; 
// import { Ballot3 } from "../../src/types/Ballot3"; 
import { useEffect, useState } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Heading from './Heading';
import ProposalsFC from "./Proposals";
import { JsonRpcSigner } from "@ethersproject/providers";

let ballotContract: Ballot3;

type ProposalType = {
    name: string;
    voteCount: ethers.BigNumber;
};

const BallotFC: React.FC = () => {
    const [accountRight, setAccountRight] = useState('');
    const [accountDelegate, setAccountDelegate] = useState('');

    const [user, setUser] = useState('');

    const [proposals, setProposals] = useState<ProposalType[]>([]);
    const [voter, setVoter] = useState({ weight: 0, voted: false, vote: 0, delegate: "" });
    const [chairPerson, setChairPerson] = useState('');

    const [signer, setSigner] = useState<JsonRpcSigner>();

    useEffect(() => {
        if (window.ethereum) {
            getSigner().then(initialSigner => {
                initialSigner && setSigner(initialSigner);
            })
        }
    }, []);

    useEffect(() => {
        connect();
        window.ethereum.on('connect', connect);
        window.ethereum.on('accountsChanged', connect);
        window.ethereum.on('chainChanged', reload);

        return () => {
            window.ethereum.removeListener('connect', connect);
            window.ethereum.removeListener('accountsChanged', connect);
            window.ethereum.on('chainChanged', reload);
        }
    }, [signer]);

    function reload() {
        return window.location.reload();
    }

    async function connect() {
        if (signer) {
            setUser(await signer.getAddress());
            ballotContract = new ethers.Contract(address, abi, signer) as Ballot3;
            loadData();
            loadChairPerson();
        }
    }

    const loadData = () => {
        initProposals();
        initVoterState();
    }

    async function initProposals() {
        const temp_prop: ProposalType[] = [];
        for (let i: number = 0; i < 3; i++)
            temp_prop.push(await ballotContract.proposals(i));
        setProposals(temp_prop);
    }

    async function initVoterState() {
        if (signer) {
            const accountAddress = await signer.getAddress();
            console.log('address acc: ', accountAddress);
            const voterData = await ballotContract.voters(accountAddress.toString());
            setVoter({
                weight: +voterData.weight,
                voted: voterData.voted,
                delegate: voterData.delegate,
                vote: +voterData.vote
            })
        }
    }

    async function loadChairPerson() {
        const res = await ballotContract.chairperson();
        setChairPerson(res);
    }

    async function giveRightToVote(address: string) {
        if (address.length !== 42) { // wallet address length
            console.log('Please input give right address');
            toast.warn("Please input correct give right address!");
            return;
        }
        if (!ballotContract)
            await connect();

        if (signer) {
            try {
                const tx = await ballotContract.connect(signer).giveRightToVote(address);
                await tx.wait();
                loadData();
                console.log('Give right to: ', address);
                ballotContract.once("GiveRightToVote", (to) => toast.success('Give right sucessfully to' + to));
            } catch (e: any) {
                toast.error(e.data.message);
            }
        }
    }

    async function delegate(address: string) {
        if (address.length !== 42) {
            toast.warn('Please input correct delegate address');
            return;
        }
        if (signer) {
            try {
                const tx = await ballotContract.connect(signer).delegate(address);
                await tx.wait();
                console.log('Delegate to: ', address);
                loadData();
                ballotContract.once("Delegate", (to) => toast.success('Delegate to:' + to));
            } catch (e: any) { 
                toast.error(e.data.message);
            }
        }

    }

    async function vote(proposal: number) {
        if (signer) {
            try {
                console.log('proposal: ', proposal);
                const tx = await ballotContract.vote(proposal);
                await tx.wait();
                loadData();

                ballotContract.once("Voted", (sender, proposal, count) => {
                    const proposalName = ethers.utils.parseBytes32String(proposals[proposal].name);
                    const res = `${sender} voted for ${proposalName} | total score: ${count}`;
                    toast.success('Vote to:' + res)
                });
            } catch (e: any) {
                toast.error(e.data.message)
            }
        }
    }

    function winnerIndex() {
        const scores = proposals.map(prop => +prop.voteCount);
        const maxScore = Math.max(...scores);
        const maxScoreProposals = proposals.filter(prop => +prop.voteCount === maxScore);
        const winnerId = proposals.findIndex(prop => +prop.voteCount === maxScore);
        if (maxScoreProposals.length === 1) {
            return winnerId;
        } else {
            return -1;
        }
    }

    function delegated() {
        if (!voter.delegate || Number(voter.delegate) === 0) return null;
        return voter.delegate;
    }

    function voterStatus() {
        const delegatedTo = delegated();
        if (delegatedTo)         // delegated, no voted proposal status 
            return `You have delegated to ${delegatedTo.slice(0, 5)}...${delegatedTo.slice(-5)}.`;
        else if (voter.voted) {  // already voted, get proposal name
            const proposal = proposals[voter.vote];
            if (!proposal) return '';      // to wait proposal loading 
            const proposalName = ethers.utils.parseBytes32String(proposal.name);
            return `You have voted to ${proposalName}.`;
        }
        else if (voter.weight === 0) return `You have no right to vote.`;
        return `You have ${voter.weight} rights.`
    }

    function printProposal() {
        return proposals.map((proposal, proposalIndex) => {
            const name = ethers.utils.parseBytes32String(proposal.name).toString();
            const url = `/photos/${name}.png`;
            const isVoted = !delegated() && voter.voted;
            const isNotSelected = isVoted && voter.vote !== proposalIndex
            const disabled = !!delegated() || isNotSelected || voter.weight === 0;

            return (
                <div key={proposalIndex} className="w-60 justify-self-center">
                    <ProposalsFC
                        key={proposalIndex}
                        proposal={proposal}
                        proposalIndex={proposalIndex}
                        isSelected={isVoted && voter.vote === proposalIndex}
                        disabled={disabled}
                        isWinner={proposalIndex === winnerIndex()}
                        name={name}
                        url={url}
                        vote={vote}
                    />
                </div>
            )
        })
    }

    function showAccountsFromGiveRight() {
        const disabled = user !== chairPerson;
        return (
            <div className="sm:flex flex-row justify-center items-center mb-4">
                <div className="mb-2 sm:mb-0 sm:mr-4">
                    Give Right to:
                </div>
                <div className='flex'>
                    <input
                        className="flex-1 sm:w-64 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2 "
                        type="text" onChange={(e) => setAccountRight(e.target.value)} />
                    <button
                        disabled={disabled}
                        className=" whitespace-nowrap  bg-yellow-500 hover:bg-yellow-600 p-2 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
                        onClick={() => giveRightToVote(accountRight)}>Give Right</button>
                </div>
            </div>
        );
    }

    function showDelegate() {
        const disabled = voter.voted || voter.weight === 0;
        return (
            <div className="sm:flex flex-row justify-center items-center">
                <div className="mb-2 sm:mb-0 sm:mr-4">
                    Delegate to:
                </div>
                <input
                    className="flex-1 sm:w-64 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                    type="text" onChange={(e) => setAccountDelegate(e.target.value)} />
                <button
                    disabled={disabled}
                    className="whitespace-nowrap bg-blue-500 hover:bg-blue-600 p-2 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
                    onClick={() => delegate(accountDelegate)}>Delegate</button>
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-center items-center ">
            <Heading
                connect={connect} 
                user={user}
            />

            <div className='mt-10 px-4'>
                <div className="grid gap-6 sm:grid-cols-3">
                    {printProposal()}
                </div>

                <div className="mt-12 font-semibold text-2xl sm:text-3xl text-center">
                    {voterStatus()}
                </div>
            </div>

            <div className="mt-6 px-4">
                {showAccountsFromGiveRight()}
                {showDelegate()}
            </div>

            <div>
                <ToastContainer />
            </div>
        </div>
    )
}

export default BallotFC;