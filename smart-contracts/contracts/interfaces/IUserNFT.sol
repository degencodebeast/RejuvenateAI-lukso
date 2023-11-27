// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

import {ILSP8Mintable} from "@lukso/lsp-smart-contracts/contracts/LSP8IdentifiableDigitalAsset/presets/ILSP8Mintable.sol";

interface IUserNFT is ILSP8Mintable {

  event MintUserNFT(address member);

  event BurnUserNFT(address member, uint256 tokenId);

  function burn(bytes32 tokenId, bytes memory data) external;

}
