//const { ethers } = require("hardhat");
import { ethers } from "hardhat";

const deployUserProfileDataFactory = async () => {
    const UserProfileDataFactory = await ethers.getContractFactory("UserProfileDataFactory");
    console.log("Start deploying UserProfileDataFactory");
    const deployedUserProfileDataFactory = await UserProfileDataFactory.deploy();
    await deployedUserProfileDataFactory.deployed();
    console.log("Successfully deployed UserProfileDataFactory: ", deployedUserProfileDataFactory.address);
    return deployedUserProfileDataFactory;
};

const deployUserProfileData = async (owner: any, user: any, _userData: any, _subStatus: any, _subDeadline: any) => {
    const UserProfileData = await ethers.getContractFactory("UserProfileData");
    return await UserProfileData.deploy(owner, user, _userData, _subStatus, _subDeadline);
};

const deployNutritionistProfileDataFactory = async () => {
    const NutritionistProfileDataFactory = await ethers.getContractFactory("NutritionistProfileDataFactory");
    console.log("Start deploying NutritionistProfileDataFactory");
    const deployedNutritionistProfileDataFactory = await NutritionistProfileDataFactory.deploy();
    await deployedNutritionistProfileDataFactory.deployed();
    console.log("Successfully deployed NutritionistProfileDataFactory: ", deployedNutritionistProfileDataFactory.address);
    return deployedNutritionistProfileDataFactory;
};

const deployNutritionistProfileData = async (owner: any, user: any, _nutritionistData: any) => {
    const NutritionistProfileData = await ethers.getContractFactory("NutritionistProfileData");
    return await NutritionistProfileData.deploy(owner, user, _nutritionistData);
};

const deployCommunityNetwork = async (constructorParam: any, deployedUserProfileDataFactory: any, deployedNutritionistProfileDataFactory: any) => {
    const CommunityNetwork = await ethers.getContractFactory("CommunityNetwork", {
        libraries: {
            UserProfileDataFactory: deployedUserProfileDataFactory.address,
            NutritionistProfileDataFactory: deployedNutritionistProfileDataFactory.address
        }
    });

    console.log("Start deploying CommunityNetwork");
    const deployedCommunityNetwork = await CommunityNetwork.deploy(constructorParam);
    await deployedCommunityNetwork.deployed();
    console.log("Successfully deployed CommunityNetwork: ", deployedCommunityNetwork.address);
    return deployedCommunityNetwork;
};

const deployCommunityNetworkWithLinkedLibraries = async (constructorParam: any) => {
    const userProfileDataFactory = await deployUserProfileDataFactory();
    const nutritionistProfileDataFactory = await deployNutritionistProfileDataFactory();
    const communityNetwork = await deployCommunityNetwork(constructorParam, userProfileDataFactory, nutritionistProfileDataFactory);

    return {
        communityNetwork,
        libraries: {
            userProfileDataFactory,
            nutritionistProfileDataFactory,
        }
    };
};

export {
    deployUserProfileData,
    deployUserProfileDataFactory,
    deployNutritionistProfileData,
    deployNutritionistProfileDataFactory,
    deployCommunityNetwork,
    deployCommunityNetworkWithLinkedLibraries
};