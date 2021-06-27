
const addresses = require('../addresses.json');
const { network: {name: networkName }} = require('hardhat');

module.exports = async ({
  getNamedAccounts,
  deployments,
}) => {
  const {deploy} = deployments;
  const {deployer} = await getNamedAccounts();
  const deployResult = await deploy('SxrTokenL2', {
    from: deployer,
    // gasLimit: 50000,
    // gasPrice: 60000000000,
    args: [
      'SxrTokenL2',
      'SxrTokenL2',
      400000,
      18,
      addresses.ChildChainManagerProxy
    ],
    log: true,
  });
  // console.log(deployResult);
};
module.exports.tags = ['VivaTokenL2'];
module.exports.skip = async () => networkName !== 'mumbai';