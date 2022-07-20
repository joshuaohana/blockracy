<template>
  <div>
    <q-list
      v-if="proposalStore?.proposals && proposalStore?.proposals.length > 0"
      bordered
      separator
    >
      <proposal-list-item
        :proposal="proposal"
        v-for="proposal of proposalStore.formattedProposals"
        v-bind:key="proposal.proposalId"
      />
    </q-list>

    <q-list v-else bordered separator>
      <q-item>
        <q-item-section>No Proposals</q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { ProposalStore, useProposalStore } from '../../stores/proposal.store';
import ProposalListItem from './ProposalListItem.vue';

export default defineComponent({
  name: 'ProposalList',
  components: { ProposalListItem },
  setup() {
    return {
      proposalStore: ref<ProposalStore>(),
    };
  },
  created: async function () {
    this.proposalStore = useProposalStore();
  },
});
</script>
