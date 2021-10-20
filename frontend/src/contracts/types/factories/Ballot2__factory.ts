/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Ballot2, Ballot2Interface } from "../Ballot2";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "voter",
        type: "address",
      },
    ],
    name: "GaveRightToVote",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "proposal",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "voteCount",
        type: "uint256",
      },
    ],
    name: "Voted",
    type: "event",
  },
  {
    inputs: [],
    name: "chairperson",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "closeDate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "voter",
        type: "address",
      },
    ],
    name: "giveRightToVote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "numProposals",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "proposalNames",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "proposals",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "voteCount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposal",
        type: "uint256",
      },
    ],
    name: "vote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "voters",
    outputs: [
      {
        internalType: "uint256",
        name: "weight",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "voted",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "vote",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "winnerName",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "winnigProposal",
    outputs: [
      {
        internalType: "uint256",
        name: "winningProposal_",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405260405180606001604052806040518060400160405280600781526020017f5761726f646f6d0000000000000000000000000000000000000000000000000081525081526020016040518060400160405280600881526020017f54616e616b6f726e00000000000000000000000000000000000000000000000081525081526020016040518060400160405280600881526020017f4e617261746f726e0000000000000000000000000000000000000000000000008152508152506003906003620000d09291906200028c565b50348015620000de57600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600380549050600481905550610e10426200013b919062000411565b60058190555060005b600380549050811015620002855760026040518060400160405280600384815481106200017657620001756200055a565b5b9060005260206000200180546200018d9062000478565b80601f0160208091040260200160405190810160405280929190818152602001828054620001bb9062000478565b80156200020c5780601f10620001e0576101008083540402835291602001916200020c565b820191906000526020600020905b815481529060010190602001808311620001ee57829003601f168201915b5050505050815260200160008152509080600181540180825580915050600190039060005260206000209060020201600090919091909150600082015181600001908051906020019062000262929190620002f3565b5060208201518160010155505080806200027c90620004ae565b91505062000144565b5062000589565b828054828255906000526020600020908101928215620002e0579160200282015b82811115620002df578251829080519060200190620002ce929190620002f3565b5091602001919060010190620002ad565b5b509050620002ef919062000384565b5090565b828054620003019062000478565b90600052602060002090601f01602090048101928262000325576000855562000371565b82601f106200034057805160ff191683800117855562000371565b8280016001018555821562000371579182015b828111156200037057825182559160200191906001019062000353565b5b509050620003809190620003ac565b5090565b5b80821115620003a857600081816200039e9190620003cb565b5060010162000385565b5090565b5b80821115620003c7576000816000905550600101620003ad565b5090565b508054620003d99062000478565b6000825580601f10620003ed57506200040e565b601f0160209004906000526020600020908101906200040d9190620003ac565b5b50565b60006200041e826200046e565b91506200042b836200046e565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115620004635762000462620004fc565b5b828201905092915050565b6000819050919050565b600060028204905060018216806200049157607f821691505b60208210811415620004a857620004a76200052b565b5b50919050565b6000620004bb826200046e565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415620004f157620004f0620004fc565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b610f2680620005996000396000f3fe608060405234801561001057600080fd5b506004361061009e5760003560e01c806348d79b6d1161006657806348d79b6d1461014a5780639e7b8d6114610168578063a3ec138d14610184578063e28a2afc146101b6578063e2ba53f0146101e65761009e565b80630121b93f146100a3578063013cf08b146100bf5780632e4176cf146100f0578063385b44bd1461010e578063400e39491461012c575b600080fd5b6100bd60048036038101906100b89190610942565b610204565b005b6100d960048036038101906100d49190610942565b6103ea565b6040516100e7929190610af8565b60405180910390f35b6100f86104a6565b6040516101059190610a84565b60405180910390f35b6101166104ca565b6040516101239190610bc8565b60405180910390f35b610134610552565b6040516101419190610bc8565b60405180910390f35b610152610558565b60405161015f9190610bc8565b60405180910390f35b610182600480360381019061017d9190610915565b61055e565b005b61019e60048036038101906101999190610915565b61074c565b6040516101ad93929190610be3565b60405180910390f35b6101d060048036038101906101cb9190610942565b610783565b6040516101dd9190610ad6565b60405180910390f35b6101ee61082f565b6040516101fb9190610ad6565b60405180910390f35b6000600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020905060008160000154141561028f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161028690610b28565b60405180910390fd5b8060010160009054906101000a900460ff16156102e1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102d890610b88565b60405180910390fd5b6005544210610325576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161031c90610ba8565b60405180910390fd5b60018160010160006101000a81548160ff0219169083151502179055508181600201819055506002828154811061035f5761035e610d8a565b5b9060005260206000209060020201600101600081548092919061038190610ce3565b91905055507fea66f58e474bc09f580000e81f31b334d171db387d0c6098ba47bd897741679b3383600285815481106103bd576103bc610d8a565b5b9060005260206000209060020201600101546040516103de93929190610a9f565b60405180910390a15050565b600281815481106103fa57600080fd5b906000526020600020906002020160009150905080600001805461041d90610cb1565b80601f016020809104026020016040519081016040528092919081815260200182805461044990610cb1565b80156104965780601f1061046b57610100808354040283529160200191610496565b820191906000526020600020905b81548152906001019060200180831161047957829003601f168201915b5050505050908060010154905082565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000806000905060005b60028054905081101561054d5781600282815481106104f6576104f5610d8a565b5b906000526020600020906002020160010154111561053a576002818154811061052257610521610d8a565b5b90600052602060002090600202016001015491508092505b808061054590610ce3565b9150506104d4565b505090565b60045481565b60055481565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146105ec576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105e390610b48565b60405180910390fd5b600160008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900460ff161561067c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161067390610b68565b60405180910390fd5b6000600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000154146106cb57600080fd5b60018060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001819055507f8817ffc27c6f09656c3dee39e1a96b0c3d300bc359bac17e72fce36211bbe0f7816040516107419190610a84565b60405180910390a150565b60016020528060005260406000206000915090508060000154908060010160009054906101000a900460ff16908060020154905083565b6003818154811061079357600080fd5b9060005260206000200160009150905080546107ae90610cb1565b80601f01602080910402602001604051908101604052809291908181526020018280546107da90610cb1565b80156108275780601f106107fc57610100808354040283529160200191610827565b820191906000526020600020905b81548152906001019060200180831161080a57829003601f168201915b505050505081565b6060600261083b6104ca565b8154811061084c5761084b610d8a565b5b9060005260206000209060020201600001805461086890610cb1565b80601f016020809104026020016040519081016040528092919081815260200182805461089490610cb1565b80156108e15780601f106108b6576101008083540402835291602001916108e1565b820191906000526020600020905b8154815290600101906020018083116108c457829003601f168201915b5050505050905090565b6000813590506108fa81610ec2565b92915050565b60008135905061090f81610ed9565b92915050565b60006020828403121561092b5761092a610db9565b5b6000610939848285016108eb565b91505092915050565b60006020828403121561095857610957610db9565b5b600061096684828501610900565b91505092915050565b61097881610c36565b82525050565b61098781610c48565b82525050565b600061099882610c1a565b6109a28185610c25565b93506109b2818560208601610c7e565b6109bb81610dbe565b840191505092915050565b60006109d3601483610c25565b91506109de82610dcf565b602082019050919050565b60006109f6602783610c25565b9150610a0182610df8565b604082019050919050565b6000610a19601783610c25565b9150610a2482610e47565b602082019050919050565b6000610a3c600d83610c25565b9150610a4782610e70565b602082019050919050565b6000610a5f601483610c25565b9150610a6a82610e99565b602082019050919050565b610a7e81610c74565b82525050565b6000602082019050610a99600083018461096f565b92915050565b6000606082019050610ab4600083018661096f565b610ac16020830185610a75565b610ace6040830184610a75565b949350505050565b60006020820190508181036000830152610af0818461098d565b905092915050565b60006040820190508181036000830152610b12818561098d565b9050610b216020830184610a75565b9392505050565b60006020820190508181036000830152610b41816109c6565b9050919050565b60006020820190508181036000830152610b61816109e9565b9050919050565b60006020820190508181036000830152610b8181610a0c565b9050919050565b60006020820190508181036000830152610ba181610a2f565b9050919050565b60006020820190508181036000830152610bc181610a52565b9050919050565b6000602082019050610bdd6000830184610a75565b92915050565b6000606082019050610bf86000830186610a75565b610c05602083018561097e565b610c126040830184610a75565b949350505050565b600081519050919050565b600082825260208201905092915050565b6000610c4182610c54565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b60005b83811015610c9c578082015181840152602081019050610c81565b83811115610cab576000848401525b50505050565b60006002820490506001821680610cc957607f821691505b60208210811415610cdd57610cdc610d5b565b5b50919050565b6000610cee82610c74565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415610d2157610d20610d2c565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600080fd5b6000601f19601f8301169050919050565b7f486173206e6f20726967687420746f20766f7465000000000000000000000000600082015250565b7f6f6e6c79206368616972706572736f6e2063616e20676976652072696768742060008201527f746f20766f746500000000000000000000000000000000000000000000000000602082015250565b7f54686520766f74657220616c726561647920766f746564000000000000000000600082015250565b7f416c726561647920766f74656400000000000000000000000000000000000000600082015250565b7f54686520766f74696e6720697320636c6f736564000000000000000000000000600082015250565b610ecb81610c36565b8114610ed657600080fd5b50565b610ee281610c74565b8114610eed57600080fd5b5056fea264697066735822122088f2d7878de4953798575dfab612aff6dc52437be18f9971379c439b2c6e3b5e64736f6c63430008070033";

export class Ballot2__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Ballot2> {
    return super.deploy(overrides || {}) as Promise<Ballot2>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): Ballot2 {
    return super.attach(address) as Ballot2;
  }
  connect(signer: Signer): Ballot2__factory {
    return super.connect(signer) as Ballot2__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): Ballot2Interface {
    return new utils.Interface(_abi) as Ballot2Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Ballot2 {
    return new Contract(address, _abi, signerOrProvider) as Ballot2;
  }
}