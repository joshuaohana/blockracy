import { defineStore } from 'pinia';

export const useWalletStore = defineStore('wallet', {
  state: (): WalletStore => ({
    connectedAddress: null,
  }),
});

export interface WalletStore {
  connectedAddress: string | null;
}
