# OpenAuction

## What is this project for?

In this project it is aimed to create an open auction without any time limit. The person who deploys the contract will be the contract owner. And it has the right to start and stop an auction at any time. 

The contract simply ranks each new bid and always retains only the highest. When the owner of the contract calls the 'endAuction' function to end the auction, the address with the highest bid wins.

## Hardhat Commands

`npx hardhat help`
`npx hardhat accounts`
`npx hardhat compile`
`npx hardhat clean`
`npx hardhat node`

## Install necessary packages

`npm install`

## Compile contract

`hardhat compile`

## Run Tests

`npx hardhat test`

## To run decentralized application 

`npm start`

## Deployment Script

`node scripts/deploy.js`
