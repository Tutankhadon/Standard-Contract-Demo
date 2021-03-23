const {l2ethers:ethers} = require('hardhat')

async function main() {

  const [deployer] = await ethers.getSigners();

  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );

  const CounterContract = await ethers.getContractFactory("Counter");
  const counterContract = await CounterContract.deploy();

  console.log("Counter Contract address:", counterContract.address);
}

main()
.then(() => process.exit(0))
.catch(error => {
  console.error(error);
  process.exit(1);
});