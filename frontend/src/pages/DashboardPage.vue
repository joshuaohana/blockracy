<template>
  <div>
    <!-- TODO componentize this nonsense -->

    <div class="row q-pa-lg">
      <q-btn label="new proposal" @click="showNewProposalModal = true"></q-btn>
    </div>

    <q-list
      v-if="proposalStore?.proposals && proposalStore?.proposals.length > 0"
      bordered
      separator
    >
      <q-item
        clickable
        v-ripple
        v-for="proposal of proposalStore?.proposals"
        v-bind:key="proposal.proposalId"
        @click="
          showProposalDetailModal = true;
          selectedProposal = proposal;
        "
      >
        <q-item-label overline
          >Yes: {{ proposal.yesVotes }} No: {{ proposal.noVotes }}</q-item-label
        >
        <q-item-section>{{ proposal.title }}</q-item-section>
        <q-item-label caption
          >{{ proposal.startTimeDisplay }} -
          {{ proposal.endTimeDisplay }}</q-item-label
        >
      </q-item>
      <!-- TODO onclick, show full details in like a righthand side pane -->
    </q-list>
    <q-list v-else bordered separator>
      <q-item>
        <q-item-section>No Proposals</q-item-section>
      </q-item>
    </q-list>

    <q-dialog v-model="showNewProposalModal">
      <q-card>
        <q-card-section>
          <div class="text-h6">Create Proposal</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input v-model="title" autofocus placeholder="Title" />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input
            v-model="description"
            type="textarea"
            placeholder="Description"
          />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <p>Start Time</p>
          <q-date v-model="startTime" mask="YYYY-MM-DD HH:mm" />
          <q-time v-model="startTime" mask="YYYY-MM-DD HH:mm" />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <p>End Time</p>
          <q-date v-model="endTime" mask="YYYY-MM-DD HH:mm" />
          <q-time v-model="endTime" mask="YYYY-MM-DD HH:mm" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn label="Submit" @click="submitProposal" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showProposalDetailModal">
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ selectedProposal?.title }}</div>
        </q-card-section>

        <q-card-section>
          <p>description: {{ selectedProposal?.description }}</p>
          <p>startTime: {{ selectedProposal?.startTimeDisplay }}</p>
          <p>endTime: {{ selectedProposal?.endTimeDisplay }}</p>
          <p>proposalId: {{ selectedProposal?.proposalId }}</p>
          <p>proposer: {{ selectedProposal?.proposer }}</p>
          <p>yesVotes: {{ selectedProposal?.yesVotes }}</p>
          <p>noVotes: {{ selectedProposal?.noVotes }}</p>
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
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import wallet from '../services/wallet.service';
import blockracy from '../services/blockracy.service';
import {
  Proposal,
  ProposalStore,
  useProposalStore,
} from '../stores/proposal.store';
import Utils from '../services/utils';

export default defineComponent({
  name: 'DashboardPage',
  setup() {
    return {
      connectedAccount: ref<string | null>(),
      showNewProposalModal: ref(false),
      title: ref<string>(''),
      description: ref<string>(''),
      startTime: ref<string>(''),
      endTime: ref<string>(''),
      proposalStore: ref<ProposalStore>(),
      showProposalDetailModal: ref(false),
      selectedProposal: ref<Proposal>(),
    };
  },
  created: async function () {
    this.proposalStore = useProposalStore();
    blockracy.getAllProposals();

    // TODO clean this all up
    // TODO move to MainLayout and show CONNECT button in header if there's no address
    this.connectedAccount = await wallet.checkAlreadyConnected();
    if (!this.connectedAccount) {
      let connectedAccounts = await wallet.connectMetamask();
      if (connectedAccounts) this.connectedAccount = connectedAccounts[0];
    }
  },
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
      if (this.selectedProposal) {
        blockracy.vote(this.selectedProposal.proposalId, voteAnswer);
      }
    },
  },
});
</script>
