<template>
  <div>
    <q-btn label="new proposal" @click="showNewProposalModal = true" />

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
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import blockracy from '../../services/blockracy.service';
import Utils from '../../services/utils';

export default defineComponent({
  name: 'NewProposalButton',
  setup() {
    return {
      showNewProposalModal: ref(false),
      title: ref<string>(''),
      description: ref<string>(''),
      startTime: ref<string>(''),
      endTime: ref<string>(''),
    };
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
  },
});
</script>
