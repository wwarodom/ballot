
import { expect } from "chai";
import { ethers } from "hardhat";

import { Ballot2 } from '../src/types/Ballot2';

describe("Ballot2 ", function () {
    it("Should return Tanakorn", async function () {
        const Ballot2 = await ethers.getContractFactory("Ballot2");
        const ballot2: Ballot2 = await Ballot2.deploy() as Ballot2;

        const accounts = await ethers.getSigners();

        await ballot2.giveRightToVote(accounts[0].address);
        await ballot2.vote(2);                  // chair vote

        // give right to others 
        for (let i = 1; i < 10; i++)
            await ballot2.giveRightToVote(accounts[i].address);

        await ballot2.connect(accounts[1]).vote(0);
        await ballot2.connect(accounts[2]).vote(1);
        await ballot2.connect(accounts[3]).vote(1);
        await ballot2.connect(accounts[4]).vote(2);

        console.log(await ballot2.winnerName())
        expect(await ballot2.winnerName()).to.equal("Tanakorn");
    });
}); 