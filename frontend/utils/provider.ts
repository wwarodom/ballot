import { ethers } from "ethers";
import { Web3Provider, JsonRpcProvider } from "@ethersproject/providers"

let provider: Web3Provider | JsonRpcProvider;

export const getProvider = async () => {
    if (window.ethereum) {
        provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send('eth_requestAccounts', []); // ethereum.enable()

        // provider = new ethers.providers.JsonRpcProvider();
        return provider;
    }
    return null;
}

export const getSigner = async () => {
    const provider = await getProvider()
    return provider ? provider.getSigner() : null;
}