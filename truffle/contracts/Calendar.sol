// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Calendar {
  uint public id;
  string public title;
  address public user_id;

  function init(uint _id, address _user_id) external {
    id = _id;
    user_id = _user_id;
  }

  function updateTitle(string memory _title) public {
    title = _title;
  }
}
