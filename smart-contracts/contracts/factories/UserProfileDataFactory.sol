// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.4;

import {UserProfileData} from "../UserProfileData.sol";

library UserProfileDataFactory {
    
    enum UserSubscriptionStatus {
        NotActive,
        Active,
        Expired
    }

    /**
     * @notice Creates a new social network profile data contract instance
     * @param _owner The owner of the CommunityNetwork contract instance
     * @param _user The user who is linked to the profile data (assignment)
     * @param _userData The user data of the user
     * @param _subStatus The subscription status of the user
     * @param _subDeadline The subscription deadline as to when the user's sub expires
     */
    function createUserProfileData(
        address _owner,
        address _user,
        string memory _userData,
        uint8 _subStatus,
        uint256 _subDeadline
    ) public returns (address) {
        return
            address(
                new UserProfileData(
                    _owner,
                    _user,
                    _userData,
                    _subStatus,
                    _subDeadline
                )
            );
    }
}
