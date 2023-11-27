// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import {LSP8Mintable} from "@lukso/lsp-smart-contracts/contracts/LSP8IdentifiableDigitalAsset/presets/LSP8Mintable.sol";
import {LSP8Burnable} from "@lukso/lsp-smart-contracts/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8Burnable.sol";

import {_LSP8_TOKENID_TYPE_NUMBER} from "@lukso/lsp-smart-contracts/contracts/LSP8IdentifiableDigitalAsset/LSP8Constants.sol";

import {_LSP4_TOKEN_TYPE_DATA_KEY, TokenType} from "./utils/TokenTypes.sol";

contract UserNFT is LSP8Mintable, LSP8Burnable {
    constructor(
        string memory nftCollectionName,
        string memory nftCollectionSymbol,
        address contractOwner,
        bytes memory _LSP4MetadataJSONURL
    )
        LSP8Mintable(
            nftCollectionName,
            nftCollectionSymbol,
            contractOwner,
            _LSP8_TOKENID_TYPE_NUMBER
        )
    {
        // set the token type
        _setData(_LSP4_TOKEN_TYPE_DATA_KEY, abi.encode(TokenType.COLLECTION));

        _setData(_LSP4_METADATA_KEY, _LSP4MetadataJSONURL);
    }
}
