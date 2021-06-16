/*
  Links:
    Artifacts on mumbai:
    https://github.com/maticnetwork/static/tree/master/network/testnet/mumbai/artifacts/pos

    Addresses on mumbai:
    https://static.matic.network/network/testnet/mumbai/index.json

    Calling contracts:
    https://docs.matic.network/docs/develop/ethereum-matic/pos/calling-contracts/erc20
*/

const Web3 = require('web3');
const web3 = new Web3();
const { ethers, getNamedAccounts } = require("hardhat");
const KwnTokenRootDeployment = require('../deployments/goerli/KwnToken.json');

const ERC20PredicateProxyAddress = '0xdD6596F2029e6233DEFfaCa316e6A95217d4Dc34';
const RootChainManagerArtifact = require('../MATICPOS_artifacts/RootChainManager.json');
const RootChainManagerProxyAddress = '0xBbD7cBFA79faee899Eaf900F13C9065bF03B1A74';

const KwnTokenMaticAddress = '0x75FBE0C17e33f3b65812d41592Bb8e9b785E8295';
const KwnTokenMaticArtifact = require('../MATICPOS_artifacts/ERC20.json');

async function main() {
  const { deployer, gamer1 } = await getNamedAccounts();
  console.log(`deployer: ${deployer}, gamer1: ${gamer1}`);
  
  // RootChainManager which moves data from L1 to L2
  const RootChainManager = await ethers.getContractAt(RootChainManagerArtifact.abi, RootChainManagerProxyAddress);
  // KwnToken on L1
  const KwnTokenRoot = await ethers.getContractAt(KwnTokenRootDeployment.abi, KwnTokenRootDeployment.address);

  // KwnToken on L1 approves ERC20Predicate to keep amount of Kwn tokens
  const amount = ethers.utils.parseEther("10000");
  await KwnTokenRoot.approve(ERC20PredicateProxyAddress, amount);

  const depositData = ethers.utils.defaultAbiCoder.encode(['uint256'], [amount]);
  // Move KwnTokens from L1 to L2
  const tx = await RootChainManager.depositFor(deployer, KwnTokenRoot.address, depositData);
  await tx.wait(2);
  
  const KwnTokenMatic = await ethers.getContractAt(KwnTokenMaticArtifact.abi, KwnTokenMaticAddress);
  const burnTx = await KwnTokenMatic.withdraw(amount);
  const burnTxHash = burnTx.hash;
  console.log(burnTxHash);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
