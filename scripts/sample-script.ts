
import fs from "fs";
import { ethers, artifacts } from "hardhat";
import { Greeter } from "../src/types/Greeter";

async function main() {
  const Greeter = await ethers.getContractFactory("Greeter");
  const greeter: Greeter = await Greeter.deploy("Hello, Hardhat!") as Greeter;

  await greeter.deployed();
  console.log("Greeter deployed to:", greeter.address);
  saveContract(greeter);
}

function saveContract(greeter: Greeter) {
  const path = __dirname + '/../frontend/src/contracts';  // get Contracts path
  if ( !fs.existsSync(path) )  // make sure dir Contracts exists
    fs.mkdirSync(path)

  fs.writeFileSync(path + '/address.json',  // save address
    JSON.stringify( { address: greeter.address }, undefined, 2)
  )

  fs.writeFileSync(path + '/abi.json',  // save abi
    JSON.stringify( artifacts.readArtifactSync('Greeter'), undefined, 2)
  )
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
