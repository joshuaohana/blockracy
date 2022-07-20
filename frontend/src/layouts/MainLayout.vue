<template>
  <q-layout view="hhh lpr fff">
    <q-header>
      <q-toolbar>
        <q-toolbar-title> Blockracy </q-toolbar-title>
        <span v-if="walletStore.connectedAddress">{{
          walletStore.connectedAddress
        }}</span>
        <q-btn
          v-if="!walletStore.connectedAddress"
          label="connect"
          @click="connect"
        />
      </q-toolbar>
    </q-header>

    <q-page-container v-if="isSmartBrowser">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Notify } from 'quasar';

import wallet from '../services/wallet.service';
import { networkInfo } from '../services/network.info';
import { WalletStore, useWalletStore } from '../stores/wallet.store';

export default defineComponent({
  name: 'MainLayout',

  setup() {
    return {
      isSmartBrowser: ref<boolean>(false),
      walletStore: ref<WalletStore>({} as WalletStore),
    };
  },

  created: async function () {
    this.walletStore = useWalletStore();

    this.isSmartBrowser = wallet.checkBrowser();
    if (!this.isSmartBrowser) {
      Notify.create({
        type: 'negative',
        message: 'Need connected wallet or smart browser',
      });
      return;
    }

    const isRightNetwork = await wallet.isRightNetwork();
    if (!isRightNetwork) {
      Notify.create({
        type: 'negative',
        message: `Wrong network, connect to ${networkInfo.chainName}`,
      });
      return;
    }

    const connectedAccount = await wallet.checkAlreadyConnected();
    if (connectedAccount) {
      this.walletStore.connectedAddress = connectedAccount;
    }

    wallet.onChainChanged(async () => {
      const isRightNetwork = await wallet.isRightNetwork();
      if (!isRightNetwork) {
        Notify.create({
          type: 'negative',
          message: `Wrong network, connect to ${networkInfo.chainName}`,
        });
        return;
      }
    });

    wallet.onAccountsChanged(async (accounts: Array<string>) => {
      if (accounts.length == 0) {
        this.walletStore.connectedAddress = null;
      } else {
        const connectedAccount = await wallet.checkAlreadyConnected();
        if (connectedAccount) {
          this.walletStore.connectedAddress = connectedAccount;
        }
      }
    });
  },

  methods: {
    connect: async function () {
      let connectedAccounts = await wallet.connectMetamask();
      if (connectedAccounts) {
        this.walletStore.connectedAddress = connectedAccounts[0];
      }
    },
  },
});
</script>
