
import { expect } from "chai";
import { ethers } from "hardhat";

import { Ballot3 } from '../src/types/Ballot3';

//  npx hardhat test test/ballot3.ts

describe("Ballot3 ", function () { 
    function getProposalNames() {
        const names = ["Warodom", "Tanakorn","Naratorn"]
        const proposalNames = [];
        for(let index in names){
            // convert string to byte32
            let p = ethers.utils.formatBytes32String(names[index])
            // console.log('byte32: ',  p);
            proposalNames.push(p);
            // console.log('original: ', ethers.utils.parseBytes32String(p))
        } 
        return proposalNames;
    }

    it("Should return Tanakorn", async function () { 
        const proposalNames =  getProposalNames();
        const Ballot3 = await ethers.getContractFactory("Ballot3");
        const ballot3: Ballot3 = await Ballot3.deploy(proposalNames) as Ballot3;

        // console.log(await ballot3.proposals(0));
        const accounts = await ethers.getSigners(); 
        // console.log('acc1: ', accounts[1].address);

        await ballot3.giveRightToVote(accounts[1].address);
        await ballot3.giveRightToVote(accounts[3].address);
        await ballot3.giveRightToVote(accounts[4].address);
        await ballot3.giveRightToVote(accounts[8].address);

        await ballot3.connect(accounts[1]).delegate(accounts[2].address);
        
        // delegate 4=>6=>5=>7   
        await ballot3.connect(accounts[4]).delegate(accounts[6].address);
        await ballot3.connect(accounts[6]).delegate(accounts[5].address);
        await ballot3.connect(accounts[5]).delegate(accounts[7].address);

        //  8 => 4 result 4 => 7 (due to previously delegated)
         await ballot3.connect(accounts[8]).delegate(accounts[4].address);
 
        await ballot3.connect(accounts[2]).vote(2);
        await ballot3.connect(accounts[3]).vote(0); 
        await ballot3.connect(accounts[7]).vote(1); // win (since 7 has weight=2)

        const winner32 = await ballot3.winnerName();
        const winner =  ethers.utils.parseBytes32String(winner32); 
        expect(winner).to.equal("Tanakorn");
    });
});
 
