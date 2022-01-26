pragma solidity ^0.8.4;

contract LogicV2 {
	bool initialized;
	address public owner;
  address private tokenAddress;
  uint public crossFee; // in gwei

	modifier onlyOwner() {
    require (msg.sender == owner);
    _;
  }

	constructor() {
    owner = msg.sender;
  }

	function crossSend(
    address recipient,
    uint tokenAmount,
    uint nonce) external payable {
    // check fee
    require(msg.value >= crossFee, "Insufficient fee.");
		crossFee = 4;
	}

	function crossRecv(
    address sender,
    address recipient, 
    uint tokenAmount,
    uint nonce) external onlyOwner {
		crossFee = 5;
	}

	function setOwner(address owner_) external onlyOwner {
    require(owner_ != address(0), "Owner can not be null.");
    owner = owner_;
  }
}