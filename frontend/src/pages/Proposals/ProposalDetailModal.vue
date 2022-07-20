<template>
  <q-dialog :model-value="show" @hide="$emit('hide')">
    <q-card>
      <q-card-section>
        <div class="text-h6">{{ proposal.title }}</div>
      </q-card-section>

      <q-card-section>
        <p>description: {{ proposal.description }}</p>
        <p>startTime: {{ proposal.startTimeDisplay }}</p>
        <p>endTime: {{ proposal.endTimeDisplay }}</p>
        <p>proposalId: {{ proposal.proposalId }}</p>
        <p>proposer: {{ proposal.proposer }}</p>
        <p>yesVotes: {{ proposal.yesVotes }}</p>
        <p>noVotes: {{ proposal.noVotes }}</p>
      </q-card-section>

      <q-card-actions class="text-primary">
        <q-btn label="vote yes" v-close-popup @click="vote(true)" />
        <q-btn label="vote no" v-close-popup @click="vote(false)" />
      </q-card-actions>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { Proposal } from '../../stores/proposal.store';
import { defineComponent, ref, PropType } from 'vue';
import blockracy from '../../services/blockracy.service';
import Utils from '../../services/utils';

export default defineComponent({
  name: 'ProposalDetailModal',
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    proposal: {
      type: Object as PropType<Proposal>,
      required: true,
    },
  },
  setup() {
    return {
      showNewProposalModal: ref(false),
      title: ref<string>(''),
      description: ref<string>(''),
      startTime: ref<string>(''),
      endTime: ref<string>(''),
    };
  },
  emits: ['hide'],
  methods: {
    submitProposal: async function () {
      blockracy.submitProposal(
        this.title,
        this.description,
        Utils.dateInSecondsFromString(this.startTime),
        Utils.dateInSecondsFromString(this.endTime)
      );
    },
    vote: async function (voteAnswer: boolean) {
      blockracy.vote(this.proposal.proposalId, voteAnswer);
    },
  },
});
</script>
