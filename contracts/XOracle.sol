// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./interfaces/IXOracle.sol";

contract XOracle is IXOracle {

    address private _signer;
    mapping(address => PriceStruct) private _prices;

    constructor(address signer) {
        _signer = signer;
    }

    function getPrice(address id) external view override returns (PriceStruct memory) {
        return _prices[id];
    }

    function updatePrice(bytes[] calldata updateData) external override {
        (PriceStruct memory _priceStruct,
            uint8 v, bytes32 r, bytes32 s) = abi.decode(updateData[0], (PriceStruct, uint8, bytes32, bytes32));
        bytes32 priceHash = keccak256(abi.encodePacked(
            _priceStruct.id,
            _priceStruct.price,
            _priceStruct.conf,
            _priceStruct.decimals,
            _priceStruct.timestamp
        ));
        bytes32 signedHash = signedPriceHash(priceHash);
        require(recoverSigner(signedHash, v, r, s) == _signer, "XOracle: invalid signature");
        _prices[_priceStruct.id] = _priceStruct;
    }

    function signedPriceHash(bytes32 priceHash) public pure returns (bytes32) {
        return keccak256(
            abi.encodePacked(
                "\x19Ethereum Signed Message:\n32",
                priceHash
            )
        );
    }

    function recoverSigner(
        bytes32 ethSignedMessageHash,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) public pure returns (address) {
        return ecrecover(ethSignedMessageHash, v, r, s);
    }
}
