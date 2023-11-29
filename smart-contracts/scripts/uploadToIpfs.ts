import { Web3Storage } from 'web3.storage';
import fs, {ReadStream} from 'fs';

require("dotenv").config();

const Moralis = require("moralis").default;

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
        "assets": [{url: "https://bafkreihfweuclvhaozl7q6zsjjyrkh262vlbzqyd5m3lijrnjefh6pxy3i.ipfs.dweb.link/"}]
    }
})

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


const _apiKey = process.env.MORALIS_KEY as string;


async function uploadToIpfs() {
    await Moralis.start({
        apiKey: _apiKey,
    });
    const uploadArray = [
        {
            path: "NutritionistNft.json",
            content:  {
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
        },
    ];
    const response = await Moralis.EvmApi.ipfs.uploadFolder({
        abi: uploadArray,
    });
    console.log(response.result)
}
uploadToIpfs();