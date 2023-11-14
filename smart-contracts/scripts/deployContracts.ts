import { Wallet, getDefaultProvider } from "ethers";
//require('dotenv').config()
import { ethers } from "hardhat";
import { NutritionistNFT__factory, UserNFT__factory, Treasury__factory, Community__factory } from "../typechain-types";

//const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
//const wallet = new ethers.Wallet(PRIVATE_KEY, ethers.provider);

const privateKey = process.env.PRIVATE_KEY as string;
const wallet = new Wallet(privateKey);

const auroraRpc = "https://testnet.aurora.dev"

async function main() {
    //await deployCommunityContracts();
  
    await setupNFTs();
}

async function deployTreasury() {
    //console.log("Deploying Treasury....");

    //const provider = getDefaultProvider(rpc)
    //const connectedWallet = wallet.connect(provider);
    //const TreasuryFactory = new Treasury__factory(connectedWallet);

    const TreasuryFactory: Treasury__factory = await ethers.getContractFactory("Treasury");
    const treasury = await TreasuryFactory.deploy();
    await treasury.deployed();
    console.log("---- Treasury Contract was deployed to: ---- ", treasury.address);
    return treasury.address;
}

async function deployUserNFT(_communityAddr: any) {
    //console.log("Deploying UserNFT....");
    const UserNFTFactory: UserNFT__factory = await ethers.getContractFactory("UserNFT");
    const userNFT = await UserNFTFactory.deploy("User NFT", "UST", _communityAddr);
    await userNFT.deployed();
    console.log("---- UserNFT Contract was deployed to: ---- ", userNFT.address);
    return userNFT.address;
}

async function deployNutritionistNFT(_communityAddr: any) {
    //console.log("Deploying NutrionistNFT....");
    const NutritionistNFTFactory: NutritionistNFT__factory = await ethers.getContractFactory("NutritionistNFT");
    const nutritionistNFT = await NutritionistNFTFactory.deploy("Nutritionist NFT", "NUT", _communityAddr);
    await nutritionistNFT.deployed();
    console.log("---- NutritionistNFT Contract was deployed to: ---- ", nutritionistNFT.address);
    return nutritionistNFT.address;
}

async function setupNFTs() {
    let userNFTAddr = "0xCA836dA8ED627C21226e3B59a3a4F1942B2D1Cc2"
    let nutritionistNFTAddr = "0x6e2C11794C29e544AF675e1C0AEcF48Ed299d821"
    let communityAddr = "0x6083A218DF607c21CdD9677eB247286CA73d146C"

    const provider = getDefaultProvider(auroraRpc);
    const connectedWallet = wallet.connect(provider);

    const communityFactory = new Community__factory(connectedWallet);
    const community = communityFactory.attach(communityAddr);

    try {
        console.log("Setting up NFTs for Aurora")
        const tx = await community.setNFTs(userNFTAddr, nutritionistNFTAddr);
        await tx.wait();
        console.log("NFTs setup successful")
    }

    catch (error) {
        console.log(`[source] community.setNFTs ERROR!`);
        console.log(`[source]`, error);

    }
}


async function deployCommunityContracts() {
    console.log("Deploying Contracts for Aurora....");
    let treasuryAddr;
    let communityAddr;
    try {
        console.log("Deploying treasury for Aurora");
        treasuryAddr = await deployTreasury();

        const CommunityFactory: Community__factory = await ethers.getContractFactory("Community"/*, wallet*/);

        console.log("Deploying Community contract for Aurora");
        const community = await CommunityFactory.deploy(treasuryAddr);
        await community.deployed();
        communityAddr = community.address;
        console.log("---- Community Contract for Aurora was deployed to aurora testnet at this address: ---- ", community.address);
    }
    catch (error) {
        console.error("Error deploying Community for Aurora:", error);
        throw error;
    }

    console.log("Deploying UserNFT for Aurora....");
    let userNFT;
    try {
        userNFT = await deployUserNFT(communityAddr);
    }
    catch (error) {
        console.error("Error User NFT for Aurora:", error);
        throw error;
    }

    console.log("Deploying NutritionistNFT for Aurora....");
    let nutritionistNFT;
    try {
        nutritionistNFT = await deployNutritionistNFT(communityAddr);
    }
    catch (error) {
        console.error("Error Nutritionist NFT for Aurora:", error);
        throw error;
    }
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
