import { ethers } from 'hardhat';
import { Wallet, getDefaultProvider } from "ethers";
import * as dotenv from 'dotenv';
import { abi as UP_ABI } from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import { constants } from 'buffer';
import { UniversalProfile__factory } from '@lukso/lsp-factory.js';

// load env vars
dotenv.config();

// Update those values in the .env file
const { UP_ADDR, PRIVATE_KEY } = process.env;

async function main() {

    // // setup provider
    // const provider = new ethers.providers.JsonRpcProvider('https://rpc.testnet.lukso.network');
    // //setup signer (the browser extension controller)
    // const signer = new ethers.Wallet(PRIVATE_KEY as string, provider);
    // let UP = new ethers.Contract(UP_ADDR as string, UP_ABI, provider);

    const provider = getDefaultProvider('https://rpc.testnet.lukso.network');
    const wallet = new Wallet(PRIVATE_KEY as string);
    const signer = wallet.connect(provider);
    const UpFactory = new UniversalProfile__factory(signer);
    let UP = UpFactory.attach(UP_ADDR as string);

    console.log('🔑 EOA: ', signer.address);
    console.log('🆙 Universal Profile: ', UP.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
