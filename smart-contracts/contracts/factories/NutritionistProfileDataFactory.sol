// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.4;

import {NutritionistProfileData} from "../NutritionistProfileData.sol";

library NutritionistProfileDataFactory {

    /**
     * @notice Creates a new social network profile data contract instance
     * @param _owner The owner of the CommunityNetwork contract instance
     * @param _nutritionist The nutritionist who is linked to the nutritionist profile data (assignment)
     * @param _nutritionistData The user data of the nutrtionist
     */
    function createNutritionistProfileData(
        address _owner,
        address _nutritionist,
        string memory _nutritionistData
    ) public returns (address) {
        return
            address(
                new NutritionistProfileData(
                    _owner,
                    _nutritionist,
                    _nutritionistData
                )
            );
    }
}
