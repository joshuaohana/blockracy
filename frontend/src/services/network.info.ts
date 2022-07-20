// Just a hacky way we keep all chain/name/symbol/network/contract addresses all in one spot

// RINKEBY
export const networkInfo: NetworkInfo = {
  chainId: 0x4,
  providerUrl:
    'https://eth-rinkeby.alchemyapi.io/v2/' + process.env.RINKEBY_PROVIDER_ID,
  contracts: {
    blockracy: '0xB27f488FDc6b0D75503cD017150509169b8A0598',
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
