import { ethers } from "ethers";
import signer from "../utils/provider";
import { address } from './contracts/Ballot-address.json';
import { abi } from './contracts/Ballot-abi.json';
import { Ballot3 } from "../../src/types/Ballot3";
import { useState } from "react";

let ballotContract: Ballot3;

type ProposalType = {
    name: string;
    voteCount: ethers.BigNumber;
};

const BallotFC: React.FC = () => {

    const [proposals, setProposals] = useState<ProposalType[]>([]);
    const [proposal, setProposal] = useState('0');
    const [account, setAccount] = useState('');
    const [user, setUser] = useState('0x');
    const [voter, setVoter] = useState({ weight: 0, voted: "", vote: "" });
    const [winner, setWinner] = useState('');

    async function connect() {
        console.log('signer:  ', await signer.getAddress())
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
        return proposals.map((proposal, key) =>
            <ul key={key}>
                <li>Name: {ethers.utils.parseBytes32String(proposal.name).toString()} </li>
                <li>Count: {proposal.voteCount.toString()} </li>
            </ul>)
    }

    function printVoters() {
        return (
            <div>
                <ul>
                    <li>Weight: {voter.weight}</li>
                    <li>Voted: {voter.voted}</li>
                    <li>Vote for: {voter.vote}</li>
                </ul>
            </div>
        )
    }

    async function setVoterState() {
        if (!ballotContract) {
            alert('Please connect wallet');
            return;
        }

        const accountAddress = await signer.getAddress();
        console.log('address acc: ', accountAddress);
        const vote = await ballotContract.voters(accountAddress.toString());
        // console.log('voters weight: ', vote.weight.toString())
        // console.log('voters vote: ', vote.voted)

        const proposalId = proposals[+vote.vote.toString()].name;
        const name = ethers.utils.parseBytes32String(proposalId);
        // console.log('voters for who: ', name);
        setVoter({
            weight: +vote.weight.toString(),
            voted: (vote.voted ? "Voted" : "Not Voted yet"),
            vote: name
        })
    }

    async function giveRightToVote(address: string) {
        if (address === "") {
            console.log('Please input give right address');
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
            ballotContract.on("GiveRightToVote", (to) => alert('Give right to' + to));
        } catch (e: any) {
            console.log('body: ', JSON.parse(e.body).error.message);

        }
    }

    async function delegate(address: string) {
        if (address === "") {
            console.log('Please input delegate address');
            return;
        }
        if (!ballotContract)
            await connect();
        try {
            const tx = await ballotContract.connect(signer).delegate(address);
            await tx.wait();
            console.log('Delegate to: ', address);
            ballotContract.on("Delegate", (to) => alert('Delegate to:' + to));
        } catch (e: any) {
            console.log('body: ', JSON.parse(e.body).error.message);
        }
    }

    async function vote(proposal: string) {
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
                alert('Vote to:' + res)
            });

        } catch (e: any) {
            console.log('e.error: ', e.data.message);
            alert(e.data.message)
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
            <div>
                <input type="text" onChange={(e) => setAccount(e.target.value)} />
                <button onClick={() => giveRightToVote(account)}>Give Right</button>
            </div>
        );
    }
    function showDelegate() {
        return (
            <div>
                <input type="text" onChange={(e) => setAccount(e.target.value)} />
                <button onClick={() => delegate(account)}>Delegate</button>
            </div>
        );
    }

    function showAccountsFromVote() {
        return (
            <button
                onClick={() => vote(proposal)}
            >Vote</button>
        );
    }

    return (
        <div>
            <h1>Vote</h1>
            <div>
                <div>
                    <button onClick={() => connect()}>Connect</button> {user}
                </div>
                <div>
                    {printProposal()}
                </div>
                <button onClick={() => setVoterState()}>Get Voter Profile</button>
                {printVoters()}
            </div>
            <div>
                <hr />
                Give Right to: {showAccountsFromGiveRight()}
                <hr />
                <hr />
                Delegate to: {showDelegate()}
                <hr />

                <select onChange={(e) => setProposal(e.target.value)}>
                    <option value="0">Warodom</option>
                    <option value="1">Tanakorn</option>
                    <option value="2">Naratorn</option>
                </select>
                Vote from account: {showAccountsFromVote()}
                <hr />
                <button onClick={() => winnerName()}>Winner Name</button> 
                {winner}
            </div>
        </div>
    )

}

export default BallotFC;