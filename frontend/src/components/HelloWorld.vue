<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h3>Switch Network(Testnet)</h3>
    <p>
      <button v-on:click="switchBSCTestnet" >
         Biance Smart Chain
      </button>&nbsp;
      <button v-on:click="switchSokol" >
        Sokol(xDai)
      </button>&nbsp;
      <button v-on:click="switchOptimisticRollup" >
        Optimistic Rollup
      </button>&nbsp;
    </p>
    <h3>CounterDemo</h3>
    <p>
      <span style="font-weight: bold" v-if="networkId != ''">[{{ networkMap.get(networkId).name }}]</span>
      Address:{{ address }}
      <button v-on:click="connectWallet" >
        Connect Wallet
      </button>
    </p>
    <p>
      Count:{{ count }}
      <button v-on:click="refresh">Refresh</button>
    </p>
    <p>
      <button v-on:click="plus">Plus 1</button>&nbsp;
      <button v-on:click="minus">Minus 1</button>&nbsp;
      <button v-on:click="reset">Reset to 0</button>&nbsp;
    </p>

    <h3>Response Transaction:</h3>
    <ul>
      <li v-if="response != ''">
        <a
          v-bind:href="networkMap.get(networkId).explorer + 'tx/' + response.hash"
          target="_blank"
          rel="noopener"
          >{{ networkMap.get(networkId).explorer }}tx/{{ response.hash }}</a
        >
      </li>
    </ul>
    <h3>Testnet Info</h3>
    <p>
      <span style="font-weight: bold" v-if="networkId != ''">[{{ networkMap.get(networkId).name }}]</span>
      Contract Address:
      <a
        v-if="networkId!=''"
        v-bind:href="networkMap.get(networkId).explorer + 'address/'+networkMap.get(networkId).contractAddress"
        target="_blank"
        rel="noopener"
        >{{networkMap.get(networkId).contractAddress}}</a
      >
    </p>
  </div>
</template>

<script>
import { ethers } from "ethers";

const myContractAbi = [
  // Query count
  "function query() view returns (int)",

  // Calc
  "function plus(int number)",
  "function minus(int number)",
  "function reset()",
];

export default {
  name: "HelloWorld",
  data() {
    return {
      provider: new ethers.providers.Web3Provider(window.web3.currentProvider),
      balance: 0.0,
      count: "",
      address: "",
      networkId: "",
      networkMap: new Map([
        [1, { name: "Mainnet", contractAddress: "" }],
        [3, { name: "Ropsten", contractAddress: "0xf5a2c6aF5ad71cC37a657531C5e31380Bc22820F", explorer:"https://ropsten.etherscan.io/"}],
        [4, { name: "Rinkeby", contractAddress: "" }],
        [5, { name: "Goerli", contractAddress: "" }],
        [42, { name: "Kovan", contractAddress: "" }],
        [69, { name: "Testnet Optimistic Rollup", contractAddress: "0x03bf0b3e8a10a34bAcdf82aa9f565A6ebe5e2650" ,explorer:"https://kovan-l2-explorer.surge.sh/"}],
        [97, { name: "Testnet BSC", contractAddress: "0xA5d7c3a3770f7d5f757C0183997cE26Fa0f8f8D6" ,explorer:"https://testnet.bscscan.com/"}],
        [77, { name: "Testnet Sokol(xDai)", contractAddress: "0xA5d7c3a3770f7d5f757C0183997cE26Fa0f8f8D6" ,explorer:"https://blockscout.com/poa/sokol/"}],
      ]),
      response: "",
    };
  },
  methods: {
    connectWallet() {
      var that = this;
      ethereum.request({ method: "eth_requestAccounts" }).then(function(address){
          console.log(address);
          that.address = address[0];
      });
    },
    refresh() {
      if (this._checkNetwork() == false) {
        alert("Network Error! Please Click network button to choose or change network to Ropsten.");
        return false;
      }

      var that = this;
      let signer = this.provider.getSigner();
      const myContract = new ethers.Contract(
        that.networkMap.get(that.networkId).contractAddress,
        myContractAbi,
        signer
      );
      myContract.query().then(function (data) {
        that.count = data.toNumber();
        console.log(data.toNumber());
      });
    },
    plus() {
      if (this._checkNetwork() == false) {
        alert("Network Error! Please Click network button to choose or change network to Ropsten.");
        return false;
      }

      var that = this;
      let signer = this.provider.getSigner();
      const myContract = new ethers.Contract(
        that.networkMap.get(that.networkId).contractAddress,
        myContractAbi,
        signer
      );
      myContract.plus(1).then(function (data) {
        console.log(data);
        that.response = data;
        that.refresh();
      });
    },
    minus() {
      if (this._checkNetwork() == false) {
        alert("Network Error! Please Click network button to choose or change network to Ropsten.");
        return false;
      }

      var that = this;
      let signer = this.provider.getSigner();
      const myContract = new ethers.Contract(
        that.networkMap.get(that.networkId).contractAddress,
        myContractAbi,
        signer
      );
      myContract.minus(1).then(function (data) {
        console.log(data);
        that.response = data;
        that.refresh();
      });
    },
    reset() {
      if (this._checkNetwork() == false) {
        alert("Network Error! Please Click network button to choose or change network to Ropsten.");
        return false;
      }

      var that = this;
      let signer = this.provider.getSigner();
      const myContract = new ethers.Contract(
        that.networkMap.get(that.networkId).contractAddress,
        myContractAbi,
        signer
      );
      myContract.reset().then(function (data) {
        console.log(data);
        that.response = data;
        that.refresh();
      });
    },
    switchBSCTestnet(){
      ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: '0x61',
          chainName: "TestNet BSC",
          nativeCurrency: {
            name: 'BNB',
            symbol: 'BNB',
            decimals: 18,
          },
          rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
          blockExplorerUrls: ["https://testnet.bscscan.com/"],
          iconUrls: [],
        }],
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      });
    },
    switchSokol(){
      ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: '0x4D',
          chainName: "Testnet Sokol(xDai)",
          nativeCurrency: {
            name: 'SPOA',
            symbol: 'SPOA',
            decimals: 18,
          },
          rpcUrls: ["https://sokol.poa.network"],
          blockExplorerUrls: ["https://blockscout.com/poa/sokol/"],
          iconUrls: [],
        }],
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      });
    },
    switchOptimisticRollup(){
      ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: '0x45',
          chainName: "Testnet Optimistic Rollup",
          nativeCurrency: {
            name: 'ETH',
            symbol: 'ETH',
            decimals: 18,
          },
          rpcUrls: ["https://kovan.optimism.io"],
          blockExplorerUrls: ["https://kovan-explorer.pixelbank.art/"],
          iconUrls: [],
        }],
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      });
    },
    _checkNetwork(){
      if (this.networkId == 3 || this.networkId == 69 || this.networkId == 97 || this.networkId == 77) {
        return true;
      }
      else{
        return false;
      }
    }
  },
  mounted: function () {

    this.provider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = this.provider.getSigner();

    var that = this;

    ethereum.request({ method: 'net_version' }).then(function(networkId){
      console.log(networkId);
      that.networkId = parseInt(networkId);
      that.refresh();
    });

    ethereum.request({ method: "eth_requestAccounts" }).then(function(address){
        console.log(address);
        that.address = address[0];
    });

    ethereum.on("networkChanged", function (networkId) {
      console.log(networkId);
      that.networkId = parseInt(networkId);
      that.provider = new ethers.providers.Web3Provider(
        window.web3.currentProvider
      );
      that.refresh();
    });

    ethereum.on("accountsChanged", function (accounts) {
      if (accounts.length > 0) {
        that.address = accounts[0];
      } else {
        that.address = "";
      }
      that.refresh();
    });
  },
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
