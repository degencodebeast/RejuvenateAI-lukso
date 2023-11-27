// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.9;

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
}
