import blockracyContract from '../../../artifacts/contracts/Blockracy.sol/Blockracy.json';
import { networkInfo } from './network.info';
import BaseService from './base.service';
import { BigNumber } from 'ethers';
import {
  Proposal,
  ProposalStore,
  useProposalStore,
} from '../stores/proposal.store';

class BlockracyService extends BaseService {
  private proposalStore: ProposalStore;

  constructor() {
    super(networkInfo.contracts.blockracy, blockracyContract.abi);
    this.proposalStore = useProposalStore();
  }

  protected async init(): Promise<void> {
    this.contract.on('ProposalCreated', () => {
      this.getAllProposals();
    });

    this.contract.on('VotePlaced', () => {
      this.getAllProposals();
    });
  }

  async submitProposal(
    title: string,
    description: string,
    startTime: number,
    endTime: number
  ): Promise<void> {
    await this.connectedContract.submitProposal(
      title,
      description,
      startTime,
      endTime
    );
  }

  async getAllProposals(): Promise<Proposal[]> {
    const proposals = await this.connectedContract.getAllProposals();
    this.proposalStore.proposals = proposals;
    return proposals;
  }

  async vote(proposalId: number, voteAnswer: boolean): Promise<void> {
    await this.connectedContract.vote(proposalId, voteAnswer);
  }
}

export default new BlockracyService();
