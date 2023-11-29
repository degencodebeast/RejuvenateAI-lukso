const { ethers } = require("hardhat");
import { LSPFactory } from "@lukso/lsp-factory.js";
import { deployCommunityNetworkWithLinkedLibraries }  from "../util/deploy";

const lspFactory = new LSPFactory('https://rpc.testnet.lukso.network/', {
    deployKey: process.env.PRIVATE_KEY as string,
    chainId: 4201, // LUKSO Testnet
});


const MAX_ACCOUNTS = 2;

const deployTreasury = async () => {
    const TreasuryFactory = await ethers.getContractFactory("Treasury");
    console.log("Start deploying Treasury");
    const deployedTreasury = await TreasuryFactory.deploy();
    await deployedTreasury.deployed();
    console.log("Successfully deployed deployedTreasury: ", deployedTreasury.address);
    return deployedTreasury.address;
}

async function main() {
    const accounts = await ethers.getSigners();

    const treasuryAddr = await deployTreasury();
    const constructorParam = treasuryAddr;
    const { communityNetwork, libraries } = await deployCommunityNetworkWithLinkedLibraries(constructorParam);
  
    // await communityNetwork.deployed();
    // await libraries.nutritionistProfileDataFactory.deployed();
    // await libraries.userProfileDataFactory.deployed();

    for(let i=0;i<MAX_ACCOUNTS;i++){
        const universalProfile = await lspFactory.UniversalProfile.deploy({ controllerAddresses: [accounts[i].address] });
        console.log(`Account ${accounts[i].address} - UniversalProfile ${universalProfile.LSP0ERC725Account.address}`);
    }

    console.log("userProfileDataFactory deployed to:", libraries.userProfileDataFactory.address);
    console.log("nutritionistProfileDataFactory deployed to:", libraries.nutritionistProfileDataFactory.address);
    console.log("CommunityNetwork deployed to:", communityNetwork.address);
}

main().catch((error) => {
    console.error(error);
    // eslint-disable-next-line no-undef
    process.exitCode = 1;
})