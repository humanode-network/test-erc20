// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract HTEST is ERC20 {
    constructor(uint256 initialSupply) ERC20("HTEST", "HTEST") {
        _mint(msg.sender, initialSupply);
    }
}
