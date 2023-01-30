// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract Token2 is ERC20 {
  constructor() ERC20('VJAD Token', 'VJAD') {
    //INITIAL// _mint(msg.sender, 100000);
    _mint(msg.sender, 10000*(10**18));
  }
}