// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;
import "@openzeppelin/contracts/access/Ownable.sol";

import "./Calendar.sol";
import { Clones } from "@openzeppelin/contracts/proxy/Clones.sol";

contract CalendarFactory is Ownable{
  event CalendarAdded(address username, uint id);

  address public origin;
  Calendar[] public calendars;
  uint private cloneCount;

  constructor(address _origin) {
    origin = _origin;
  }

  function create() external onlyOwner{
    Calendar calendar = Calendar(Clones.clone(origin));
    cloneCount++;
    calendar.init(
      cloneCount,
      msg.sender
    );
    calendars.push(calendar);
    emit CalendarAdded(msg.sender, cloneCount);
  }
}
