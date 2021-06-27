require('dotenv').config();
const addresses = require('../addresses.json');

const hre = require('hardhat');
const { ethers, getNamedAccounts } = hre;
const MaticPOSClient = require('@maticnetwork/maticjs').MaticPOSClient;
const delay = require('delay');
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

const TokenDeploymentL2 = require('../deployments/mumbai/SxrTokenL2.json'); 
const TokenDeploymentL1 = require('../deployments/goerli/SxrTokenL1.json');
async function main() {
  const { deployer } = await getNamedAccounts();
  console.log(`Deployer: ${deployer}, TokenL2: ${TokenDeploymentL2.address}, TokenL1: ${TokenDeploymentL1.address}`);
  const TokenL1 = await ethers.getContractAt(TokenDeploymentL1.abi, TokenDeploymentL1.address, deployer);
  const TokenL2 = await ethers.getContractAt(TokenDeploymentL2.abi, TokenDeploymentL2.address, deployer);
  
  const parentProvider = new ethers.providers.JsonRpcProvider(hre.config.networks.goerli.url);
  const wallet = new ethers.Wallet(hre.config.networks.goerli.accounts[0], parentProvider);
  
  const totalSupplyL2 = await TokenL2.totalSupply();
  console.log(`L2: ${totalSupplyL2}`); 
  const tx = await TokenL2.withdraw(ethers.utils.parseEther('1000'));
  console.log('Withdraw returned:')
  console.log(tx)
  const receipt = await tx.wait(1);
  console.log('Receipt:');
  console.log(receipt);
  
  let i = 0;
  let done = false;
  let exitCallData;
  while (!done) {
    await delay(1000*60*10);
    i += 1;
    try {
      exitCallData = await maticPOSClient.exitERC20(tx.hash, {from: deployer, encodeAbi: true});
      done = true;
    } catch(err) {
      console.log(err.message);
      console.log('Retrying, i=', i)
    }
  }
  
  console.log('Created exit transaction:')
  console.log(exitCallData);
  const tx2 = await wallet.sendTransaction({
    from: exitCallData.from,
    to: exitCallData.to,
    data: exitCallData.data
  });
  console.log('Result of exit:')
  console.log(tx2);
  

  
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
