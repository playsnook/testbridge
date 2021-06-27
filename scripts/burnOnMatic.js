// testing burn function with which we extended L2 template token.

require('dotenv').config();
const { getNamedAccounts } = require('hardhat');

const TokenDeploymentL2 = require('../deployments/mumbai/SxrTokenL2.json'); 
async function main() {
  const { deployer } = await getNamedAccounts();
  console.log(`Deployer: ${deployer}, TokenL2: ${TokenDeploymentL2.address}`);
  const TokenL2 = await ethers.getContractAt(TokenDeploymentL2.abi, TokenDeploymentL2.address, deployer);
  await TokenL2.burn(ethers.utils.parseEther('100'));  
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
