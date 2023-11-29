
import { Contract, ContractInterface, ethers } from "ethers";
//import { IERC1155Upgradeable__factory } from "../typechain-types/factories/IERC1155Upgradeable__factory";
import { ICommunityNetwork__factory, IERC165__factory, IUserProfileData__factory, INutritionistProfileData__factory} from "../typechain-types";
const ICommunityNetworkInterface = ICommunityNetwork__factory.createInterface();
const IERC165Interface = IERC165__factory.createInterface();
const IUserProfileDataInterface = IUserProfileData__factory.createInterface()
const INutritionistProfileDataInterface = INutritionistProfileData__factory.createInterface()

function main() {
   //getInterfaceID(INutritionistProfileDataInterface);
}

//     const IERC165UpgradeableInterface = IERC165Upgradeable__factory.createInterface();
//     const IERC1155UpgradeableInterface = IERC1155Upgradeable__factory.createInterface();
//     const IERC165InterfaceID = getInterfaceID(IERC165UpgradeableInterface)

//     // interface ID does not include base contract(s) functions.
//     const IERC11InterfaceID = getInterfaceID(IERC1155UpgradeableInterface).xor(IERC165InterfaceID);
//     assert(await contract.supportsInterface(IERC11InterfaceID._hex), "Doesn't support IERC1155Upgradeable");

export function getInterfaceID(contractInterface: ethers.utils.Interface) {
  let interfaceID: ethers.BigNumber = ethers.constants.Zero;
  const functions: string[] = Object.keys(contractInterface.functions);
  for (let i=0; i< functions.length; i++) {
      interfaceID = interfaceID.xor(contractInterface.getSighash(functions[i]));
  }

  console.log(interfaceID.toHexString())
  return interfaceID;
}


main();