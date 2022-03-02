// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Faucet {
    // Add funds, Withdraw, Address Index, getFunders
    uint256 public numOfFunder;
    mapping(address => bool) public funders;
    mapping(uint256 => address) public loopFunders;

    receive() external payable {}

    function addFunds() external payable {
        address funder = msg.sender;

        if(!funders[funder]) {
            uint256 index = numOfFunder++;
            funders[funder] = true;
            loopFunders[index] = funder;
        }
    }

    function getAllFunders() external view returns(address[] memory) {
        address[] memory _funders = new address[](numOfFunder);

        for(uint256 i; i < numOfFunder; i++) {
            _funders[i] = loopFunders[i];
        }

        return _funders;
    }

    function withdraw(uint256 withdrawAmount) external limitWithdraw(withdrawAmount) {
        payable(msg.sender).transfer(withdrawAmount);
    }

    modifier limitWithdraw(uint256 withdrawAmount) {
        require(withdrawAmount <= 1e18, "cannot withdraw more than 1 ETH!");
        _;
    }
}
