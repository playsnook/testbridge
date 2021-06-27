const addresses = require('../addresses.json');
const { network: {name: networkName }} = require('hardhat');

module.exports = async ({getNamedAccounts, deployments}) => {
  const {deployer} = await getNamedAccounts();
  
  const  PREDICATE_ROLE = await deployments.read(
    'SxrTokenL1',
    {from:deployer},
    'PREDICATE_ROLE'
  );
  
  await deployments.execute(
    'SxrTokenL1',
    {from: deployer},
    'grantRole',
    PREDICATE_ROLE,
    addresses.MintableERC20PredicateProxy  
  );
  console.log('Granted role', PREDICATE_ROLE);
};
module.exports.tags = ['SxrTokenL1TokenGrantRole'];
module.exports.id = 'GrantRole'
module.exports.skip = async () => networkName !== 'goerli';