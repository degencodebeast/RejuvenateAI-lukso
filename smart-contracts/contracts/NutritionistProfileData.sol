// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

import {IERC165} from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import {ERC165} from "@openzeppelin/contracts/utils/introspection/ERC165.sol";
import {ERC725YCore} from "@erc725/smart-contracts/contracts/ERC725YCore.sol";
import {ERC725Y} from "@erc725/smart-contracts/contracts/ERC725Y.sol";
import {INutritionistProfileData} from "./interfaces/INutritionistProfileData.sol";
import {LSP2Utils} from "@lukso/lsp-smart-contracts/contracts/LSP2ERC725YJSONSchema/LSP2Utils.sol";
import "./CommunityNetworkConstants.sol";

string constant ARRAY_PREFIX = string("[]");

contract NutritionistProfileData is INutritionistProfileData, ERC725Y {
    //I will probably use maps to get the created mealPlans, fitnessPlans etc that this user has created

    address public user; // Universal profile
    uint public timestamp;
    bytes32 nutritionistPersonalDataKey;
    bytes32 public mealPlansArrayKey;
    bytes32 public fitnessPlansArrayKey;
    bytes32 public consultationsArrayKey;
    bytes public articlesArrayKey;
    NutritionistApplicationStatus public applicationStatus;

    /**
     * @notice Sets the contract variables
     * @param _owner The owner address
     * @param _user address of the user who is linked to the social network profile data
     */
    constructor(
        address _owner,
        address _user,
        string memory _nutritionistData,
        NutritionistApplicationStatus _applicationStatus
    ) ERC725Y(_owner) {
        user = _user;
        timestamp = block.timestamp;
        uint256 count = 0;
        applicationStatus = _applicationStatus;

        // NOTE cannot take back the name
        string memory mealPlansArrayName = string(
            abi.encodePacked("MealPlans", ARRAY_PREFIX)
        );
        // Key used for setting multiple mealPlans data
        mealPlansArrayKey = LSP2Utils.generateArrayKey(mealPlansArrayName);
        //Set the mealPlan array key
        setData(mealPlansArrayKey, abi.encodePacked(count));

        string memory fitnessPlansArrayName = string(
            abi.encodePacked("FitnessPlans", ARRAY_PREFIX)
        );
        // Key used for setting multiple fitnessPlans data
        fitnessPlansArrayKey = LSP2Utils.generateArrayKey(
            fitnessPlansArrayName
        );
        //Set the fitnessPlan array key
        setData(fitnessPlansArrayKey, abi.encodePacked(count));

        string memory consultationsArrayName = string(
            abi.encodePacked("ConsultationServices", ARRAY_PREFIX)
        );
        // Key used for setting multiple consultations data
        consultationsArrayKey = LSP2Utils.generateArrayKey(
            consultationsArrayName
        );
        //Set the consultations array key
        setData(consultationsArrayKey, abi.encodePacked(count));

        string memory articlesArrayName = string(
            abi.encodePacked("Articles", ARRAY_PREFIX)
        );
        // Key used for setting multiple articles data
        articlesArrayKey = LSP2Utils.generateArrayKey(articlesArrayName);
        //Set the articles array key
        setData(articlesArrayKey, abi.encodePacked(count));

        nutritionistPersonalDataKey = LSP2Utils.generateSingletonKey(
            "NutritionistPersonalData"
        );
        setData(nutritionistPersonalDataKey, abi.encode(_nutritionistData));

    }

    enum NutritionistApplicationStatus {
        NotApplied,
        Pending,
        Accepted,
        Rejected,
        Canceled
    }

    struct Articles {
        string title;
        address author;
        string authorName;
        string content;
    }

    struct MealPlans {
        string mealName;
        string mealDescription;
        address creator;
    }

    struct FitnessPlans {
        string name;
        string fitnessDescription;
        address creator;
    }

    struct ConsultationServices {
        address consultant;
        string consultationDescription;
    }

    function createMealPlan(
        string memory _mealName,
        string memory mealPlanDesc
    ) external onlyOwner {
        MealPlans memory mealPlan = MealPlans(_mealName, mealPlanDesc, user);
        bytes memory encodedMealStruct = abi.encode(mealPlan);
        uint256 mealPlanIndex = uint256(bytes32(_getData(mealPlansArrayKey)));
        bytes32 key = LSP2Utils.generateArrayElementKeyAtIndex(
            mealPlansArrayKey,
            mealPlanIndex
        );
        setData(key, encodedMealStruct);
        unchecked {
            setData(mealPlansArrayKey, abi.encodePacked(mealPlanIndex + 1));
        }
    }

    function getNumberOfMealPlans() public view returns (uint256) {
        return uint256(bytes32(getData(mealPlansArrayKey)));
    }

    function getMealPlan(
        uint256 mealPlanIndex
    ) public view returns (MealPlans memory) {
        bytes32 key = LSP2Utils.generateArrayElementKeyAtIndex(
            mealPlansArrayKey,
            mealPlanIndex
        );
        bytes memory encodedData = getData(key);
        MealPlans memory decodedDataStruct = abi.decode(
            encodedData,
            (MealPlans)
        );
        return decodedDataStruct;
    }

    function createFitnessPlan(
        string memory _fitnessName,
        string memory fitnessDesc
    ) external onlyOwner {
        FitnessPlans memory fitnessPlan = FitnessPlans(
            _fitnessName,
            fitnessDesc,
            user
        );
        bytes memory encodedFitnessStruct = abi.encode(fitnessPlan);
        uint256 fitnessPlanIndex = uint256(
            bytes32(_getData(fitnessPlansArrayKey))
        );
        bytes32 key = LSP2Utils.generateArrayElementKeyAtIndex(
            fitnessPlansArrayKey,
            fitnessPlanIndex
        );
        setData(key, encodedFitnessStruct);
        unchecked {
            setData(
                fitnessPlansArrayKey,
                abi.encodePacked(fitnessPlanIndex + 1)
            );
        }
    }

    function getNumberOfFitnessPlans() public view returns (uint256) {
        return uint256(bytes32(getData(fitnessPlansArrayKey)));
    }

    function getFitnessPlan(
        uint256 fitnessPlanIndex
    ) public view returns (FitnessPlans memory) {
        bytes32 key = LSP2Utils.generateArrayElementKeyAtIndex(
            mealPlansArrayKey,
            fitnessPlanIndex
        );
        bytes memory encodedData = getData(key);
        FitnessPlans memory decodedDataStruct = abi.decode(
            encodedData,
            (FitnessPlans)
        );
        return decodedDataStruct;
    }

    function publishArticle(
        string memory _title,
        string memory _authorName,
        string memory _content
    ) external onlyOwner {
        Articles memory article = Articles(_title, user, _authorName, _content);
        bytes memory encodedArticleStruct = abi.encode(fitnessPlan);
        uint256 articleIndex = uint256(bytes32(_getData(articlesArrayKey)));
        bytes32 key = LSP2Utils.generateArrayElementKeyAtIndex(
            articlesArrayKey,
            articleIndex
        );
        setData(key, encodedArticleStruct);
        unchecked {
            setData(articlesArrayKey, abi.encodePacked(articleIndex + 1));
        }
    }

    function getNumberOfArticles() public view returns (uint256) {
        return uint256(bytes32(getData(articlesArrayKey)));
    }

    function getArticle(
        uint256 articleIndex
    ) public view returns (Articles memory) {
        bytes32 key = LSP2Utils.generateArrayElementKeyAtIndex(
            articlesArrayKey,
            articleIndex
        );
        bytes memory encodedData = getData(key);
        Articles memory decodedDataStruct = abi.decode(encodedData, (Articles));
        return decodedDataStruct;
    }

    function createConsultation(
        string memory _consultationDesc
    ) external onlyOwner {
        ConsultationServices memory consultationService = ConsultationServices(
            user,
            _consultationDesc
        );
        bytes memory encodedConsultationStruct = abi.encode(
            consultationService
        );
        uint256 consultationIndex = uint256(
            bytes32(_getData(consultationsArrayKey))
        );
        bytes32 key = LSP2Utils.generateArrayElementKeyAtIndex(
            consultationsArrayKey,
            consultationIndex
        );
        setData(key, encodedConsultationStruct);
        unchecked {
            setData(
                consultationsArrayKey,
                abi.encodePacked(consultationIndex + 1)
            );
        }
    }

    function getNumberOfConsultations() public view returns (uint256) {
        return uint256(bytes32(getData(consultationsArrayKey)));
    }

    function getConsultation(
        uint256 consultationIndex
    ) public view returns (ConsultationServices memory) {
        bytes32 key = LSP2Utils.generateArrayElementKeyAtIndex(
            consultationsArrayKey,
            consultationIndex
        );
        bytes memory encodedData = getData(key);
        ConsultationServices memory decodedDataStruct = abi.decode(
            encodedData,
            (ConsultationServices)
        );
        return decodedDataStruct;
    }

    /**
     * @inheritdoc ERC165
     */
    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(IERC165, ERC725YCore) returns (bool) {
        return
            interfaceId == _INTERFACEID_NUTRITIONIST_PROFILE_DATA ||
            super.supportsInterface(interfaceId);
    }
}
