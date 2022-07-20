import { defineStore } from 'pinia';
import _ from 'underscore';
import { BigNumber } from 'ethers';
import Utils from 'src/services/utils';
import { DateTime } from 'luxon';

export const useProposalStore = defineStore('proposal', {
  state: () => ({
    proposals: <Proposal[]>[],
  }),
  getters: {
    formattedProposals(state) {
      const proposals = _.map(state.proposals, (proposal) => {
        let status: ProposalStatus;
        const now = DateTime.now();
        const startTime = DateTime.fromSeconds(proposal.startTime.toNumber());
        const endTime = DateTime.fromSeconds(proposal.endTime.toNumber());
        if (startTime < now) {
          status = ProposalStatus.pending;
        } else if (endTime < now) {
          status = ProposalStatus.open;
        } else if (proposal.yesVotes > proposal.noVotes) {
          status = ProposalStatus.passed;
        } else if (proposal.yesVotes < proposal.noVotes) {
          status = ProposalStatus.failed;
        } else {
          status = ProposalStatus.tied;
        }

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
          status: status,
        };
      });

      return _.sortBy(proposals, 'endTime');
    },
  },
});

export interface ProposalStore {
  proposals: Proposal[];
  formattedProposals: Proposal[];
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

  status: ProposalStatus;
}

export enum ProposalStatus {
  pending = 'pending',
  open = 'open',
  passed = 'passed',
  failed = 'failed',
  tied = 'tied',
}
