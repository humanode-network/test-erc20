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

const SUBSTRATE_DEV_SEED_PHRASE =
  "bottom drive obey lake curtain smoke basket hold race lonely fit walk";

const config: HardhatUserConfig = {
  solidity: "0.8.17",

  networks: {
    // Get and run the `humanode-peer` locally with `--dev` flag.
    "humanode-local": {
      url: "http://localhost:9933",
      // Dev seed private keys.
      accounts: {
        mnemonic: SUBSTRATE_DEV_SEED_PHRASE,
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 2,
      },
    },

    // https://link.humanode.io/docs/chains
    "humanode-testnet5": {
      chainId: 0x3a05,
      url: "https://explorer-rpc-http.testnet5.stages.humanode.io",
      accounts: accounts("TESTNET5"),
    } satisfies HttpNetworkUserConfig,

    // https://link.humanode.io/docs/chains
    "humanode-mainnet": {
      chainId: 5234,
      url: "https://explorer-rpc-http.mainnet.stages.humanode.io",
      accounts: accounts("MAINNET"),
    } satisfies HttpNetworkUserConfig,
  },
};

export default config;
