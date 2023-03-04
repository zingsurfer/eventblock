import { useState, useRef } from "react";

function Days() {
  const [selectedDayIndex, setSelectedDayIndex] = useState(null);
  const [selectedDay, setSelectedDay] = useState(new Date());

  const activeDayEle = useRef("");

  let firstDayOfMonth = new Date(selectedDay.getFullYear(), selectedDay.getMonth(), 1);
  let weekdayOfFirstDay = firstDayOfMonth.getDay();
  let selectedDays = [];

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
      currentMonth: (firstDayOfMonth.getMonth() === selectedDay.getMonth()),
      date: (new Date(firstDayOfMonth)),
      month: firstDayOfMonth.getMonth(),
      number: firstDayOfMonth.getDate(),
      firstSelection: (firstDayOfMonth.toDateString() === selectedDay.toDateString()),
      year: firstDayOfMonth.getFullYear()
    }

    selectedDays.push(calendarDay);
  }

  const updateActiveDay = (day, index) => {
    setSelectedDay(new Date(day.year, day.month, day.number));
    setSelectedDayIndex(index);
  }

  const isSameDay = (day) => {
    const today = new Date()
    return day.getFullYear() === today.getFullYear() &&
      day.getMonth() === today.getMonth() &&
      day.getDate() === today.getDate();
  }

  const dayClasses = (day, index) => {
    return "day" +
      (day.currentMonth ? " selected-month" : "") +
      (day.firstSelection || selectedDayIndex === index ? " active" : "") +
      (isSameDay(new Date(day.year, day.month, day.number)) ? " today": "")
  }


  return (
    <div className="days">
      {
        selectedDays.map((day, i) => {
          return (
            <div className={dayClasses(day, i)} key={day.key}
              onClick={() => updateActiveDay(day, i)}>
              <p>{day.number}</p>
            </div>
          )
        })
      }
    </div>
  )
}

export default Days;
