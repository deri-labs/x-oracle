// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "../interfaces/IXOracle.sol";

contract MockXOracle is IXOracle {

    address private _signer;
    mapping(address => PriceStruct) private _prices;

    constructor() {}

    function getPrice(address id) external view override returns (PriceStruct memory) {
        return _prices[id];
    }

    function createUpdateData(
        address id,
        uint64 price,
        uint64 conf,
        uint32 decimals,
        uint256 timestamp
    ) external view returns (bytes[] memory updateData){
        PriceStruct memory _priceStruct = PriceStruct(id, price, conf, decimals, timestamp);
        bytes32 priceHash = keccak256(abi.encodePacked(
            _priceStruct.id,
            _priceStruct.price,
            _priceStruct.conf,
            _priceStruct.decimals,
            _priceStruct.timestamp
        ));
        updateData = new bytes[](1);
        updateData[0] = abi.encode(_priceStruct);
    }

    function updatePrice(bytes[] calldata updateData) external override {
        (PriceStruct memory _priceStruct) = abi.decode(updateData[0], (PriceStruct));
        bytes32 priceHash = keccak256(abi.encodePacked(
            _priceStruct.id,
            _priceStruct.price,
            _priceStruct.conf,
            _priceStruct.decimals,
            _priceStruct.timestamp
        ));
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
