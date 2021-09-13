const { parseBytes32String } = require("@ethersproject/strings");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("OpenAuction", async function () {

  it("Should return the auction information currently", async function () {
    const [owner, addr1, addr2] = await ethers.getSigners();
    const Auction = await ethers.getContractFactory("OpenAuction");
    const auction = await Auction.deploy();
    await auction.deployed();
    const startAuction= await auction.startAuction("First Auction", 1000000);
    const rawBidDetails= await auction.seeBidDetails();
    const bidDetails= [rawBidDetails[0], parseInt(rawBidDetails[1]._hex, 16), rawBidDetails[2], parseInt(rawBidDetails[3]._hex, 16), rawBidDetails[4]]
    expect(bidDetails[0], bidDetails[1], bidDetails[2], bidDetails[3], bidDetails[4]).to.equal("Auction continues.", "First Auction", 1000000, "0x0000000000000000000000000000000000000000", 1000000);
  });

  it("When someone bid we should be able to see it by calling the function", async function(){
    const [owner, addr1, addr2] = await ethers.getSigners();
    const Auction = await ethers.getContractFactory("OpenAuction");
    const auction = await Auction.deploy();
    await auction.deployed();
    const startAuction= await auction.startAuction("First Auction", 1000000);
    await auction.connect(addr1).bid({from:addr1.address, value: 1100000});    
    const rawBidDetails= await auction.seeBidDetails();
    const bidDetails= [rawBidDetails[0], parseInt(rawBidDetails[1]._hex, 16), rawBidDetails[2], parseInt(rawBidDetails[3]._hex, 16), rawBidDetails[4]]
    expect(bidDetails[0], bidDetails[1], bidDetails[2], bidDetails[3], bidDetails[4]).to.equal("Auction continues.", "First Auction", 1000000, addr1.address, 1100000);
  })
});
