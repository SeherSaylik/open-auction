import React from 'react';
import auctionABI from './artifacts/contracts/OpenAuction.sol/OpenAuction.json';
import Web3 from 'web3';

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:3000"));
const ffunc= async () =>{
    const auctionContractABI= auctionABI.abi;
    const auctionAddress= '0xF31B27AB732c9799Ec9a86c57d893c8aaBEEbc64';
    const auctionContract = await new web3.eth.Contract(auctionContractABI, auctionAddress)
    console.log(auctionContract);
}
ffunc();

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
function App(){
    return(
        <div>Hello</div>
    )
}

export default App;