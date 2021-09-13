const { parseBytes32String } = require("@ethersproject/strings");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("OpenAuction", function () {
  it("Should return the auction information currently", async function () {
    const [owner, addr1, addr2] = await ethers.getSigners();
    const Auction = await ethers.getContractFactory("OpenAuction");
    const auction = await Auction.deploy();
    await auction.deployed();
    const startAuction= await auction.startAuction("First Auction", 1000000);
    const rawBidDetails= await auction.seeBidDetails();
    const bidDetails= [rawBidDetails[0], parseInt(rawBidDetails[1]._hex, 16)]
    expect(bidDetails[0], bidDetails[1]).to.equal('First Auction', 1000000);

  });
});
