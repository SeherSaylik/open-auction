import React, {useState, useEffect} from 'react';
import auctionABI from './artifacts/contracts/OpenAuction.sol/OpenAuction.json';
import Web3 from 'web3';
import './App.css';

/* const addScoreToBC = async (uniqueName, score) =>{
    const web3= new Web3(window.web3.currentProvider)
    const auctionContract = new web3.eth.Contract(onboardContractABI, onboardContractAdress)
    const defaultAccount = (await web3.eth.getAccounts())[0]
    const addingResponse= await onboardContract.methods.addPoint(uniqueName,score)
    .send({ from: defaultAccount, type:'0x2' })
    if(addingResponse.status){
      alert("Trainee's score is added to ethereum network")
    }else{
      alert("Transaction is failed")
    }
   }
   */
  const web3= new Web3(window.web3.currentProvider);


function App(){
   const [bid, setBid]= useState({0: "", 1: "", 2: "", 3: "",4: ""});
   const [bidPrice, setBidPrice]= useState(0);
   const [buttonDisable, setButtonDisable]= useState();
    useEffect(() => {
        callContract();
    }, []);

    const callContract= async () =>{
      const auctionContractABI= auctionABI.abi;
      const auctionAddress= '0xF31B27AB732c9799Ec9a86c57d893c8aaBEEbc64';
      const auctionContract = await new web3.eth.Contract(auctionContractABI, auctionAddress)
      console.log(auctionContract);
      const defaultAccount = (await web3.eth.getAccounts())[0]
      const bidDetails= await auctionContract.methods.seeBidDetails().call({from: defaultAccount});
      console.log(bidDetails);
      console.log(bidDetails[0])
      setBid(bidDetails);
      if (bidDetails[0]==="Auction ended."){
        setButtonDisable(true);
      }
     }

     const makeBid = async ()=>{
      const auctionContractABI= auctionABI.abi;
      const auctionAddress= '0xF31B27AB732c9799Ec9a86c57d893c8aaBEEbc64';
      const auctionContract = await new web3.eth.Contract(auctionContractABI, auctionAddress)
      const defaultAccount = (await web3.eth.getAccounts())[0]
      const sendBid = await auctionContract.methods.bid().send({from: defaultAccount, value: bidPrice})
      if (sendBid){
        alert("successful transaction")
      }
     }

     const handleChange = (e) => {
      setBidPrice(e.target.value)
     }

   return(
        <div className="full-page"> {callContract}
          <h1 className="title">Open Auction</h1>
          <div className="auction"> {bid[1]} </div>
          <br></br>
          <div className="status">{bid[0]}</div>
          <br></br>
          <div className="grid-container">
            <div className="item1">Minimum Bid Price: {bid[2]} wei</div>
            <div className="item2">Highest Bid:{bid[4]} wei</div>
            <div className="item3">Highest Bidder Address: {bid[3]}</div>  
          </div>
          <br></br>
          <div className="grid-container">
            <div className="bid-exp">Minimum bid that you can offer should be at least {bid[4]} wei </div> 
            <div>
            <input type="text" className="input" value={bidPrice} onChange={(e) => handleChange(e)} />
            <button className="button" disabled= {buttonDisable} onClick={makeBid}>Make Bid</button>            
            </div>
          </div>
        </div>
    )
}

export default App;