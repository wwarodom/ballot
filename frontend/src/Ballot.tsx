import { ethers } from "ethers";
import signer from "../utils/provider";
import { address } from './contracts/Ballot-address.json';
import { abi } from './contracts/Ballot-abi.json';
import { Ballot3 } from "../../src/types/Ballot3";
import { useEffect, useState } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Heading from './Heading';
import ProposalsFC from "./Proposals";

let ballotContract: Ballot3;

type ProposalType = {
    name: string;
    voteCount: ethers.BigNumber;
};

const BallotFC: React.FC = () => {
    const [accountRight, setAccountRight] = useState('');
    const [accountDelegate, setAccountDelegate] = useState('');

    const [voter, setVoter] = useState({ weight: 0, voted: "", vote: "" });
    const [winner, setWinner] = useState('');

    const [user, setUser] = useState('');
    const [proposals, setProposals] = useState<ProposalType[]>([]);

    // useEffect(() => {
    //     connect();
    // }, [user]);

    async function connect() {
        // console.log('signer:  ', await signer.getAddress())
        setUser(await signer.getAddress());
        ballotContract = new ethers.Contract(address, abi, signer) as Ballot3;
        initProposals();
    }

    async function initProposals() {
        const temp_prop: ProposalType[] = [];
        for (let i: number = 0; i < 3; i++)
            temp_prop.push(await ballotContract.proposals(i));
        setProposals(temp_prop);
    }

    function printProposal() {
        return proposals.map((proposal, proposalIndex) => {
            const name = ethers.utils.parseBytes32String(proposal.name).toString();
            const url = `/photos/${name}.png`;
            return <ProposalsFC
                proposal={proposal} key={proposalIndex}
                proposalIndex={proposalIndex}
                name={name}
                url={url}
                vote={vote} />
        })
    }

    function printVoters() {
        return (
            <div className="px-4 py-2 rounded overflow-hidden mr-8 shadow-lg">
                <div className="font-bold mt-4">
                    <button
                        className="bg-indigo-300 hover:bg-indigo-500 divide-dashed p-2 rounded mb-2"
                        onClick={() => setVoterState()}>Get Voter Profile</button>
                </div>
                <div>Weight: {voter.weight}</div>
                <div>Voted: {voter.voted}</div>
                <div>Vote for: {voter.vote}</div>
            </div>
        )
    }

    function printGetWinner() {
        return (
            <div className="px-4 py-2 rounded overflow-hidden mr-8 shadow-lg">
                <button
                    className="mt-4 bg-red-600 hover:bg-red-700 p-2 text-white rounded"
                    onClick={() => winnerName()}>Get Winner</button>
                <div className="text-lg mt-4 ml-1"> {winner}</div>
            </div>
        )
    }

    async function setVoterState() {
        if (!ballotContract) {
            toast.warn("Please connect wallet!");
            return;
        }

        const accountAddress = await signer.getAddress();
        console.log('address acc: ', accountAddress);
        const vote = await ballotContract.voters(accountAddress.toString());
        const proposalId = proposals[+vote.vote.toString()].name;
        const name = (vote.voted) ?
            ethers.utils.parseBytes32String(proposalId) : "";
        setVoter({
            weight: +vote.weight.toString(),
            voted: (vote.voted ? "Voted" : "Not Voted yet"),
            vote: name
        })
    }

    async function giveRightToVote(address: string) {
        if (address.length !== 42) { // wallet address length
            console.log('Please input give right address');
            toast.warn("Please input correct give right address!");
            return;
        }
        if (!ballotContract)
            await connect();

        // console.log('signer: ', signer)
        // console.log('signer:  ', await signer.getAddress())
        try {
            const tx = await ballotContract.connect(signer).giveRightToVote(address);
            await tx.wait();
            console.log('Give right to: ', address);
            ballotContract.on("GiveRightToVote", (to) => toast.success('Give right sucessfully to' + to));
        } catch (e: any) {
            // console.log('body: ', JSON.parse(e.body).error.message);
            toast.error(e.data.message);
        }
    }

    async function delegate(address: string) {
        if (address.length !== 42) {
            toast.warn('Please input correct delegate address');
            return;
        }
        if (!ballotContract)
            await connect();
        try {
            const tx = await ballotContract.connect(signer).delegate(address);
            await tx.wait();
            console.log('Delegate to: ', address);
            ballotContract.on("Delegate", (to) => toast.success('Delegate to:' + to));
        } catch (e: any) {
            // console.log('body: ', JSON.parse(e.body).error.message);
            toast.error(e.data.message);
        }
    }

    async function vote(proposal: number) {
        if (!ballotContract)
            await connect();
        try {
            console.log('proposal: ', proposal);
            const tx = await ballotContract.vote(proposal);
            await tx.wait();
            setVoterState() // refresh voter score
            initProposals() // refresh proposal score
            ballotContract.on("Voted", (sender, proposal, count) => {
                const proposalName = ethers.utils.parseBytes32String(proposals[proposal].name);
                const res = `${sender} voted for ${proposalName} | total score: ${count}`;
                toast.success('Vote to:' + res)
            });
        } catch (e: any) {
            // console.log('e.error: ', e.data.message);
            toast.error(e.data.message)
        }
    }

    async function winnerName() {
        if (!ballotContract)
            await connect();
        const name: string = await ballotContract.winnerName();
        console.log(ethers.utils.parseBytes32String(name));
        setWinner(ethers.utils.parseBytes32String(name));
    }

    function showAccountsFromGiveRight() {
        return (
            <div className="flex flex-row justify-center mb-4">
                <div className="mt-2 mr-4">
                    Give Right to:
                </div>
                <input
                    className="w-1/2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                    type="text" onChange={(e) => setAccountRight(e.target.value)} />
                <button
                    className="bg-yellow-500 hover:bg-yellow-600 p-2 text-white rounded"
                    onClick={() => giveRightToVote(accountRight)}>Give Right</button>
            </div>
        );
    }

    function showDelegate() {
        return (
            <div className="flex flex-row justify-center">
                <div className="mt-2 mr-4">
                    Delegate to:
                </div>
                <input
                    className="w-1/2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                    type="text" onChange={(e) => setAccountDelegate(e.target.value)} />
                <button
                    className="bg-blue-500 hover:bg-blue-600 p-2 text-white rounded"
                    onClick={() => delegate(accountDelegate)}>Delegate</button>
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-center items-center ">
            <Heading
                connect={connect}
                initProposals={initProposals}
                user={user}
            />

            <div>
                <div className="flex">
                    {printProposal()}
                </div>
                <div className="mb-8 flex flex-row justify-center mt-4">
                    {printVoters()}
                    {printGetWinner()}
                </div>

            </div>
            <div className="w-2/3">
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