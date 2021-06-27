
// just to test https://abi.hashex.org/
const Web3 = require('web3');
const web3 = new Web3();
const { ethers, getNamedAccounts } = require("hardhat");

async function main() {
  
  const encoded = ethers.utils.defaultAbiCoder.encode(
    [
      'string',
      'string',
      'uint256',
      'uint8',
      'address'
    ], 
    [
      'CtsTokenL2',
      'CtsTokenL2',
      400000,
      18,
      '0xb5505a6d998549090530911180f38aC5130101c6'
    ]
  );
  console.log(encoded);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
