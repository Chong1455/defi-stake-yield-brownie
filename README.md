# defi-stake-yield-brownie
![Image](https://github.com/Chong1455/vue-portfolio/blob/master/src/assets/project11.jpg)

# Summary
A full stack Decentralized Finance (DeFi) staking application built with Solidity and Python. It allows you to:
* `stakeTokens`: Adding any approved token from your contract to yield farming.
* `unStakeTokens`: Remove your tokens from the contract
* `getUserTotalValue`: Calculate the total value that users have provided based on Chainlink Price Feeds.
* `issueTokens`: Give tokens as a reward to the users staking on the platform.

# Prerequisites
Please install or have installed the following:
* nodejs and npm
* python

# Installation
1. Install Brownie, if you haven't already. Here is a simple way to install brownie.
```
pip install --user pipx
pipx ensurepath
# restart your terminal
pipx install eth-brownie
```
2. Clone this repo
```
git clone https://github.com/Chong1455/defi-stake-yield-brownie
cd defi-stake-yield-brownie
```
3. Install ganache-cli
```
npm install ganache-cli
```
4. Set your environment variables

Set your WEB3_INFURA_PROJECT_ID, and PRIVATE_KEY environment variables.

You can get a WEB3_INFURA_PROJECT_ID by getting a free trial of Infura. At the moment, it does need to be infura with brownie. You can find your PRIVATE_KEY from your ethereum wallet like metamask.

You'll also need testnet rinkeby or Kovan ETH and LINK. You can get LINK and ETH into your wallet by using the rinkeby faucets.

You'll also want an Etherscan API Key to verify your smart contracts.

You can add your environment variables to the .env file:
```
export WEB3_INFURA_PROJECT_ID=<PROJECT_ID>
export PRIVATE_KEY=<PRIVATE_KEY>
export ETHERSCAN_TOKEN=<YOUR_TOKEN>
```
# Usage
## Scripts
```
brownie run scripts/deploy.py
```
This will deploy some mock Chainlink contracts for you to interact with.
```
brownie run scripts/deploy.py --network kovan
```
This will do the same thing... but on Kovan.
## Front End
```
cd front_end
yarn install
yarn start
```
and you will be able to interact with the UI
## Testing
```
brownie test
```
