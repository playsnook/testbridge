// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


contract Greeter {
  string greeting;
  struct Point {
    uint256 x;
    uint256 y;
  }

  enum Status { OK, FAILURE } 

  mapping(address => Point) points;

  constructor(Point[] memory points_) {
    for (uint i=0; i<points_.length; i++) {
      points[msg.sender] = points_[i];
    }
    
  }

  function getStatus() pure public returns (Status) {
    return Status.OK;
  }

  function getPoint() public view returns(Point memory) {
    return points[msg.sender];
  }
}
