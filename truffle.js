const HDWalletProvider = require('truffle-hdwallet-provider');
require('dotenv').config() // Store environment-specific variable from '.env' to process.env

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host: '127.0.0.1',
      port: '7545',
      network_id: '*'
    },
    ropsten: {
      provider: () => new HDWalletProvider(process.env.PRIVATE_KEY, "https://ropsten.infura.io/v3/" + process.env.INFURA_API_KEY),
      network_id: 3
    },
    kovan: {
        provider: () => new HDWalletProvider(process.env.PRIVATE_KEY, "https://kovan.infura.io/v3/" + process.env.INFURA_API_KEY),
        network_id: 42,
        gas: 3000000,
        gasPrice: 21
      },
      rinkeby: {
        provider: () => new HDWalletProvider(process.env.PRIVATE_KEY, "https://rinkeby.infura.io/v3/" + process.env.INFURA_API_KEY),
        network_id: 4,
        gas: 3000000,
        gasPrice: 21
      },
      // main ethereum network(mainnet)
      main: {
        provider: () => new HDWalletProvider(process.env.PRIVATE_KEY, "https://mainnet.infura.io/v3/" + process.env.INFURA_API_KEY),
        network_id: 1,
        gas: 3000000,
        gasPrice: 21
      }
  }
};
