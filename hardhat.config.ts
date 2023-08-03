import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import {
  HttpNetworkAccountsUserConfig,
  HttpNetworkUserConfig,
} from "hardhat/types";

const accounts = (prefix: string): HttpNetworkAccountsUserConfig => {
  const privkey = process.env[`${prefix}_PRIVKEY`];
  if (privkey) {
    return [privkey];
  }
  return {
    mnemonic:
      process.env[`${prefix}_MNEMONIC`] ||
      "test test test test test test test test test test test junk",
  };
};

const config: HardhatUserConfig = {
  solidity: "0.8.17",

  networks: {
    // https://link.humanode.io/docs/chains
    testnet5: {
      chainId: 0x3a05,
      url: "https://explorer-rpc-http.testnet5.stages.humanode.io",
      accounts: accounts("TESTNET5"),
    } satisfies HttpNetworkUserConfig,
  },
};

export default config;
