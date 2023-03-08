function DemoData(year, month, dayDate) {
  const titles = [
    "Suspendisse porttitor ornare arcu a suscipit. Curabitur lacus eros, faucibus vel lacinia at, aliquam non nunc.",
    "Donec elementum ligula ut erat aliquam volutpat. Donec est massa, consequat nec nibh in, faucibus lobortis tellus. Nulla ex mi, fringilla viverra enim eget, tincidunt gravida leo.",
    "Nullam ornare ante ut sem consequat consequat efficitur ac nibh. Integer volutpat urna id metus molestie, et commodo massa pretium.",
    "Integer at dui ex. Etiam eleifend, lorem ac pretium semper, ex nulla suscipit orci, ut vulputate nibh nisi ut risus.",
    "Mauris tempus elementum neque in semper. Cras non nulla posuere, malesuada leo id, faucibus augue.",
    "Nulla ex mi, fringilla viverra enim eget, tincidunt gravida leo.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non bibendum tortor.",
    "Donec venenatis placerat velit, at ultrices enim fermentum eget.",
    "Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
    "Morbi eget mi sed nunc laoreet luctus."
  ]

  const shuffledTitles = titles.sort(() => 0.5 - Math.random());
  const selectedTitles = shuffledTitles.slice(0, Math.floor(Math.random() * 5));
  let selectedEvents = [];
  let id = 0;
  const hourChaos = Math.floor(Math.random() * (9 - 7 + 1) + 7);
  let startTime = Math.round(new Date(year, month, dayDate, hourChaos, 0).getTime() / 1000);

  selectedTitles.forEach((title) => {
    let minutesChaos = Math.floor(Math.random() * 2);
    let minutes = minutesChaos === 0 ? 30 : 50;
    const endTime = startTime + (minutes * 60);

    selectedEvents.push({ id: id, title: title, startTime: startTime, endTime: endTime });

    id++
    minutesChaos = Math.floor(Math.random() * 2);
    minutes = minutesChaos === 0 ? 30 : 50;
    startTime = endTime + minutes * 60;
  })
  return selectedEvents;
}

export default DemoData;
