import { ethers } from "ethers";
import { Web3Provider, JsonRpcSigner, JsonRpcProvider } from "@ethersproject/providers"

let provider: Web3Provider | JsonRpcProvider;
let signer: JsonRpcSigner

export const getProvider = async () => {
    provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send('eth_requestAccounts',[]); // ethereum.enable()

    // provider = new ethers.providers.JsonRpcProvider();
    return provider; 
}
 
export const getSigner = async () => {
    return (await getProvider())?.getSigner();
}

export default signer = await getSigner()