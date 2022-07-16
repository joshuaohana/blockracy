import { defineStore } from 'pinia';
import _ from 'underscore';
import { BigNumber } from 'ethers';
import Utils from 'src/services/utils';

export const useProposalStore = defineStore('proposal', {
  state: () => ({
    proposals: <Proposal[]>[],
  }),
  getters: {
    // doubleCount: (state) => state.counter * 2,
    // getCompletedSuccessful, getPending, etc...
  },
  actions: {
    setProposals(proposals: Proposal[]) {
      this.proposals = _.map(proposals, (proposal) => {
        return {
          proposalId: proposal.proposalId,
          proposer: proposal.proposer,
          title: proposal.title,
          description: proposal.description,
          startTime: proposal.startTime,
          endTime: proposal.endTime,
          yesVotes: proposal.yesVotes,
          noVotes: proposal.noVotes,
          startTimeDisplay: Utils.displayDateFromSeconds(
            proposal.startTime.toNumber()
          ),
          endTimeDisplay: Utils.displayDateFromSeconds(
            proposal.endTime.toNumber()
          ),
        };
      });
    },
  },
});

export interface ProposalStore {
  proposals: Proposal[];
  setProposals: (proposals: Proposal[]) => void;
}

export interface Proposal {
  proposalId: number;
  proposer: string;
  title: string;
  description: string;
  startTime: BigNumber;
  endTime: BigNumber;
  yesVotes: number;
  noVotes: number;

  startTimeDisplay?: string;
  endTimeDisplay?: string;
}
