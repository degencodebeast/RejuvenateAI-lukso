// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

import {IERC165} from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import {ERC165} from "@openzeppelin/contracts/utils/introspection/ERC165.sol";
import {ERC725YCore} from "@erc725/smart-contracts/contracts/ERC725YCore.sol";
import {ERC725Y} from "@erc725/smart-contracts/contracts/ERC725Y.sol";
import {INutritionistProfileData} from "./interfaces/INutritionistProfileData.sol";
import {LSP2Utils} from "@lukso/lsp-smart-contracts/contracts/LSP2ERC725YJSONSchema/LSP2Utils.sol";
import "./CommunityNetworkConstants.sol";

contract UserProfileData is IUserProfileData, ERC725Y {
    //I will probably use maps to get the created mealPlans, fitnessPlans etc that this user has created

    address public user; // Universal profile
    uint public timestamp;
    bytes32 userDetailsKey;

    /**
     * @notice Sets the contract variables
     * @param _owner The owner address
     * @param _user address of the user who is linked to the social network profile data
     */
    constructor(
        address _owner,
        address _user,
        string memory _userData,
        UserSubscriptionStatus _subStatus,
        uint256 _subDeadline
    ) ERC725Y(_owner) {
        user = _user;
        timestamp = block.timestamp;

        userDetailsKey = LSP2Utils.generateSingletonKey("userDetails");

        User memory userDetails = User(_userData, _subStatus, _subDeadline);
        bytes memory encodedStruct = abi.encode(userDetails);

        setData(userDetailsKey, encodedStruct);
    }

    enum UserSubscriptionStatus {
        NotActive,
        Active,
        Expired
    }

    struct User {
        string userPersonalData; //needs to be encrypted before storing
        UserSubscriptionStatus subStatus;
        uint256 subDeadline;
    }

    // modifier deadlinePassed() {
    //     bytes memory _userData = getData(userDetailsKey);
    //     uint256 deadline = _decodeStruct(_userData).subDeadline;
    //     if (block.timestamp < deadline) {
    //         revert InvalidDeadline();
    //     }
    //     _;
    // }

    function renewSubscription() external onlyOwner {
        bytes memory _userData = getData(userDetailsKey);
        User memory userStruct = _decodeStruct(_userData);
        userStruct.subStatus = UserSubscriptionStatus.Active;
        setData(userDetailsKey, abi.encode(userStruct));
    }

    function revokeUser() external onlyOwner {
        bytes memory _userData = getData(userDetailsKey);
        User memory userStruct = _decodeStruct(_userData);
        userStruct.subStatus = UserSubscriptionStatus.Expired;
        userStruct.subDeadline = 0;
        setData(userDetailsKey, abi.encode(userStruct));
    }

    function _decodeStruct(
        bytes memory data
    ) internal view returns (User memory) {
        User memory decodedDataStruct = abi.decode(encodedData, (User));
        return decodedDataStruct;
    }

    /**
     * @inheritdoc ERC165
     */
    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(IERC165, ERC725YCore) returns (bool) {
        return
            interfaceId == _INTERFACEID_USER_PROFILE_DATA ||
            super.supportsInterface(interfaceId);
    }
}
