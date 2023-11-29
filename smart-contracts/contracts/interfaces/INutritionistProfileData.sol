// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.4;

// third party
import {IERC165} from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import {IERC725Y} from "@erc725/smart-contracts/contracts/interfaces/IERC725Y.sol";

interface INutritionistProfileData is IERC165, IERC725Y {
    // /**
    //  * @notice Returns the linked user profile of the profile data
    //  */
    // function user() external view returns (address);

    // /**
    //  * @notice Returns the timestamp of the post
    //  */
    // function timestamp() external view returns (uint);

    // function nutritionistPersonalDataKey() external view returns (bytes32);

    // function mealPlansArrayKey() external view returns (bytes32);

    // function fitnessPlansArrayKey() external view returns (bytes32);

    // function consultationsArrayKey() external view returns (bytes32);

    // function articlesArrayKey() external view returns (bytes32);

    function createMealPlan(
        string memory _mealName,
        string memory mealPlanDesc
    ) external;

    // function getMealPlan(uint256 mealPlanIndex) external;

    function createFitnessPlan(
        string memory _fitnessName,
        string memory fitnessDesc
    ) external;

    function getNumberOfFitnessPlans() external view returns(uint256);

    // function getFitnessPlan(uint256 fitnessPlanIndex) external;

    function createConsultation(string memory _consultationDesc) external;

    function getNumberOfConsultations() external view returns(uint256);

    function getNumberOfMealPlans() external view returns (uint256);
    
    // function getConsultation(uint256 consultationIndex) external;

    function publishArticle(
        string memory _title,
        string memory _authorName,
        string memory _content
    ) external;

    function getNumberOfArticles() external view returns (uint256);

    // function getArticle(uint256 articleIndex) external;
}
