import { Wallet, getDefaultProvider } from "ethers";
// import Web3 from 'web3';
// const web3 = new Web3('http://localhost:8545');
//let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

//require('dotenv').config()
import { ethers } from "hardhat";
import { putJSONandGetHash } from "../../frontend/src/helpers/prompt";
import { NutritionistNFT__factory, UserNFT__factory } from "../typechain-types";

//const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
//const wallet = new ethers.Wallet(PRIVATE_KEY, ethers.provider);

const privateKey = process.env.PRIVATE_KEY as string;
//const wallet = new Wallet(privateKey);

const userNftMetaData = "0x6f357c6a5a018224e98f509e76e6444d5029c22e4e8804b4dfb40ba328599e031d0b042f697066733a2f2f516d63694a63726765365a736a5638356865315a6e684a343762484b65445531726454764c437566737544323752"
const nutritionistNFTMetaData = "0x6f357c6a45ecf5491ccddb28a25c0f3f2a18bb56be475b680c369b6987adec699b209dcc697066733a2f2f516d5242666b5471557073716f484b4d70687a6a48767848707a474c6b745075436b777865546134766f39773733"
const communityNetworkAddr = "0xb5c93ACAc8d4499293e81Fb07298c29d1DA4a455"

const userNftjson = JSON.stringify({
    "LSP4Metadata": {
        "description": "User NFT for RejuvenateAI",
        "links": [
            {
                "title": "Website",
                "url": "https://rejuvenate-ai-lukso-two.vercel.app/"
            }
        ],
        "icon": [],
        "images": [{}],
        "assets": [{ url: "https://bafkreihfweuclvhaozl7q6zsjjyrkh262vlbzqyd5m3lijrnjefh6pxy3i.ipfs.dweb.link/" }]
    }
})

async function main() {
    //await deployCommunityContracts();

    await setupNFTs();

    //await deployNFTs(communityNetworkAddr);
}



const nutritionistNftjson = JSON.stringify({
    "LSP4Metadata": {
        "description": "Nutritionist NFT for RejuvenateAI",
        "links": [
            {
                "title": "Website",
                "url": "https://rejuvenate-ai-lukso-two.vercel.app/"
            }
        ],
        "icon": [],
        "images": [{}],
        "assets": [{ url: "https://bafkreihfweuclvhaozl7q6zsjjyrkh262vlbzqyd5m3lijrnjefh6pxy3i.ipfs.dweb.link/" }]
    }
})



// function generateJsonMetaData() {

//     const hashFunction = web3.utils.keccak256('keccak256(utf8)').substr(0, 10)

//     const hash = web3.utils.keccak256(Web3.utils.utf8ToHex(nutritionistNftjson))

//     // store the JSON anywhere and encode the URL
//     const url = web3.utils.utf8ToHex('ipfs://QmRBfkTqUpsqoHKMphzjHvxHpzGLktPuCkwxeTa4vo9w73')

//     // final result (to be stored on chain)
//     const JSONURL = hashFunction + hash.substring(2) + url.substring(2)

//     console.log(JSONURL)

// }

async function deployUserNFT(_communityAddr: any) {

    const UserNFTFactory = await ethers.getContractFactory("UserNFT");
    console.log("Start deploying UserNFT");
    const userNFT = await UserNFTFactory.deploy("User NFT", "UST", _communityAddr, userNftMetaData);
    await userNFT.deployed();
    console.log("---- UserNFT Contract was deployed to: ---- ", userNFT.address);
    return userNFT.address;
}

async function deployNutritionistNFT(_communityAddr: any) {
    const NutritionistNFTFactory = await ethers.getContractFactory("NutritionistNFT");
    console.log("Start deploying nutritionistNFT");
    const nutritionistNFT = await NutritionistNFTFactory.deploy("Nutritionist NFT", "NNT", _communityAddr, nutritionistNFTMetaData);
    await nutritionistNFT.deployed();
    console.log("---- nutritionistNFT Contract was deployed to: ---- ", nutritionistNFT.address);
    return nutritionistNFT.address;
}

async function setupNFTs() {
    let userNFTAddr = "0x88cF82a3EfE628B35e5eca8817681f94F5ed15Df"
    let nutritionistNFTAddr = "0x628ff8D815a6e3Eb6Fe84BfeC3c47692729ba3F3"
    let communityAddr = "0xb5c93ACAc8d4499293e81Fb07298c29d1DA4a455"

    try {
        console.log("Setting up NFTs for CommunityNetwork")
        const accounts = await ethers.getSigners();
        const deployer = accounts[0];
        const contract = await ethers.getContractAt('CommunityNetwork', communityAddr, deployer);

        // Call functions on the contract
        const result = await contract.setNFTs(userNFTAddr, nutritionistNFTAddr);
        result.wait();
        console.log('Result:', result);

        console.log("NFTs setup successful")
    }

    catch (error) {
        console.log(`[source] community.setNFTs ERROR!`);
        console.log(`[source]`, error);

    }
}


async function deployNFTs(_communityAddr: any) {


    console.log("Deploying UserNFT for Lukso....");
    let userNFT;
    try {
        userNFT = await deployUserNFT(_communityAddr);
    }
    catch (error) {
        console.error("Error User NFT for Lukso:", error);
        throw error;
    }

    console.log("Deploying NutritionistNFT for Lukso....");
    let nutritionistNFT;
    try {
        nutritionistNFT = await deployNutritionistNFT(_communityAddr);
    }
    catch (error) {
        console.error("Error Nutritionist NFT for Lukso:", error);
        throw error;
    }
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
