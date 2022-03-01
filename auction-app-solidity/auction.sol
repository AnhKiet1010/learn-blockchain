// SPDX-License-Identifier: GPL-3.0

pragma solidity >= 0.7.4 < 0.9.0;

contract Auction {
    // Variable
    uint public auctionEndTime;

    uint public hightestBid;

    address public hightestBidder;

    mapping(address -> uint) public bidderList;

    // Function
    function bid() public payable {
        if(block.timestamp < auctionEndTime) {
            revert("Phiên đấu giá đã kết thúc!");
        }

        if(msg.value <= hightestBid) {
            revert("Giá của Bạn thấp hơn giá cao nhất!");
        }

        if(hightestBid != 0) {
            hightestBid = msg.value;
            hightestBidder = msg.sender;
            bidderList[msg.sender] = msg.value;
        }
    }

    function withdraw() public return (bool) {
        uint amount = bidderList[]
    }

    function auctionEnd() public {

    }
}