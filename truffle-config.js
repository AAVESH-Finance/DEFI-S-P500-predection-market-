const path = require("path");
require("dotenv").config({path: "./.env"});
const HDWalletProvider = require("@truffle/hdwallet-provider");
const AccountIndex = 0;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: './frontend/src/contracts',
  networks: {
    development: {
      port: 8545,
      host: "127.0.0.1",
      network_id: 5777
    },
    ganache_local: {
      provider: function() {
        return new HDWalletProvider(process.env.MNEMONIC, "http://127.0.0.1:8545", AccountIndex)
      },
      network_id: 5777
    },
    rinkeby_infura: {
      provider: function() {
        return new HDWalletProvider(process.env.MNEMONIC, "https://rinkeby.infura.io/v3/6d91ef39fb7141c2876439f1e7ccba72", AccountIndex)
      },
      network_id: 4
    },
    ropsten_infura: {
      provider: function() {
        return new HDWalletProvider(process.env.MNEMONIC, "https://ropsten.infura.io/v3/6d91ef39fb7141c2876439f1e7ccba72", AccountIndex)
      },
      network_id: 3
    }
  },
  compilers: {
    solc: {
      version: "0.7.3"
    }
  }
};