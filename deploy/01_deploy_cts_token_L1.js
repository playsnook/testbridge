const { network: {name: networkName }} = require('hardhat');
module.exports = async ({
  getNamedAccounts,
  deployments,
}) => {
  const {deploy} = deployments;
  const {deployer} = await getNamedAccounts();
  const deployResult = await deploy('CtsTokenL1', {
    from: deployer,
    // gasLimit: 50000,
    // gasPrice: 60000000000,
    args: [
      'CtsTokenL1',
      'CtsTokenL1'
    ],
    log: true,
  });
  // console.log(deployResult);
};
module.exports.tags = ['CtsTokenL1'];
module.exports.skip = async () => networkName !== 'goerli';