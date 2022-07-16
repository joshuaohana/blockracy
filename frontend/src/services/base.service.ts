// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let window: any;

import { ContractInterface, ethers, Contract } from 'ethers';
import { networkInfo } from './network.info';

export default abstract class BaseService {
  protected signer: ethers.providers.JsonRpcSigner =
    null as unknown as ethers.providers.JsonRpcSigner;
  protected contract: Contract;
  protected connectedContract: Contract = null as unknown as Contract;
  protected contractAbi: ContractInterface;
  protected contractAddress;
  protected connectedAddress: string | null = null;

  constructor(contractAddress: string, contractAbi: ContractInterface) {
    this.contractAddress = contractAddress;
    this.contractAbi = contractAbi;

    let provider = new ethers.providers.JsonRpcProvider(
      networkInfo.providerUrl
    );
    if (networkInfo.local)
      provider = new ethers.providers.Web3Provider(window.ethereum);

    this.contract = new ethers.Contract(contractAddress, contractAbi, provider);
    try {
      this.signer = new ethers.providers.Web3Provider(
        window.ethereum
      ).getSigner();

      this.connectedContract = this.contract.connect(this.signer);

      this.signer.getAddress().then((connectedAddress) => {
        this.connectedAddress = connectedAddress;
        void this.init();
      });
    } catch (err) {
      // browser missing web3 plugin / smart browser / wallet
    }
  }

  protected async init(): Promise<void> {
    return;
  }
}
