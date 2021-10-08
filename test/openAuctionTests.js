const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("OpenAuction", async function () {

  const initAuction = async () => {
    const Auction = await ethers.getContractFactory("OpenAuction");
    const auction = await Auction.deploy();
    await auction.deployed();
    await auction.startAuction("First Auction", 1000000); // start the auction 
    return auction
  }

  it("Should return the auction information", async function () {
    const auction = await initAuction();
    const rawBidDetails = await auction.seeBidDetails();
    const bidDetails = [
      rawBidDetails[0],
      parseInt(rawBidDetails[1]._hex, 16),
      rawBidDetails[2],
      parseInt(rawBidDetails[3]._hex, 16),
      rawBidDetails[4],
    ];

    expect(
      bidDetails[0],
      bidDetails[1],
      bidDetails[2],
      bidDetails[3],
      bidDetails[4]
    ).to.equal(
      "Auction continues.",
      "First Auction",
      1000000,
      "0x0000000000000000000000000000000000000000",
      1000000
    );
  });

  it("When someone bid we should be able to see it by calling the `bidDetails` function", async function () {
    const [addr1] = await ethers.getSigners();
    const auction = await initAuction();
    await auction.connect(addr1).bid({ from: addr1.address, value: 1100000 });
    const rawBidDetails = await auction.seeBidDetails();
    const bidDetails = [
      rawBidDetails[0],
      parseInt(rawBidDetails[1]._hex, 16),
      rawBidDetails[2],
      parseInt(rawBidDetails[3]._hex, 16),
      rawBidDetails[4],
    ];

    expect(
      bidDetails[0],
      bidDetails[1],
      bidDetails[2],
      bidDetails[3],
      bidDetails[4]
    ).to.equal(
      "Auction continues.",
      "First Auction",
      1000000,
      addr1.address,
      1100000
    );
  });

  it("When we end auction we should be seeing 'Auction ended' status", async function () {
    const [owner, addr1, addr2] = await ethers.getSigners();
    const auction = await initAuction(); //(We don't have to specify the address in startAuction function. It takes first element of getSigners' array as owner address.)
    await auction.connect(addr1).bid({ from: addr1.address, value: 1100000 });
    await auction.connect(addr2).bid({from: addr2.address, value: 1200000})
    await auction.connect(owner).endAuction();
    const bidDetails = await auction.seeBidDetails();
    expect(bidDetails[0]).to.equal("Auction ended.")
  });
});
