import React, {useState} from 'react';
import auctionABI from './artifacts/contracts/OpenAuction.sol/OpenAuction.json';
import Web3 from 'web3';
import './App.css';

const web3= new Web3(window.web3.currentProvider);

const callContract=async ()=>{
   const auctionContractABI= auctionABI.abi;
   const auctionAddress= '0x86937D64BaEdB13D28E29d81Dd3fA6A7c78afAe8';
   const auctionContract = await new web3.eth.Contract(auctionContractABI, auctionAddress)
   const defaultAccount = (await web3.eth.getAccounts())[0]
   return {
      defaultAccount,
      auctionContract
   }
};

function Admin(){
   const [auctionStatus, setAuctionStatus]= useState();
   const [auctionName, setAuctionName]=useState();
   const [newAuctionName, setNewAuctionName]= useState();
   const [newAuctionPrice, setNewAuctionPrice]= useState();

   const getBidDetails=async ()=>{
      const { auctionContract, defaultAccount } = await callContract();
      const bidDetails= await auctionContract.methods.seeBidDetails().call({from: defaultAccount});
      setAuctionStatus(bidDetails[0]);
      setAuctionName(bidDetails[1]);
   }
   getBidDetails();

   const handleChangeName= (e)=>{
      setNewAuctionName(e.target.value);
   }
   const handleChangePrice= (e)=>{
      setNewAuctionPrice(e.target.value);
   }
   
   const endAuction=async ()=>{
      const { auctionContract, defaultAccount } = await callContract();
      const endAuction = await auctionContract.methods.endAuction().send({from: defaultAccount});
      if (endAuction.status){
         alert("auction ended")
      }else{
         alert("auction is already over or different errors")
      }
   }

   const startAuction= async ()=>{
      const { auctionContract, defaultAccount } = await callContract();
      const startAuction= await auctionContract.methods.startAuction(newAuctionName, newAuctionPrice).send({from: defaultAccount});
      if (startAuction.status){
         alert("New auction is started.")
      }else{
         alert("Auction couldn't be started. There may be another auction which still on.")
      }

   }
   
   return(<>
    <h2>Auction Panel</h2>
    <div>Current Auction: {auctionName}</div>
    <div>Auction Status: {auctionStatus}</div>
    <button onClick={endAuction}>End Auction</button>
    <br></br>
    <h3>Start new auction</h3>
    <label>Auction name</label>
    <input value={newAuctionName} onChange={(e)=> handleChangeName(e)}></input>
    <label>Minimum bid price (wei)</label>
    <input value={newAuctionPrice} onChange={(e)=> handleChangePrice(e)}></input>
    <button onClick={startAuction} >Start New Auction</button>
    
   </>
   )
}

export default Admin;




