require('dotenv').config();

const { network: {name: networkName }} = require('hardhat');

module.exports = async ({
  getNamedAccounts,
  deployments,
}) => {
  const {deploy} = deployments;
  const {deployer} = await getNamedAccounts();
  const deployResult = await deploy('CtsTokenL2', {
    from: deployer,
    // gasLimit: 50000,
    // gasPrice: 60000000000,
    args: [
      'CtsTokenL2',
      'CtsTokenL2',
      400000,
      18,
      process.env.ChildChainManagerProxy
    ],
    log: true,
  });
  // console.log(deployResult);
};
module.exports.tags = ['CtsTokenL2'];
module.exports.skip = async () => networkName !== 'mumbai';