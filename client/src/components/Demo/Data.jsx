import EthDenverEvents from './EthDenverEvents'

function DemoData(year, month, dayDate) {
  const events = EthDenverEvents()

  const shuffledEvents = events.sort(() => 0.5 - Math.random());
  const randomEvents = shuffledEvents.slice(0, Math.floor(Math.random() * 5));
  let selectedEvents = [];
  let id = 0;
  const hourChaos = Math.floor(Math.random() * (9 - 7 + 1) + 7);
  let startTime = Math.round(new Date(year, month, dayDate, hourChaos, 0).getTime() / 1000);

  randomEvents.forEach((event) => {
    let minutesChaos = Math.floor(Math.random() * 2);
    let minutes = minutesChaos === 0 ? 30 : 50;
    const endTime = startTime + (minutes * 60);

    selectedEvents.push({ id: id, title: event.name + ". " + event.description, startTime: startTime, endTime: endTime });

    id++
    minutesChaos = Math.floor(Math.random() * 2);
    minutes = minutesChaos === 0 ? 30 : 50;
    startTime = endTime + minutes * 60;
  })
  return selectedEvents;
}

export default DemoData;
