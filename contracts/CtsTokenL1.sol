//SPDX-License-Identifier: Unlicense
pragma solidity ^0.6.6;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@maticnetwork/pos-portal/contracts/common/AccessControlMixin.sol";
import "@maticnetwork/pos-portal/contracts/common/NativeMetaTransaction.sol";
import "@maticnetwork/pos-portal/contracts/common/ContextMixin.sol";
import "@maticnetwork/pos-portal/contracts/root/RootToken/IMintableERC20.sol";
import "@maticnetwork/pos-portal/contracts/common/EIP712Base.sol";

contract CtsTokenL1 is ERC20, AccessControlMixin, NativeMetaTransaction, ContextMixin, IMintableERC20 {
  bytes32 public constant PREDICATE_ROLE = keccak256("PREDICATE_ROLE");

  constructor(string memory name_, string memory symbol_) 
    public 
    ERC20(name_, symbol_) 
  {
    _setupContractId("CtsTokenL1");
    _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
    _setupRole(PREDICATE_ROLE, _msgSender());
    _initializeEIP712(name_);
  }
  
  function mint(address user, uint256 amount) external override only(PREDICATE_ROLE) {
    _mint(user, amount);
  }
  
}