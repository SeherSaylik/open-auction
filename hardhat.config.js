require("@nomiclabs/hardhat-waffle");

const ALCHEMY_API_KEY = "VF51FI3Duv3wY2OLO8_RuTIvxoIsNPMh";
const RINKEBY_PRIVATE_KEY = "1e953f2feee97923de0badccf7c514bc7b570d4bc90732789328a0c7ddb622f9";

module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [`0x${RINKEBY_PRIVATE_KEY}`],
    },
  },
};