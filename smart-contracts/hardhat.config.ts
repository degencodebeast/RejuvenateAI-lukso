import { HardhatUserConfig, extendEnvironment } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require('dotenv').config()
//import "@openzeppelin/hardhat-upgrades"
import 'hardhat-gas-reporter';
import 'solidity-coverage';
import "@nomiclabs/hardhat-etherscan";
import "hardhat-deploy";
//import "hardhat-contract-sizer";
//import "@openzeppelin/hardhat-upgrades";
//import "@nomiclabs/hardhat-ethers";
// const walletPrivateKey =  `${process.env.PRIVATE_KEY}`

// Add Web3Provider to HRE
// eslint-disable-next-line no-undef
extendEnvironment(async (hre: any) => {
  hre.Web3Provider = new hre.ethers.providers.Web3Provider(
    hre.network.provider
  );
});

// Add LSPFactory to HRE
// eslint-disable-next-line no-undef
extendEnvironment(async (hre: any) => {
  const { LSPFactory } = require("@lukso/lsp-factory.js");
  hre.LSPFactory = LSPFactory;

  // hre.network.provider is an EIP1193-compatible provider.
  hre.lspFactory = new LSPFactory(hre.Web3Provider, {
    deployKey: hre.network.config.accounts, // Private key of the account which will deploy smart contracts
    chainId: hre.network.config.chainId,
  });
});


// Add ERC725 to HRE
// eslint-disable-next-line no-undef
extendEnvironment(async (hre: any) => {
  const { ERC725 } = require("@erc725/erc725.js");
  hre.ERC725 = ERC725;
});


const config: HardhatUserConfig = {
  // solidity: "0.8.0",
  paths: { tests: "tests" },
  solidity: {
    version: '0.8.9',
    settings: {
      evmVersion: process.env.EVM_VERSION || 'london',
      optimizer: {
        enabled: true,
        runs: 10000,
        details: {
          peephole: true,
          inliner: true,
          jumpdestRemover: true,
          orderLiterals: true,
          deduplicate: true,
          cse: true,
          constantOptimizer: true,
          yul: true,
          yulDetails: {
            stackAllocation: true,
          },
        },
      },

    },

  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    lukso: {
      url: "https://rpc.testnet.lukso.network",
      chainId: 4201,
      accounts: [`${process.env.PRIVATE_KEY}`],
    },
    filecoinCalibrationNet: {
      url: "https://filecoin-calibration.chainstacklabs.com/rpc/v1",
      chainId: 314159,
      accounts: [`${process.env.PRIVATE_KEY}`],
    },
    filecoinMainnet: {
      url: "https://api.node.glif.io", //'https://rpc.ankr.com/filecoin_testnet', //https://filecoin-hyperspace.chainstacklabs.com/rpc/v1
      chainId: 314,
      accounts: [`${process.env.PRIVATE_KEY}`],
    },
    mumbai: {
      url: "https://polygon-mumbai.blockpi.network/v1/rpc/public",
      chainId: 80001,
      accounts: [`${process.env.PRIVATE_KEY}`],
    },
    lilypad: {
      url: "http://testnet.lilypadnetwork.org:8545",
      chainId: 1337,
      accounts: [`${process.env.PRIVATE_KEY}`],
    },
    arbitrumGoerli: {
      url: "https://goerli-rollup.arbitrum.io/rpc",
      chainId: 421613,
      accounts: [`${process.env.PRIVATE_KEY}`],
    },
    aurora: {
      url: "https://testnet.aurora.dev",
      chainId: 1313161555,
      accounts: [`${process.env.PRIVATE_KEY}`],
    }
  },
  typechain: {
    target: "ethers-v5"
  },
  etherscan: {
    apiKey: {
      polygon: "7RQGFQS84Q5FNNF84YQ61T3MQDJ5Y1EB1B" ?? "",
      polygonMumbai: "7RQGFQS84Q5FNNF84YQ61T3MQDJ5Y1EB1B" ?? "",
      goerli: "1T7UC6DGWNA36AVHC4IGIRRE1MTGCSKE74" ?? "",
      arbitrumGoerli: "BWEYRFH5RWRPMMDNAG5WVMQGGEWRS754R6" ?? "",
    },
  },
  namedAccounts: {
    deployer: 0
  },

};

export default config;