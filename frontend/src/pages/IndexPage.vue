<template>
  <div>
    <div class="row q-pa-lg">
      <new-proposal-button />
    </div>

    <proposal-list />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import blockracy from '../services/blockracy.service';
import NewProposalButton from './Proposals/NewProposalButton.vue';
import ProposalList from './Proposals/ProposalList.vue';

export default defineComponent({
  name: 'IndexPage',
  components: { NewProposalButton, ProposalList },
  setup() {
    return {
      showNewProposalModal: ref(false),
      title: ref<string>(''),
      description: ref<string>(''),
      startTime: ref<string>(''),
      endTime: ref<string>(''),
    };
  },
  created: async function () {
    blockracy.getAllProposals();
  },
});
</script>
