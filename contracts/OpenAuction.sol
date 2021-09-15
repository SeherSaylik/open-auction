pragma solidity ^0.8.4;
import "hardhat/console.sol";

contract OpenAuction {
    //statics
    address public owner;
    string public _auctionName;
    uint256 public _minBidPrice;

    //states
    uint256 public _highestBid;
    bool public isActive;
    address payable _highestBidderAddress;

    // Modifier
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function startAuction(string memory auctionName, uint256 minBidPrice)
        public
        onlyOwner
    {
        isActive = true;
        _minBidPrice = minBidPrice;
        _auctionName = auctionName;
        _highestBid = minBidPrice;
    }

    function endAuction() public onlyOwner {
        payable(address(owner)).transfer(_highestBid);
        isActive = false;
    }

    function bid() public payable {
        require(isActive, "Auction is not available anymore.");
        uint256 bidPrice;
        bidPrice = msg.value;
        require(bidPrice >= _minBidPrice);
        require(
            bidPrice >= _highestBid,
            "Your bid price is not bigger than the highest bid price."
        );
        _highestBidderAddress.transfer(_highestBid);
        _highestBidderAddress = payable(address(msg.sender));
        _highestBid = bidPrice;
    }

    function seeBidDetails()
        public
        view
        returns (
            string memory,
            string memory,
            uint256,
            address,
            uint256
        )
    {
        string memory status = isActive ? "Auction continues." : "Auction ended.";
        return (
            status,
            _auctionName,
            _minBidPrice,
            _highestBidderAddress,
            _highestBid
        );
    }
}
