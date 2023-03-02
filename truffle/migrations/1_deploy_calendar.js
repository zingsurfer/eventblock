const Calendar = artifacts.require("Calendar");
const CalendarFactory = artifacts.require("CalendarFactory");

module.exports = function (deployer) {
  deployer.deploy(Calendar).then(() => deployer.deploy(CalendarFactory, Calendar.address));
};
