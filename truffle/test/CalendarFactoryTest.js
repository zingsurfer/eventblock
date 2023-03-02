const CalendarFactory = artifacts.require("CalendarFactory");
const truffleAssert = require('truffle-assertions');

contract('CalendarFactory', (accounts) => {
  describe('create', () => {
    it('should add a calendarFactory', async () => {
      const calendarFactory = await CalendarFactory.deployed();
      const result = (await calendarFactory.create({from: accounts[2]}))

      truffleAssert.eventEmitted(result, "CalendarAdded", {username: accounts[2]})
    });
  });
});
