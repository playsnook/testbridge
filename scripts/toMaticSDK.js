/*
  Links:
    Artifacts on mumbai:
    https://github.com/maticnetwork/static/tree/master/network/testnet/mumbai/artifacts/pos

    Addresses on mumbai:
    https://static.matic.network/network/testnet/mumbai/index.json

    Calling contracts:
    https://docs.matic.network/docs/develop/ethereum-matic/pos/calling-contracts/erc20
*/

const addresses = require('../addresses.json');
const hre = require('hardhat');
const TokenDeploymentL2 = require('../deployments/mumbai/SxrTokenL2.json'); 
const TokenDeploymentL1 = require('../deployments/goerli/SxrTokenL1.json');
const MaticPOSClient = require('@maticnetwork/maticjs').MaticPOSClient;
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
  const amount = 1000000000;
  const TokenL1 = TokenDeploymentL1.address;
  console.log(from, TokenL1)
  await maticPOSClient.approveERC20ForDeposit(TokenL1, amount, { from });
  await maticPOSClient.depositERC20ForUser(TokenL1, from, amount, {from});
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
