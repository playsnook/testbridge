require('dotenv').config();
const addresses = require('../addresses.json');
const {address: TokenL2} = require('../deployments/mumbai/SxrTokenL2.json');

const hre = require('hardhat');
const MaticPOSClient = require('@maticnetwork/maticjs').MaticPOSClient;
const delay = require('delay');

const Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');

const parentProvider = new HDWalletProvider(
  hre.config.networks.goerli.accounts[0],
  hre.config.networks.goerli.url
);
const maticProvider = new HDWalletProvider(
  hre.config.networks.mumbai.accounts[0],
  hre.config.networks.mumbai.url
);

const maticPOSClient = new MaticPOSClient({
  network: "testnet",
  version: "mumbai",
  parentProvider,
  maticProvider, 
  posRootChainManager: addresses.RootChainManagerProxy,
  posERC20Predicate: addresses.MintableERC20PredicateProxy
});


async function main() {
  const from = '0x9a1187cB7084F3E60a8b99eb195D9f3c29361a8a';
  
  const tx = await maticPOSClient.burnERC20(TokenL2, 100000000, {from});
  console.log('Withdraw returned:')
  console.log(tx);
  let done = false;
  let i = 0;
  while (!done) {
    await delay(1000*60*10); // 10 mins delay
    i += 1;
    try {
      await maticPOSClient.exitERC20(tx.transactionHash, {from});
      done = true;
    } catch(err) {
      console.log('Retry, i=', i);
    }
  }
  console.log('Done');
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
