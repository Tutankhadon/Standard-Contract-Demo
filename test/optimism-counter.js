const {default:chai,expect} = require('chai')
const {l2ethers:ethers} = require('hardhat')

describe("Counter contract", function () {
    
    let account;

    before(async () => {
      [account] = await ethers.getSigners();
      console.log("Address: %s", account.address);
    });

    let CounterContract;
    beforeEach(async function (){
      CounterContract = await (await ethers.getContractFactory("Counter"))
        .connect(account)
        .deploy();
      await CounterContract.deployed();
    });

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
          expect(await CounterContract.owner()).to.equal(account.address);
        });
    });

    describe("Calculation", function () {
        it("The initialization counter should be 0", async function () {
          expect((await CounterContract.query()).toNumber()).to.equal(0);
        });

        it("0+8=8", async function () {
          await CounterContract.plus(8);
          expect((await CounterContract.query()).toNumber()).to.equal(8);
        });

        it("8-2=6", async function () {
          await CounterContract.plus(8);
          await CounterContract.minus(2);
          expect((await CounterContract.query()).toNumber()).to.equal(6);
        });

        it("8-10=0, Not allowed to have negative numbers", async function () {
          await CounterContract.plus(8);
          await CounterContract.minus(10);
          expect((await CounterContract.query()).toNumber()).to.equal(0);
        });

        it("0+8=8 & Reset to zero", async function () {
          await CounterContract.plus(8);
          await CounterContract.reset();
          expect((await CounterContract.query()).toNumber()).to.equal(0);
        });
    });

    // describe("Minus", function () {

    // });

    // describe("Reset To Zero", function () {

    // });
});