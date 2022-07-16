// Just a hacky way we keep all chain/name/symbol/network/contract addresses all in one spot

// RINKEBY
export const networkInfo: NetworkInfo = {
  chainId: 0x4,
  providerUrl:
    'https://eth-rinkeby.alchemyapi.io/v2/' + process.env.RINKEBY_PROVIDER_ID,
  contracts: {
    blockracy: '0x64382Ab7B37088529803968a1bB1caCA63889cA8',
  },
  local: false,
  rpcUrls: ['https://rinkeby.infura.io/v3/'],
  chainName: 'Rinkeby',
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
  },
};

export interface NetworkInfo {
  chainId: number;
  providerUrl: string;
  contracts: { [contract: string]: string };
  local: boolean;
  rpcUrls: string[];
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
}
