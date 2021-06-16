const { network: {name: networkName }} = require('hardhat');

require('dotenv').config();

module.exports = async ({getNamedAccounts, deployments}) => {
  const {deployer} = await getNamedAccounts();
  
  const  PREDICATE_ROLE = await deployments.read(
    'CtsTokenL1',
    {from:deployer},
    'PREDICATE_ROLE'
  );
  
  await deployments.execute(
    'CtsTokenL1',
    {from: deployer},
    'grantRole',
    PREDICATE_ROLE,
    process.env.MintableERC20PredicateProxy  
  );
  console.log('Granted role', PREDICATE_ROLE);
};
module.exports.tags = ['CtsTokenL1TokenGrantRole'];
module.exports.id = 'GrantRole'
module.exports.skip = async () => networkName !== 'goerli';