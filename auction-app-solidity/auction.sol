// SPDX-License-Identifier: GPL-3.0

pragma solidity >= 0.7.4 < 0.9.0;

contract Auction {
    // Variable
    uint public auctionEndTime;
    uint public hightestBid;
    uint public timeEnd;
    address public hightestBidder;
    address payable public createAuction;
    bool ended;

    mapping(address => uint) public bidderList;

    constructor(address payable _address, uint _timeEnd) {
        createAuction = _address;
        timeEnd = block.timestamp + _timeEnd;
    }

    // Function
    function bid() public payable {
        if(block.timestamp < auctionEndTime) {
            revert("Phien dau gia ket thuc!");
        }

        if(msg.value <= hightestBid) {
            revert("Gia cua ban thap hon gia cao nhat!");
        }

        hightestBid = msg.value;
        hightestBidder = msg.sender;
        bidderList[msg.sender] = msg.value;
    }

    function auctionEnd() public payable {
        if(ended) {
            revert("Phien dau gia da ket thuc!");
        }
        if(block.timestamp < timeEnd) {
            revert("Phien dau gia chua the ket thuc");
        }

        ended = true;

        createAuction.transfer(hightestBid);
        bidderList[hightestBidder] = 0;
        
    }
}