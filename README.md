# TestBridge abstract

Here we check functionality of Matic POST Bridge.

# Description

## Deploy token on L1

Reference: https://docs.matic.network/docs/develop/ethereum-matic/mintable-assets

We took contracts/root/RootToken/DummyMintableERC20.sol and edited it to SxrTokenL1.sol. Minting is 
optional, for production we'll not mint anything on L1.

The we granted PREDICATE_ROLE to "MintableERC20PredicateProxy" ( "0x37c3bfC05d5ebF9EBb3FF80ce0bd0133Bf221BC8" ).

Verify the contract with etherscan plugin.

## Deploy token on L2

We used https://github.com/maticnetwork/pos-portal/blob/master/contracts/child/ChildToken/ChildMintableERC20.sol

and modified to SxrTokenL2.sol.
We added `burn()` function to simulate the one from real project.

Verify on Matic explorer: https://explorer-mumbai.maticvigil.com/

Only flatten contracts can be verified, imports are not supported.  Use https://abi.hashex.org/ tpo encode constructor params.

Make sure optimization run number fits exactly on hardhat and verifier page.

## Map on the bridge

Use https://mapper.matic.today/

## Checking L2->L1 transfer

`scripts/fromMaticSDK.js` does not work as `exitERC20()` never detects that transaction is mined on the L1. I kept this script just as a reference.

`scripts/fromMatic.js` does work, we use contact callings and `exitERC20()` is
used to get exit data only.

`scripts/fromMaticWithRepeat.js` is as `fromMatic.js` but with repeat function in the case of transaction being not confirmed.

### Calling `fromMaticSDK.js`:

```bash
> node scripts/fromMaticSDK.js
```

### Calling `fromMatic.js`:

```bash
> npx hardhat --network mumbai run scripts/fromMatic.js
```

We use hardhat to run this script though we could refactor to not use it. We set 15 minutes to wait for the burn transaction to be validated with `exitERC20()`
function.

## Checking L1->L2 transfer

`scripts/toMaticSDK.js` works ok with SDK.

### Note

SDK does not accept bignumbers from `ethers.utils.parseEther('1000')`.

## Checking burning on L2

We added burn function on the L2 token contract. Test with 

```bash
> npx hardhat --network mumbai run scripts/burnOnMatic.js
```


## References
https://docs.matic.network/docs/develop/ethereum-matic/pos/deployment
https://abi.hashex.org/


