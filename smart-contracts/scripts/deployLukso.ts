// Hardhat
import { ethers } from "hardhat";
import { deployCommunityNetworkWithLinkedLibraries }  from "../util/deploy";

const treasuryAddr = "";
async function main() {

    const constructorParam = treasuryAddr;

    const { communityNetwork } = await deployCommunityNetworkWithLinkedLibraries(
        constructorParam
    );
    await communityNetwork.deployed();

    console.log("CommunityNetwork deployed to:", communityNetwork.address);
}

main().catch((error) => {
    console.error(error);
    // eslint-disable-next-line no-undef
    process.exitCode = 1;
});
