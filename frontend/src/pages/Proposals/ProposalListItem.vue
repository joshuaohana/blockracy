<template>
  <div>
    <q-item
      clickable
      v-ripple
      @click="
        showProposalDetailModal = true;
        selectedProposal = proposal;
      "
    >
      <q-item-label overline
        >Yes: {{ proposal.yesVotes }} No: {{ proposal.noVotes }}
      </q-item-label>
      <q-item-section
        ><div class="q-ml-lg">
          <span style="font-size: 12px; margin-right: 10px"
            >({{ proposal.status }})</span
          >
          <span style="font-size: 16px; font-weight: 500">{{
            proposal.title
          }}</span>
        </div></q-item-section
      >
      <q-item-label caption
        >{{ proposal.startTimeDisplay }} -
        {{ proposal.endTimeDisplay }}</q-item-label
      >
    </q-item>

    <proposal-detail-modal
      v-if="selectedProposal"
      :proposal="selectedProposal"
      :show="showProposalDetailModal"
      @hide="showProposalDetailModal = false"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { Proposal } from '../../stores/proposal.store';
import ProposalDetailModal from './ProposalDetailModal.vue';

export default defineComponent({
  name: 'ProposalListItem',
  components: { ProposalDetailModal },
  props: {
    proposal: {
      type: Object as PropType<Proposal>,
      required: true,
    },
  },
  setup() {
    return {
      selectedProposal: ref<Proposal>(),
      showProposalDetailModal: ref(false),
    };
  },
});
</script>
