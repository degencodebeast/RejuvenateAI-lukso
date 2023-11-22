import Web3 from "web3";
const web3 = new Web3("https://rpc.testnet.lukso.network/");
require('dotenv').config()

// let account = web3.eth.accounts.create();
// console.log("My private key is: " + account.privateKey);
// console.log("My address is: " + account.address);

// Now we can add this key and address to our .env file

async function getBalance() {
    let balance = await web3.eth.getBalance(process.env.ADDR as string);
    console.log("My balance: " + web3.utils.fromWei(balance, "ether") + " LYXt");
}

getBalance();