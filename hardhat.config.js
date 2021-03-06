require('dotenv').config();
require("@nomiclabs/hardhat-waffle");
require('hardhat-deploy');
//require('hardhat-deploy-ethers');
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-solhint");


// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.0",
  namedAccounts: {
    deployer: 0,
    gamer1: 1,
    gamer2: 2
  }, 
  
  networks: {
    mumbai: {
      url: `https://rpc-mumbai.maticvigil.com/v1/${process.env.MATIC_APP_KEY}`,
      accounts: [ // private keys of the accounts; namedAccounts fit this array
        process.env.PK1,
        process.env.PK2,
        process.env.PK3
      ]
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${process.env.INFURA_APP_KEY}`,
      accounts: [ // private keys of the accounts; namedAccounts fit this array
        process.env.PK1,
        process.env.PK2,
        process.env.PK3
      ]
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${process.env.INFURA_APP_KEY}`,
      accounts: [ // private keys of the accounts; namedAccounts fit this array
        process.env.PK1,
        process.env.PK2,
        process.env.PK3
      ]

    },
    kovan: {
      url: `https://kovan.infura.io/v3/${process.env.INFURA_APP_KEY}`,
      accounts: [ // private keys of the accounts; namedAccounts fit this array
        process.env.PK1,
        process.env.PK2,
        process.env.PK3
      ]
    }

  },
  solidity: {
    compilers: [
      {
        version: '0.6.6',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
      {
        version: '0.8.0',
        settings: {
          optimizer: {
            enabled: false,
            runs: 200
          }
        }
      },
      
    ]
  },

  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: process.env.ETHERSCAN_TOKEN
  },
};

