import { DeployFunction } from 'hardhat-deploy/types';

const deployCommunityNetwork = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const UserProfileDataFactoryAddress = "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853";
  const NutritionistProfileDataFactoryAddress = "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6";

  //const lsp4Metadata = "0x6f357c6ad575b7fd3a648e998af8851efb8fc396805b73a3f72016df79dfedce79c76a53697066733a2f2f516d6563726e6645464c4d64573642586a4a65316e76794c6450655033435967516258774e6d593850374c666553";
  const treasury = ""
  const deployedLib = await deploy("CommunityNetwork", {
    from: deployer,
    args: [treasury],
    gasPrice: 10000000000, // 10 GWEI
    libraries: {
        UserProfileDataFactory: UserProfileDataFactoryAddress,
        NutritionistProfileDataFactory: NutritionistProfileDataFactoryAddress,
    },
    log: true,
  });

  console.log(deployedLib.address);
};

deployCommunityNetwork.tags = ["CommunityNetwork"];

export default deployCommunityNetwork;