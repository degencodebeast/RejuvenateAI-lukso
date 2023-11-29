// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

//import "@openzeppelin/contracts/utils/Checkpoints.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import {IUserNFT} from "./interfaces/IUserNFT.sol";
import {INutritionistNFT} from "./interfaces/INutritionistNFT.sol";
import {OwnableUnset} from "@erc725/smart-contracts/contracts/custom/OwnableUnset.sol";
import {_INTERFACEID_ERC725Y, _INTERFACEID_ERC725X} from "@erc725/smart-contracts/contracts/constants.sol";
import {ERC725YCore} from "@erc725/smart-contracts/contracts/ERC725YCore.sol";
import {ERC725Y} from "@erc725/smart-contracts/contracts/ERC725Y.sol";
import {ICommunityNetwork} from "./interfaces/ICommunityNetwork.sol";
import {UserProfileDataFactory} from "./factories/UserProfileDataFactory.sol";
import {IUserProfileData} from "./interfaces/IUserProfileData.sol";
import {NutritionistProfileDataFactory} from "./factories/NutritionistProfileDataFactory.sol";
import {INutritionistProfileData} from "./interfaces/INutritionistProfileData.sol";
import {IERC165} from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import {ERC165} from "@openzeppelin/contracts/utils/introspection/ERC165.sol";
import {IERC725Y} from "@erc725/smart-contracts/contracts/interfaces/IERC725Y.sol";

import "./CommunityNetworkConstants.sol";

contract CommunityNetwork is ERC165, ICommunityNetwork, Ownable {
    using Counters for Counters.Counter;
    //bytes4 constant _INTERFACEID_COMMUNITY_NETWORK = type(ICommunityNetwork).interfaceId;
    Counters.Counter private _applicantIndexCounter;

    INutritionistNFT public nutritionistNFT;

    IUserNFT public userNFT;

    uint256 public tokenIdCounter = 1;

    uint256 public nutritionistTokenIdCounter = 1;

    mapping(address => uint256) public applicantToIndex;

    uint256 public constant userApplicationFee = 0.01 ether;

    uint256 public constant nutritionistApplicationFee = 0.005 ether;

    uint256 public subscriptionDuration = 2592000;

    address public immutable treasury;

    address[] public allUserProfiles;

    address[] public allUsersProfileData;

    address[] public allNutritionistsProfiles;

    address[] public allNutritionistsProfileData;

    address[] public allNutritionistsApplicants;

    mapping(address => bool) isMember;

    mapping(address => bool) isNutritionist;

    mapping(address => address) public registeredUsers; // mapping from universal profile to user profile data
    uint public registeredUserCount = 0; // incremented with each registration

    mapping(address => address) public registeredNutritionists; // mapping from universal profile to nutritionist profile data
    uint public registeredNutritionistCount = 0; // incremented with each registration

    mapping(address => address) public userProfiles;

    mapping(address => address) public nutritionistProfiles;

    mapping(address => NutritionistApplicationStatus)
        public nutritionistApplicationStatus;

    mapping(address => NutritionistApplication) public nutritionistApplications;

    enum NutritionistApplicationStatus {
        NotApplied,
        Pending,
        Accepted,
        Rejected,
        Canceled
    }

    enum UserSubscriptionStatus {
        NotActive,
        Active,
        Expired
    }

    struct NutritionistApplication {
        string dataURI;
        address nutritionistAddress;
        NutritionistApplicationStatus applicationStatus;
    }

    NutritionistApplication[] public allNutritionistsApplications;

    struct MealPlans {
        string mealName;
        string mealDescription;
        address creator;
    }

    MealPlans[] public allMealPlans;

    struct Community {
        string name;
        string description;
        address[] users;
    }

    Community[] public allCommunities;

    struct FitnessPlans {
        string name;
        string fitnessDescription;
        address creator;
    }

    FitnessPlans[] public allFitnessPlans;

    struct ConsultationServices {
        address consultant;
        string consultationDescription;
    }

    struct User {
        //address userAddress;
        string userPersonalData; //needs to be encrypted before storing
        UserSubscriptionStatus subStatus;
        uint256 subDeadline;
    }

    struct Nutritionist {
        string nutritionistPersonalData; //needs to be encrypted before storing
        MealPlans[] nutritionistMealplans;
        address nutritionistAddress;
        FitnessPlans[] fitnessPlans;
        ConsultationServices consultationServices;
        Articles[] nutritionistArticles;
    }

    address[] public allNutritionists;

    struct Articles {
        string title;
        address author;
        string authorName;
        string content;
    }

    Articles[] public allArticles;

    constructor(address _treasury) {
        treasury = _treasury;
    }

    /// @notice Restrict access to trusted `nutritionists`
    modifier onlyNutritionists() {
        if (!isNutritionist[msg.sender]) {
            revert UnauthorizedNutritionist(msg.sender);
        }
        _;
    }

    /// @notice Restrict access to trusted `members`
    modifier onlyMembers() {
        if (isMember[msg.sender]) {
            revert UnauthorizedMember(msg.sender);
        }
        _;
    }

    /**
     * @notice Validates that the given address is a registered user
     * @param _user the user address to be checked
     */
    modifier onlyRegisteredUser(address _user) {
        require(
            registeredUsers[_user] != address(0),
            "User address is not registered"
        );
        _;
    }

    modifier applicantExists(address _applicant) {
        NutritionistApplicationStatus applicationStatus = nutritionistApplicationStatus[
                _applicant
            ];

        if (applicationStatus != NutritionistApplicationStatus.Pending) {
            revert InvalidApplicant();
        }
        _;
    }

    modifier deadlinePassed(address _member) {
        address userProfileData = registeredUsers[_member];
        bytes memory _userData = IUserProfileData(userProfileData).getData(
            IUserProfileData(userProfileData).getUserDetailsKey()
        );
        uint256 deadline = _decodeUserStruct(_userData).subDeadline;
        if (block.timestamp < deadline) {
            revert InvalidDeadline();
        }
        _;
    }

    function _decodeUserStruct(
        bytes memory data
    ) internal pure returns (User memory) {
        User memory decodedDataStruct = abi.decode(data, (User));
        return decodedDataStruct;
    }

    // function createCommunity() public {}

    // function joinCommunity(string memory _communityName) public {}

    function setNFTs(
        address _userNFT,
        address _nutritionistNFT
    ) public onlyOwner {
        userNFT = IUserNFT(_userNFT);
        nutritionistNFT = INutritionistNFT(_nutritionistNFT);
    }

    /**
     * @inheritdoc ICommunityNetwork
     * @dev Creates a new instance of the CommunityNetworkProfileData contract and links it to the sender address.
     * Fails if the sender address is not a universal profile or if the sender address is already registered.
     */
    function register(
        string memory _userData
    ) external payable returns (address) {
        if (registeredUsers[msg.sender] != address(0)) {
            revert AlreadyAMember();
        }

        if (msg.sender.code.length < 0) {
            revert NotAContract(
                "Only smart contract based accounts are supported"
            );
        }

        if (
            !IERC165(msg.sender).supportsInterface(_INTERFACEID_ERC725Y) &&
            !IERC165(msg.sender).supportsInterface(_INTERFACEID_ERC725X)
        ) {
            revert NotAUniversalProfile();
        }

        if (isMember[msg.sender]) {
            revert AlreadyAMember();
        }

        if (msg.value < userApplicationFee) {
            revert InsufficientPayment();
        }

        //uint256 index = _userIndexCounter.current();
        isMember[msg.sender] = true;

        ++registeredUserCount;
        registeredUsers[msg.sender] = UserProfileDataFactory
            .createUserProfileData(
                address(this),
                msg.sender,
                _userData,
                uint8(UserSubscriptionStatus.Active),
                block.timestamp + subscriptionDuration
            );

        //userToIndex[msg.sender] = index;
        allUsersProfileData.push(registeredUsers[msg.sender]);
        allUserProfiles.push(msg.sender);

        //mint userNft for the user
        userNFT.mint(msg.sender, bytes32(tokenIdCounter), true, "mint token");
        tokenIdCounter++;
        payable(treasury).transfer(msg.value);

        // Emit event
        emit NewSignUp(
            msg.sender,
            registeredUsers[msg.sender],
            registeredUserCount,
            block.timestamp
        );

        return registeredUsers[msg.sender];
    }

    //should be called by automation
    function revokeUser(address _member) public deadlinePassed(_member) {
        // This function can only be called by the owner after the deadline has passed

        if (!isMember[_member]) {
            revert UnauthorizedMember(_member);
        }

        IUserProfileData(registeredUsers[_member]).revokeUser();

        bytes32[] memory userTokenIdArr = userNFT.tokenIdsOf(
            userProfiles[_member]
        );
        bytes32 userTokenId = userTokenIdArr[0];
        userNFT.burn(userTokenId, "");
    }

    /// @notice Function used to apply to community
    function applyForNutritionistRole(
        string calldata dataURI
    ) external payable {
        if (msg.sender.code.length < 0) {
            revert NotAContract(
                "Only smart contract based accounts are supported"
            );
        }
        if (
            !IERC165(msg.sender).supportsInterface(_INTERFACEID_ERC725Y) &&
            !IERC165(msg.sender).supportsInterface(_INTERFACEID_ERC725X)
        ) {
            revert NotAUniversalProfile();
        }
        // Check that sender isn't a nutritionist already
        if (isNutritionist[msg.sender]) {
            revert AlreadyANutrionist();
        }

        uint256 index = _applicantIndexCounter.current();
        NutritionistApplicationStatus applicationStatus = nutritionistApplicationStatus[
                msg.sender
            ];

        if (
            applicationStatus == NutritionistApplicationStatus.Pending ||
            applicationStatus == NutritionistApplicationStatus.Accepted
        ) {
            revert UnauthorizedApplication(
                "Community: already applied/pending"
            );
        }

        if (msg.value < nutritionistApplicationFee) {
            revert InsufficientPayment();
        }

        applicationStatus = NutritionistApplicationStatus.Pending;
        NutritionistApplication memory application = NutritionistApplication(
            dataURI,
            msg.sender,
            applicationStatus
        );
        applicantToIndex[msg.sender] = index;
        nutritionistApplicationStatus[msg.sender] = applicationStatus;
        nutritionistApplications[msg.sender] = application;
        allNutritionistsApplicants.push(msg.sender);
        allNutritionistsApplications.push(application);

        payable(treasury).transfer(msg.value);

        // Emit event
        emit NewApplication(msg.sender, dataURI);
    }

    function cancelNutritionistApplication()
        external
        onlyNutritionists
        applicantExists(msg.sender)
    {
        if (msg.sender.code.length < 0) {
            revert NotAContract(
                "Only smart contract based accounts are supported"
            );
        }

        if (
            !IERC165(msg.sender).supportsInterface(_INTERFACEID_ERC725Y) &&
            !IERC165(msg.sender).supportsInterface(_INTERFACEID_ERC725X)
        ) {
            revert NotAUniversalProfile();
        }
        // Check that sender isn't a nutritionist already
        if (isNutritionist[msg.sender]) {
            revert AlreadyANutrionist();
        }

        NutritionistApplicationStatus applicationStatus = nutritionistApplicationStatus[
                msg.sender
            ];

        uint256 applicantIndex = _getApplicantIndex(msg.sender);
        delete allNutritionistsApplicants[applicantIndex];
        delete nutritionistApplications[msg.sender];

        applicationStatus = NutritionistApplicationStatus.Canceled;
        nutritionistApplicationStatus[msg.sender] = applicationStatus;
    }

    /// @notice Function for community members to approve acceptance of new member to community
    function approveNutritionistRole(
        address applicant
    ) external onlyOwner applicantExists(applicant) returns (address) {
        // Check that sender isn't a nutritionist already
        if (isNutritionist[applicant]) {
            revert AlreadyANutrionist();
        }

        NutritionistApplicationStatus applicationStatus = nutritionistApplicationStatus[
                applicant
            ];

        applicationStatus = NutritionistApplicationStatus.Accepted;
        nutritionistApplicationStatus[applicant] = applicationStatus;

        isNutritionist[applicant] = true;
        NutritionistApplication
            memory _nutritionistApplication = nutritionistApplications[
                applicant
            ];

        ++registeredNutritionistCount;
        registeredNutritionists[msg.sender] = NutritionistProfileDataFactory
            .createNutritionistProfileData(
                address(this),
                applicant,
                _nutritionistApplication.dataURI
            );

        allNutritionistsProfileData.push(registeredNutritionists[applicant]);
        allNutritionistsProfiles.push(applicant);
        //mint userNft for the nutritionist
        nutritionistNFT.mint(
            msg.sender,
            bytes32(nutritionistTokenIdCounter),
            true,
            "mint token"
        );
        nutritionistTokenIdCounter++;

        // Emit event
        emit ApplicationApproved(applicant);

        return registeredNutritionists[msg.sender];
    }

    function _getApplicantIndex(
        address _applicant
    ) internal view applicantExists(_applicant) returns (uint256 _index) {
        _index = applicantToIndex[_applicant];
    }

    function rejectNutritionistRole(
        address applicant
    ) external onlyOwner applicantExists(applicant) {
        // Check that sender isn't a nutritionist already
        if (isNutritionist[applicant]) {
            revert AlreadyANutrionist();
        }

        NutritionistApplicationStatus applicationStatus = nutritionistApplicationStatus[
                applicant
            ];

        applicationStatus = NutritionistApplicationStatus.Rejected;
        nutritionistApplicationStatus[applicant] = applicationStatus;
    }

    function renewSubscription()
        external
        onlyMembers
        deadlinePassed(msg.sender)
    {
        IUserProfileData(msg.sender).renewSubscription();
    }

    function getAllMembers() external view returns (address[] memory _users) {
        _users = allUserProfiles;
    }

    function getAllNutritionists()
        external
        view
        returns (address[] memory _nutritionists)
    {
        _nutritionists = allNutritionistsProfiles;
    }

    function createMealPlan(
        string memory _mealName,
        string memory mealPlanDesc
    ) external onlyNutritionists {
        INutritionistProfileData(msg.sender).createMealPlan(
            _mealName,
            mealPlanDesc
        );
    }

    function createFitnessPlan(
        string memory _fitnessName,
        string memory fitnessDesc
    ) external onlyNutritionists {
        INutritionistProfileData(msg.sender).createFitnessPlan(
            _fitnessName,
            fitnessDesc
        );
    }

    function createConsultation(
        string memory _consultationDesc
    ) external onlyNutritionists {
        INutritionistProfileData(msg.sender).createConsultation(
            _consultationDesc
        );
    }

    function publishArticle(
        string memory _title,
        string memory _authorName,
        string memory _content
    ) external onlyNutritionists {
        INutritionistProfileData(msg.sender).publishArticle(
            _title,
            _authorName,
            _content
        );
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC165) returns (bool) {
        return
            interfaceId == _INTERFACEID_COMMUNITY_NETWORK ||
            super.supportsInterface(interfaceId);
    }
}
