const { ethers, getNamedAccounts } = require('hardhat');
const MtcTokenAddressL2 = '0xB70197B1427Bf51e20729B4A916b90703F4545cC';
const ChildERC20Artifact = require('../MATICPOS_artifacts/ChildMintableERC20.json');
const MtcTokenDeploymentL1 = require('../deployments/goerli/MtcToken.json'); 
async function main() {
  const { deployer } = await getNamedAccounts();
  console.log(`Deployer: ${deployer}`);
  // const MtcTokenL1 = await ethers.getContractAt(MtcTokenDeploymentL1.abi, MtcTokenDeploymentL1.address);
  const MtcTokenL2 = await ethers.getContractAt(ChildERC20Artifact.abi, MtcTokenAddressL2);
  // const totalSupplyL1 = await MtcTokenL1.totalSupply();
  // console.log(`L1: ${totalSupplyL1}`); 
  await MtcTokenL2.mint(deployer, ethers.BigNumber.from('100'));
  const totalSupplyL2 = await MtcTokenL2.totalSupply();
  console.log(`L2: ${totalSupplyL2}`); 

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
