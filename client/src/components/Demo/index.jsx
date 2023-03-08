import { useState, useEffect, useRef } from "react";
import DemoData from "./Data";

function Arrow({ direction }) { return <i className={`fas fa-angle-left ${direction}`}></i> }

function Demo() {
  const today = new Date();

  const [calendarTitle, setCalendarTitle] = useState("DemoCalendar");
  const [calendarTitleInput, setCalendarTitleInput] = useState("");
  const [isEditingCalendarTitle, setIsEditingCalendarTitle] = useState(false);

  const [allEvents, setAllEvents] = useState([]);

  const [eventTitleInput, setEventTitleInput] = useState("");
  const [eventStartTimeInput, setEventStartTimeInput] = useState("");
  const eventStartTimeField = useRef(null);
  const eventEndTimeField = useRef(null);
  const [eventEndTimeInput, setEventEndTimeInput] = useState("");
  const [isAddingEvent, setIsAddingEvent] = useState(false);

  const [selectedDay, setSelectedDay] = useState(today);
  const [dayEvents, setDayEvents] = useState([{
    id: 0,
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu lectus ut nibh mattis volutpat et bibendum risus.",
    startTime: Math.round(new Date().getTime() / 1000),
    endTime: Math.round(new Date().getTime() / 1000) + 3600
  }
  ]);
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const spanEle = useRef(null);

  useEffect(() => {
    setIsEditingCalendarTitle(false)
  }, [calendarTitle]);

  useEffect(() => {
    if (isCompleteTimeInput()) {
      console.log(`isValidRange() => ${isValidRange()}`)
      if (isValidRange()) {
        eventEndTimeField.current.classList.remove("invalid-range");
      } else {
        eventEndTimeField.current.classList.add("invalid-range");
      }
    }
  }, [eventStartTimeInput, eventEndTimeInput]);

  function showTitleInput() {
    setIsEditingCalendarTitle(true)
  }

  const firstDay = () => {
    let day = new Date(selectedDay.getFullYear(), selectedDay.getMonth(), 1);
    const weekdayOfDay = day.getDay();
    const firstDayWeekDay = 6 - weekdayOfDay;

    day.setDate(day.getDate() - firstDayWeekDay);

    return day;
  }

  const lastDay = () => {
    let day = new Date(selectedDay.getFullYear(), selectedDay.getMonth() + 1, 0); // last day of current month
    const weekdayOfDay = day.getDay();

    day.setDate(day.getDate() + ((6 - weekdayOfDay) + 7));

    return day
  }

  const events = () => {
    let selectedEvents = []
    allEvents.forEach(evt => {
      const startDate = new Date(evt.startTime * 1000)

      if (startDate >= firstDay() && startDate <= lastDay()) {
        selectedEvents.push(evt)
      }
    })

    return selectedEvents
  }

  const dayEventsIndex = () => {
    let de = {}
    events().forEach(evt => {
      const startDate = new Date(evt.startTime * 1000)
      de[startDate.getDate()] = de[startDate.getDate()] || []
      de[startDate.getDate()].push(evt)
    })

    console.log(de)

    return de
  }

  const addEvent = async (e) => {
    if (e.target.tagName === "INPUT") {
      return;
    }

    let missingInputs = []
    const inputs = {
      title: eventTitleInput,
      start: eventStartTimeInput,
      end: eventEndTimeInput,
    }

    Object.keys(inputs).forEach((name) => {
      if (inputs[name] === "") {
        missingInputs.push(name)
      }
    })

    if (missingInputs.length > 0) {
      const missingInputList = [missingInputs.slice(0, -1).join(", "), missingInputs.slice(-1)[0]].join(missingInputs.length > 1 ? ", and " : "");
      alert(`Please enter event ${missingInputList}.`)
      return;
    }

    const prevEvents = dayEvents
    const clone = [...prevEvents]
    clone.push({
      id: prevEvents.length,
      title: eventTitleInput,
      startTime: eventStartTime(),
      endTime: eventEndTime(),
      year: selectedYear(),
      month: selectedMonth()
    })

    setDayEvents(clone)
    setIsAddingEvent(false)
  }

  const selectedYear = () => { return selectedDay.getFullYear() }
  const selectedMonth = () => { return selectedDay.getMonth() }
  const selectedDayDate = () => { return selectedDay.getDate() }

  const eventStartTime = () => {
    const startDate = new Date(
      selectedYear(),
      selectedMonth(),
      selectedDayDate(),
      getHour(eventStartTimeInput),
      getMinutes(eventStartTimeInput)
    )

    return Math.round(startDate.getTime() / 1000);
  }

  const eventEndTime = () => {
    const endDate = new Date(
      selectedYear(),
      selectedMonth(),
      selectedDayDate(),
      getHour(eventEndTimeInput),
      getMinutes(eventEndTimeInput)
    )

    return Math.round(endDate.getTime() / 1000);
  }

  const getHour = (timeInput) => {
    let hour = parseInt(timeInput.slice(0, 2))
    if (timeInput.slice(-2) === "PM") {
      hour += 12
    }
    console.log(`getHour(${timeInput}) #=> ${hour}`)
    return hour
  }

  const getMinutes = (timeInput) => {
    return parseInt(timeInput.slice(3, 5))
  }

  const findDayEvents = () => {
    const de = dayEventsIndex()
    return de[selectedDay.getDate()] || []
  }

  const handleCalendarTitleChange = e => {
    setCalendarTitleInput(e.target.value);
  };

  const handleEventTitleChange = e => {
    setEventTitleInput(e.target.value);
  };

  const handleEventStartTimeChange = e => {
    let timeInput = (e.target.value.substring(0, 8));

    // Insert missing space to standardize time input
    if (timeInput.length > 5 && /[a-zA-Z]/.test(timeInput[5])) {
      timeInput = timeInput.substring(0, 5) + " " + timeInput.substring(5, 7)
    }
    setEventStartTimeInput(timeInput)

    if (isValidTimeInput(timeInput)) {
      eventStartTimeField.current.classList.remove("invalid-input");
    } else {
      eventStartTimeField.current.classList.add("invalid-input");
    }
  };

  const handleEventEndTimeChange = e => {
    let timeInput = (e.target.value.substring(0, 8));

    // Insert missing space to standardize time input
    if (timeInput.length > 5 && /[a-zA-Z]/.test(timeInput[5])) {
      timeInput = timeInput.substring(0, 5) + " " + timeInput.substring(5, 7)
    }
    setEventEndTimeInput(timeInput)

    if (isValidTimeInput(timeInput)) {
      eventEndTimeField.current.classList.remove("invalid-input");
    } else {
      eventEndTimeField.current.classList.add("invalid-input");
    }
  };

  const isValidRange = () => {
    return eventStartTime() < eventEndTime();
  }

  const isCompleteTimeInput = () => {
    return (eventStartTimeInput.length === 8 && eventEndTimeInput.length === 8) && (
      /^(0[0-9]|1[0-2]):[0-5][0-9] [AaPp][Mm]$/.test(eventStartTimeInput) &&
      /^(0[0-9]|1[0-2]):[0-5][0-9] [AaPp][Mm]$/.test(eventEndTimeInput)
    )
  }

  const isValidTimeInput = (timeInput) => {
    switch (timeInput.length) {
      case 0:
        return true; // ""
      case 1:
        return /^[0-1]/ // "1"
      case 2:
        return /0(?=[1-9])|1(?=[0-2])/.test(timeInput); // "12"
      case 3:
        return /^(0[0-9]|1[0-2]):$/.test(timeInput); // "12:"
      case 4:
        return /^(0[0-9]|1[0-2]):[0-5]$/.test(timeInput); // "12:3"
      case 5:
        return /^(0[0-9]|1[0-2]):[0-5][0-9]$/.test(timeInput); // "12:34"
      case 6:
        return /^(0[0-9]|1[0-2]):[0-5][0-9] $/.test(timeInput); // "12:34 "
      case 7:
        return /^(0[0-9]|1[0-2]):[0-5][0-9] [AaPp]$/.test(timeInput); // "12:34 P"
      case 8:
        return /^(0[0-9]|1[0-2]):[0-5][0-9] [AaPp][Mm]$/.test(timeInput); // "12:34 PM"
    }
  }

  const updateCalendarTitle = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (calendarTitleInput === "") {
      alert("Please enter a title");
      return;
    }
    setCalendarTitle(calendarTitleInput);
  };

  const cancelCalendarTitleUpdate = () => {
    setIsEditingCalendarTitle(false);
  }

  const toggleNewEventForm = () => {
    setIsAddingEvent(!(isAddingEvent));
  }

  const [selectedDayIndex, setSelectedDayIndex] = useState(null);

  const activeDayEle = useRef("");

  let firstDayOfMonth = new Date(selectedDay.getFullYear(), selectedDay.getMonth(), 1);
  let weekdayOfFirstDay = firstDayOfMonth.getDay();

  const updateActiveDay = (day) => {
    const prevDayNumber = selectedDay.getDate()
    const diff = day.number - prevDayNumber

    selectedDay.setDate(selectedDay.getDate() + diff)

    setDayEvents(DemoData(selectedYear(), selectedMonth(), selectedDayDate()))
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
      (isSameDay(new Date(day.year, day.month, day.number)) ? " today" : "")
  }

  const selectedDays = () => {
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
    return selectedDays;
  }

const timeRange = (startEpochSec, endEpochSec) => {
  console.log(`timerange(${startEpochSec}, ${endEpochSec})`)
  const start = humanizeTime(startEpochSec)
  const end = humanizeTime(endEpochSec)
  console.log(`=> start ${start}, end ${end}`)

  return start + " - " + end
}

const humanizeTime = (epochSeconds) => {
  let time = new Date(epochSeconds * 1000).toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  })

  if (time[0] === "0") {
    time = time.substring(1)
  }

  return time
}


  return (
    <>
      <div id="cal" className="container">
        <div className="left">
          <div className="calendar">
            <div className="month">
              <Arrow direction="previous" />
              <h1 className="date">{months[selectedDay.getMonth()]} <span className="gradient-text">{selectedDay.getFullYear()}</span></h1>
              <Arrow direction="next" />
            </div>
            <div className="weekdays">
              {
                weekdays.map((weekday) => {
                  return <div key={weekday}>{weekday}</div>
                })
              }
            </div>
            <div className="days">
              {
                selectedDays().map((day, i) => {
                  return (
                    <div className={dayClasses(day, i)} key={day.key}
                      onClick={() => updateActiveDay(day)}>
                      <p>{day.number}</p>
                    </div>
                  )
                })
              }
            </div>
            <div className="goto-today">
              <button className="today-btn">Today</button>
              <div className="goto">
                <input type="text" placeholder="mm/yyyy" className="date-input" />
                <button className="goto-btn">Go</button>
              </div>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="calendar-title-grid">
            <div className="calendar-title-grid-col">
              <img className="logo" src="https://i.imgur.com/IoKG3DP.png" alt="logo" />
              <div className={`btns title-input-buttons ${isEditingCalendarTitle ? "" : "hidden"}`} style={{ margin: "10px 0px" }}>
                <div className="submit-container">
                  <div className="input-container">
                    <input
                      type="text"
                      placeholder="Calendar title"
                      value={calendarTitleInput}
                      onChange={handleCalendarTitleChange}
                      className="gradient-text"
                    />
                  </div>
                  <div style={{ display: "flex" }}>
                    <button onClick={updateCalendarTitle} className="btn button-space submit">
                      <span className="underline">Submit</span>
                    </button>
                    <button onClick={cancelCalendarTitleUpdate} className="btn button-space cancel">
                      <span className="underline">Cancel</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className={`calendar-title ${isEditingCalendarTitle ? "hidden" : "title"}`}>
                <h1><span className="gradient-text">EventBlock</span></h1>
                <h1 ref={spanEle}>{calendarTitle}</h1>
                <button className="input-link" onClick={showTitleInput} ><span className="underline">edit</span></button>
              </div>
            </div>
          </div>
          <div className="events" style={{ height: "100vh" }}>
            {
              isAddingEvent ?
                <div className="today-date">
                  <div className="event-date">
                    <h2>
                      New event <br className="mobile-br" />
                      <span style={{ fontWeight: 400 }}>
                        on {weekdays[selectedDay.getDay()]}, {months[selectedDay.getMonth()]} {selectedDay.getDate()}
                      </span>
                    </h2>
                    <div>
                      <button className="event-btn button-space submit" onClick={addEvent}>Submit</button>
                      <button className="event-btn cancel" onClick={toggleNewEventForm}>Cancel</button>
                    </div>
                  </div>
                  <div className="input-row event-form">
                    <div className="text-field">
                      <label>Title</label>
                      <input
                        type="text"
                        placeholder=""
                        value={eventTitleInput}
                        onChange={handleEventTitleChange}
                      />
                    </div>
                  </div>
                  <div className="input-row event-form">
                    <div className="time-field" ref={eventStartTimeField}>
                      <label>From</label>
                      <input
                        type="text"
                        placeholder="HH:MM AM/PM"
                        value={eventStartTimeInput}
                        onChange={handleEventStartTimeChange}
                      />
                    </div>
                    <div className="time-field" ref={eventEndTimeField}>
                      <label>To</label>
                      <input
                        type="text"
                        placeholder="HH:MM AM/PM"
                        value={eventEndTimeInput}
                        onChange={handleEventEndTimeChange}
                      />
                    </div>
                  </div>
                </div> :
                <div className="today-date">
                  <div className="event-date">
                    <h2>
                      {weekdays[selectedDay.getDay()]}, {months[selectedDay.getMonth()]} {selectedDay.getDate()}
                    </h2>
                    <button className="event-btn--new" onClick={toggleNewEventForm}>Add Event</button>
                  </div>
                  {
                    dayEvents.map((evt) => {
                      console.log(`evt: ${JSON.stringify(evt)}`)
                      const eventTitle = evt.title.substring(0, 37)
                      const eventDescription = evt.title.substring(37)
                      return (
                        <div style={{ display: "flex", flexDirection: "row", paddingTop: "1.5rem" }} key={`event-${evt.id}`}>
                          <div className="block"></div>
                          <div>
                            <h2 className="time-range">{timeRange(evt.startTime, evt.endTime)}</h2>
                            <h3 className="event-title">{eventTitle} . . .</h3>
                            <div className="event-description">...{eventDescription}</div>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default Demo;

