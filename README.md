# Standard Contract Demo

Hello!
This demo is an introduction to the process of developing applications on "Ethereum","Biance Smart Chain", "Optimism Rollup" and "xDai(Sokol)".
Specifically, we'll show you through the process of building, testing, deploying, and interacting with a Solidity smart contract on top of the platform.

## Prerequisite Software
We make use of some external software throughout this tutorial.
Please make sure you've installed the following before continuing:

- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Node.js](https://nodejs.org/en/download/)

## Setting Up
Please clone and enter [this repository](https://github.com/Tutankhadon/Standard-Contract-Demo):

```sh
git clone https://github.com/Tutankhadon/Standard-Contract-Demo.git
cd Standard-Contract-Demo
```

Fill in your "INFURA_ID" and "ACCOUNT_PRIVATE_KEY" in [`Standard-Contract-Demo/hardhat.config.js`](https://github.com/Tutankhadon/Standard-Contract-Demo/blob/main/hardhat.config.js) file

We're using an Ethereum development framework called [Hardhat](https://hardhat.org) to make our lives a lot easier.
Hardhat is well designed and full of useful features.
Go ahead and set up Hardhat by running:
```sh
npm install
```

## The Task
We're going to be deploying an "Counter" contract (written in Solidity) to Optimistic Ethereum.
We've already gone ahead and written that contract for you, which you should be able to locate in [`Standard-Contract-Demo/contracts/Counter.sol`](https://github.com/Tutankhadon/Standard-Contract-Demo/blob/main/contracts/Counter.sol).

We'd recommend running the following command to compile this contract. This will also make sure that Hardhat is installed correctly:

```sh
npm run compile
```

## The Tests
We've also written some very basic tests for you, which you can locate in [`Standard-Contract-Demo/test/counter.ts`](https://github.com/Tutankhadon/Standard-Contract-Demo/blob/main/test/counter.js).
Though tests are pretty straight forward, we'd recommend taking a quick read through the test file.
We're using [Ethers](https://docs.ethers.io/v5/) for the majority of our testing. we've already added the plugin to [`Standard-Contract-Demo/hardhat.config.js`](https://github.com/Tutankhadon/Standard-Contract-Demo/blob/main/hardhat.config.js).

Once you've taken a look at the tests, feel free to verify that everything is working correctly by running the following command:

```sh
npm run test
```

## Deploying your contracts
Once you're ready to share your dApp with other people what you may want to do is deploy to a live network. This way others can access an instance that's not running locally on your system.

To deploy to a remote network such as mainnet or any testnet, you need to add a network entry to your [`Standard-Contract-Demo/hardhat.config.js`](https://github.com/Tutankhadon/Standard-Contract-Demo/blob/main/hardhat.config.js) file. We’ll use "Ropsten" and "Optimism Rollup" for this example.

Network "Ethereum","Biance Smart Chain" and "xDai(Sokol)":
```sh
npx hardhat run scripts/deploy.js --network ropsten
```

Network "Optimism Rollup":
```sh
npx hardhat run scripts/optimism-deploy.js --network optimismRollup
```

## Running dApp
This demo uses [`Vue CLI`](https://cli.vuejs.org/), so most
configuration files are handled by it.

We can run the fronted with:
```sh
cd fronted
npm install
npm run serve
```
and open [http://localhost:8080](http://localhost:8080).

**happy building**
