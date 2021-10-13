/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface Ballot2Interface extends ethers.utils.Interface {
  functions: {
    "chairperson()": FunctionFragment;
    "closeDate()": FunctionFragment;
    "giveRightToVote(address)": FunctionFragment;
    "numProposals()": FunctionFragment;
    "proposalNames(uint256)": FunctionFragment;
    "proposals(uint256)": FunctionFragment;
    "vote(uint256)": FunctionFragment;
    "voters(address)": FunctionFragment;
    "winnerName()": FunctionFragment;
    "winnigProposal()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "chairperson",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "closeDate", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "giveRightToVote",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "numProposals",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "proposalNames",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "proposals",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "vote", values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: "voters", values: [string]): string;
  encodeFunctionData(
    functionFragment: "winnerName",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "winnigProposal",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "chairperson",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "closeDate", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "giveRightToVote",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "numProposals",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "proposalNames",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "proposals", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "vote", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "voters", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "winnerName", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "winnigProposal",
    data: BytesLike
  ): Result;

  events: {
    "GaveRightToVote(address)": EventFragment;
    "Voted(address,uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "GaveRightToVote"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Voted"): EventFragment;
}

export type GaveRightToVoteEvent = TypedEvent<[string] & { voter: string }>;

export type VotedEvent = TypedEvent<
  [string, BigNumber, BigNumber] & {
    sender: string;
    proposal: BigNumber;
    voteCount: BigNumber;
  }
>;

export class Ballot2 extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: Ballot2Interface;

  functions: {
    chairperson(overrides?: CallOverrides): Promise<[string]>;

    closeDate(overrides?: CallOverrides): Promise<[BigNumber]>;

    giveRightToVote(
      voter: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    numProposals(overrides?: CallOverrides): Promise<[BigNumber]>;

    proposalNames(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    proposals(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string, BigNumber] & { name: string; voteCount: BigNumber }>;

    vote(
      proposal: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    voters(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, boolean, BigNumber] & {
        weight: BigNumber;
        voted: boolean;
        vote: BigNumber;
      }
    >;

    winnerName(overrides?: CallOverrides): Promise<[string]>;

    winnigProposal(
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { winningProposal_: BigNumber }>;
  };

  chairperson(overrides?: CallOverrides): Promise<string>;

  closeDate(overrides?: CallOverrides): Promise<BigNumber>;

  giveRightToVote(
    voter: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  numProposals(overrides?: CallOverrides): Promise<BigNumber>;

  proposalNames(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

  proposals(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<[string, BigNumber] & { name: string; voteCount: BigNumber }>;

  vote(
    proposal: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  voters(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, boolean, BigNumber] & {
      weight: BigNumber;
      voted: boolean;
      vote: BigNumber;
    }
  >;

  winnerName(overrides?: CallOverrides): Promise<string>;

  winnigProposal(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    chairperson(overrides?: CallOverrides): Promise<string>;

    closeDate(overrides?: CallOverrides): Promise<BigNumber>;

    giveRightToVote(voter: string, overrides?: CallOverrides): Promise<void>;

    numProposals(overrides?: CallOverrides): Promise<BigNumber>;

    proposalNames(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    proposals(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string, BigNumber] & { name: string; voteCount: BigNumber }>;

    vote(proposal: BigNumberish, overrides?: CallOverrides): Promise<void>;

    voters(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, boolean, BigNumber] & {
        weight: BigNumber;
        voted: boolean;
        vote: BigNumber;
      }
    >;

    winnerName(overrides?: CallOverrides): Promise<string>;

    winnigProposal(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {
    "GaveRightToVote(address)"(
      voter?: null
    ): TypedEventFilter<[string], { voter: string }>;

    GaveRightToVote(
      voter?: null
    ): TypedEventFilter<[string], { voter: string }>;

    "Voted(address,uint256,uint256)"(
      sender?: null,
      proposal?: null,
      voteCount?: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber],
      { sender: string; proposal: BigNumber; voteCount: BigNumber }
    >;

    Voted(
      sender?: null,
      proposal?: null,
      voteCount?: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber],
      { sender: string; proposal: BigNumber; voteCount: BigNumber }
    >;
  };

  estimateGas: {
    chairperson(overrides?: CallOverrides): Promise<BigNumber>;

    closeDate(overrides?: CallOverrides): Promise<BigNumber>;

    giveRightToVote(
      voter: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    numProposals(overrides?: CallOverrides): Promise<BigNumber>;

    proposalNames(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    proposals(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    vote(
      proposal: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    voters(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    winnerName(overrides?: CallOverrides): Promise<BigNumber>;

    winnigProposal(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    chairperson(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    closeDate(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    giveRightToVote(
      voter: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    numProposals(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    proposalNames(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    proposals(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    vote(
      proposal: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    voters(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    winnerName(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    winnigProposal(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
