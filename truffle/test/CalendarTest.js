const Calendar = artifacts.require("Calendar");

contract('Calendar', (accounts) => {
  it('can be updated', async() => {
    const calendar = await Calendar.deployed();
    var title = (await calendar.title())

    assert.notEqual(title, "NewTitle");

    await calendar.updateTitle("NewTitle", {from: accounts[0]});
    title = (await calendar.title())

    assert.equal(title, "NewTitle");
  });
});
