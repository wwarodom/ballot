
import fs from "fs";
import { ethers, artifacts } from "hardhat";
import { Ballot3 } from "../src/types/Ballot3";

async function main() {

  const proposalNames = getProposalNames();
  const Ballot3 = await ethers.getContractFactory("Ballot3");
  const ballot3: Ballot3 = await Ballot3.deploy(proposalNames) as Ballot3;

  // console.log(await ballot3.proposals(0));
  console.log("Ballot deployed to:", ballot3.address);
  saveContract(ballot3);
}

function getProposalNames() {
  const names = ["Warodom", "Tanakorn", "Naratorn"]
  const proposalNames = [];
  for (let index in names) {
    // convert string to byte32
    let p = ethers.utils.formatBytes32String(names[index])
    // console.log('byte32: ',  p);
    proposalNames.push(p);
    // console.log('original: ', ethers.utils.parseBytes32String(p))
  }
  return proposalNames;
}

function saveContract(greeter: Ballot3) {
  const path = __dirname + '/../frontend/src/contracts';
  if (!fs.existsSync(path))
    fs.mkdirSync(path);
  fs.writeFileSync(`${path}/Ballot-address.json`,
    JSON.stringify({ address: greeter.address }, undefined, 2))
  fs.writeFileSync(`${path}/Ballot-abi.json`,
    JSON.stringify(artifacts.readArtifactSync('Ballot3'), undefined, 2))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
