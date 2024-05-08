// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

interface IXOracle {

    struct PriceStruct {
        address id;
        uint64 price;
        uint64 conf;
        uint32 decimals;
        uint256 timestamp;
    }

    function getPrice(address id) external view returns (PriceStruct memory);
    function updatePrice(bytes[] calldata updateData) external;
}
