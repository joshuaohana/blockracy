import "@nomiclabs/hardhat-ethers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("Blockracy", function () {
  let blockracyContract: Contract;
  let owner: SignerWithAddress,
    addr1: SignerWithAddress,
    addr2: SignerWithAddress,
    addrs: SignerWithAddress[];

  describe("Proposal", function () {
    beforeEach(async function () {
      [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

      const _BlockracyContract = await ethers.getContractFactory("Blockracy");
      blockracyContract = await _BlockracyContract.deploy();
      await blockracyContract.deployed();
    });

    it("Should accept new proposals", async function () {
      const title = "Proposal 1";
      const description = "It's a proposal";
      const nowInSecs = Math.floor(new Date().getTime() / 1000);
      const startTime = nowInSecs;
      const endTime = startTime + 5 * 60;

      const submitTx = await blockracyContract.submitProposal(
        title,
        description,
        startTime,
        endTime
      );
      await submitTx.wait();

      const proposals = await blockracyContract.getAllProposals();
      const proposal = proposals[0];

      expect(proposal.proposer).to.equal(owner.address) &&
        expect(proposal.title).to.equal(title) &&
        expect(proposal.description).to.equal(description) &&
        expect(proposal.startTime).to.equal(startTime) &&
        expect(proposal.endTime).to.equal(endTime);
    });

    it("Should emit ProposalCreated event when proposal created", async function () {
      expect(0).to.equal(1);
    });

    it("Should not accept a proposal endTime before its startTime", async function () {
      expect(0).to.equal(1);
    });
  });

  describe("Vote", function () {
    beforeEach(async function () {
      [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

      const _BlockracyContract = await ethers.getContractFactory("Blockracy");
      blockracyContract = await _BlockracyContract.deploy();
      await blockracyContract.deployed();
    });

    it("Should accept new yes votes", async function () {
      // send a valid one proposal and vote yes, then get and expect its vote count
      expect(0).to.equal(1);
    });

    it("Should accept new no votes", async function () {
      // send a valid one proposal and vote yes, then get and expect its vote count
      expect(0).to.equal(1);
    });

    it("Should emit VotePlaced event when a vote is cast", async function () {
      expect(0).to.equal(1);
    });

    it("Should not accept a vote if startTime hasn't been reached yet", async function () {
      expect(0).to.equal(1);
    });

    it("Should not accept a vote endTime is already passed", async function () {
      expect(0).to.equal(1);
    });

    it("Should not allow same wallet address to vote twice", async function () {
      expect(0).to.equal(1);
    });
  });
});
