function Days(props) {
  let firstDayOfMonth = new Date(props.day.getFullYear(), props.day.getMonth(), 1);
  let weekdayOfFirstDay = firstDayOfMonth.getDay();
  let currentDays = [];


  for (let day = 0; day < 42; day++) {
    if (day === 0 && weekdayOfFirstDay === 0) {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
    } else if (day === 0) {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() + (day - weekdayOfFirstDay));
    } else {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
    }

    let calendarDay = {
      key: `day-${day}`,
      currentMonth: (firstDayOfMonth.getMonth() === props.day.getMonth()),
      date: (new Date(firstDayOfMonth)),
      month: firstDayOfMonth.getMonth(),
      number: firstDayOfMonth.getDate(),
      selected: (firstDayOfMonth.toDateString() === props.day.toDateString()),
      year: firstDayOfMonth.getFullYear()
    }

    currentDays.push(calendarDay);
  }

  return (
    <div className="days">
      {
        currentDays.map((day) => {
          return (
            <div className={"day" + (day.currentMonth ? " today" : "") + (day.selected ? " active" : "")} key={day.key}
              onClick={() => props.setCurrentDay(day)}>
              <p>{day.number}</p>
            </div>
          )
        })
      }
    </div>
  )
}

export default Days;
