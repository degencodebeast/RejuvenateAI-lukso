// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.4;

interface ICommunityNetwork {
    error AlreadyAMember();
    error AlreadyANutrionist();
    error InsufficientPayment();
    error InvalidApplicant();
    error UnauthorizedApplication(string message);
    error NotAContract(string message);
    error NotAUniversalProfile();
    error UnauthorizedNutritionist(address caller);
    error UnauthorizedMember(address caller);
    error InvalidDeadline();
    error InvalidSubStatus();

    /**
     * @dev Emitted when `user` registered and linked to `socialProfileData`
     * @param user The address of the user who registered
     * @param userProfileData The address of the deployed SocialNetworkProfileData contract address assigned to the `user`
     * @param userNumber The number of the user (incremented with each registration)
     * @param timestamp timestamp of the event
     */
    event NewSignUp(
        address indexed user,
        address indexed userProfileData,
        uint indexed userNumber,
        uint timestamp
    );

    event NewApplication(address applicant, string dataURI);

    event ApplicationApproved(address applicant);

    function register(
        string memory _userData
    ) external payable returns (address);

    function revokeUser(address _member) external;

    function applyForNutritionistRole(string calldata dataURI) external payable;

    function cancelNutritionistApplication() external;

    function approveNutritionistRole(address applicant) external returns (address);

    function rejectNutritionistRole(address applicant) external;

    function renewSubscription() external;

    function getAllMembers() external view returns (address[] memory);

    function getAllNutritionists() external view returns (address[] memory);

    function createMealPlan(
        string memory _mealName,
        string memory mealPlanDesc
    ) external;

    function createFitnessPlan(
        string memory _fitnessName,
        string memory fitnessDesc
    ) external;

    function createConsultation(string memory _consultationDesc) external;

    function publishArticle(
        string memory _title,
        string memory _authorName,
        string memory _content
    ) external;
}
