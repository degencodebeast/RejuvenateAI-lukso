// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.9;

// third party
import {IERC165} from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import {IERC725Y} from "@erc725/smart-contracts/contracts/interfaces/IERC725Y.sol";

interface IUserProfileData is IERC165, IERC725Y {
        /**
     * @notice Returns the linked user profile of the profile data
     */
    function user() external view returns (address);

    /**
     * @notice Returns the timestamp of the post
     */
    function timestamp() external view returns (uint);

    function userDetailsKey() external view returns(bytes32);

    function renewSubscription() external;

    function revokeUser() external;
}