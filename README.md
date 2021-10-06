# OpenAuction

## What is this project for?

In this project it is aimed to create an open auction without any time limit. The person who deploys the contract will be the contract owner. And it has the right to start and stop an auction at any time. 

The contract simply ranks each new bid and always retains only the highest. When the owner of the contract calls the 'endAuction' function to end the auction, the address with the highest bid wins.

## Install necessary packages

`npm install`

## In order to start decentralized auction application 

`npm run start`

## Hardhat Commands

`npx hardhat help`
`npx hardhat accounts`
`npx hardhat compile`
`npx hardhat clean`
`npx hardhat node`


## Compile contract

`hardhat compile`

## Run Tests

`npx hardhat test`


## Deployment Script

`node scripts/deploy.js`

** Steps need to do: **
1. Firstly compile the contract (hardhat compile) and get artifacts directory. We will need ABI(Application Binary Interface) file inside of it.
2. In components to access the contract we need to use ABI as a parameter of calling contract function.
