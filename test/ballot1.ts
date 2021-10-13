import { expect } from "chai";
import { ethers } from "hardhat";

import {Ballot1} from '../src/types/Ballot1';

// npx hardhat test test/ballot1.ts

describe("Ballot1 ", function () {
  it("Should return Tanakorn", async function () {
    const Ballot1 = await ethers.getContractFactory("Ballot1");
    const ballot1: Ballot1  = await Ballot1.deploy() as Ballot1 ;

    // accounts[0] = chairperson = deployer
    console.log(await ballot1.chairperson());  

    // Default is contract deployer: accounts[0])
    await ballot1.vote(1); 
 
    const accounts = await ethers.getSigners();
    await ballot1.connect(accounts[1]).vote(0);
    await ballot1.connect(accounts[2]).vote(1);
    await ballot1.connect(accounts[3]).vote(1);
    await ballot1.connect(accounts[4]).vote(2);
 
    console.log(await ballot1.winnerName())
    expect(await ballot1.winnerName()).to.equal("Tanakorn");
   });
});

describe("Ballot1 ", function () {
  it("Should return Warodom", async function () {
    const Ballot1 = await ethers.getContractFactory("Ballot1");
    const ballot1: Ballot1  = await Ballot1.deploy() as Ballot1 ;
    const accounts = await ethers.getSigners();

    await ballot1.connect(accounts[1]).vote(0);
    await ballot1.connect(accounts[2]).vote(0);
    await ballot1.connect(accounts[3]).vote(1);
    await ballot1.connect(accounts[4]).vote(2);

    expect(await ballot1.winnerName()).to.equal("Warodom");
   });
});