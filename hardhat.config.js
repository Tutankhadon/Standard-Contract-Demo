require("@nomiclabs/hardhat-ethers");
require("@eth-optimism/plugins/hardhat/compiler");
require("@eth-optimism/plugins/hardhat/ethers");

// const INFURA_ID = "<Fill your INFURA_ID>";

// const ACCOUNT_PRIVATE_KEY = "<Fill your ACCOUNT_PRIVATE_KEY>";

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.7.3",
  networks: {
    ropsten: {
      url: `https://ropsten.infura.io/v3/${INFURA_ID}`,
      accounts: [`0x${ACCOUNT_PRIVATE_KEY}`]
    },
    optimismRollup: {
      url: `https://kovan.optimism.io`,
      accounts: [`0x${ACCOUNT_PRIVATE_KEY}`]
    },
    xDaiSokol: {
      url: `https://sokol.poa.network`,
      accounts: [`0x${ACCOUNT_PRIVATE_KEY}`]
    },
    BSC_Testnet: {
      url: `https://data-seed-prebsc-1-s1.binance.org:8545`,
      accounts: [`0x${ACCOUNT_PRIVATE_KEY}`]
    },
  }
};
