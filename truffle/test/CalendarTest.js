const Calendar = artifacts.require("Calendar");

contract('Calendar', (accounts) => {
  it('title can be updated', async() => {
    const calendar = await Calendar.deployed();
    var title = (await calendar.title())

    assert.notEqual(title, 'New Calendar');

    await calendar.updateTitle('New Calendar', {from: accounts[0]});
    title = (await calendar.title())

    assert.equal(title, 'New Calendar');
  });
  it('can create events', async() => {
    const calendar = await Calendar.deployed();
    var events = (await calendar.getAllEvents());

    assert.equal(events.length, 0);

    await calendar.addEvent('New Title', 1677687559, 1677690000, 2022, 3, {from: accounts[0]});
    var events = (await calendar.getAllEvents());

    assert.equal(events.length, 1);
  });
  it('can update events', async() => {
    const calendar = await Calendar.deployed();
    var events = (await calendar.getAllEvents());

    assert.equal(events.length, 1);

    await calendar.updateEvent(events[0].id, 'Different Title', {from: accounts[0]});
    var events = (await calendar.getAllEvents());

    assert.equal(events[0].title, 'Different Title');
  });
  it('can delete events', async() => {
    const calendar = await Calendar.deployed();
    var events = (await calendar.getAllEvents());

    assert.equal(events.length, 1);

    await calendar.deleteEvent(events[0].id, {from: accounts[0]});
    var events = (await calendar.getAllEvents());

    assert.equal(events.length, 0);
  });
  it('can get just my events', async() => {
    const calendar = await Calendar.deployed();
    var events = (await calendar.getAllEvents());

    assert.equal(events.length, 0);

    await calendar.addEvent('MyTitle', 1677687559, 1677690000, 2022, 3, { from: accounts[0] });
    await calendar.addEvent("Someone else's title", 1677687559, 1677690000, 2022, 3, { from: accounts[2] });
    var myEvents = (await calendar.getMyEvents());
    var events = (await calendar.getAllEvents());

    assert.equal(myEvents.length, 1);
    assert.equal(events.length, 2);
  })
});
