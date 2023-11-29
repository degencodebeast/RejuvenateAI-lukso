import { Web3Storage } from 'web3.storage';
import fs, {ReadStream} from 'fs';

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


const _apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjY4NGY3MzJhLWFmMzEtNDRhNi05ZGZjLTkzNGY2ZjkwZjA4YiIsIm9yZ0lkIjoiMzY2MjEzIiwidXNlcklkIjoiMzc2MzcwIiwidHlwZUlkIjoiODQ1NDllYWYtOTgzZC00NGU5LWJmOWQtYmRmMTMzMzJkN2I3IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MDEyMTc0MjksImV4cCI6NDg1Njk3NzQyOX0.9eoubuYnF7aw4cMjxeftv0DoMZTKzk0BHT-dAlrL7V0"


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