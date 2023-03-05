import { useState, useEffect, useRef } from "react";
import useEth from "../../contexts/EthContext/useEth";
import Demo from "./Demo";

function Arrow({ direction }) { return <i className={`fas fa-angle-left ${direction}`}></i> }

function Calendar() {
  const { state: { contract, accounts } } = useEth();
  const today = new Date()

  const [title, setTitle] = useState("EventBlock");
  const [titleInput, setTitleInput] = useState("");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isAddingEvent, setIsAddingEvent] = useState(false);

  const [selectedDay, setSelectedDay] = useState(today);
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const spanEle = useRef(null);

  useEffect(() => {
    setIsEditingTitle(false)
  }, [title]);

  function showTitleInput() {
    setIsEditingTitle(true)
  }

  const sortEvents = (selectedEvents) => {
    selectedEvents.sort(({ a, b }) => {
      return a.startTime - b.startTime;
    });
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

  const allEvents = Demo();

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

  // console.log(`lastday: ${lastDay()}`)
  // console.log(`firstday: ${firstDay()}`)

  const handleInputChange = e => {
    if (/^[a-zA-Z ]*$/.test(e.target.value)) {
      setTitleInput(e.target.value);
    }
  };

  const read = async () => {
    const value = await contract.methods.title().call({ from: accounts[0] });
    console.log(`read: ${value}`);
  };

  const updateTitle = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (titleInput === "") {
      alert("Please enter a title");
      return;
    }
    setTitle(titleInput);
    await contract.methods.updateTitle(titleInput).send({ from: accounts[0] });
  };

  const cancelTitleUpdate = () => {
    setIsEditingTitle(false);
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

    console.log(`previous: ${selectedDay}`)
    console.log(today.getDate())

    const diff = day.number - prevDayNumber

    console.log(`new ${day.number} - prev ${prevDayNumber} = ${diff}`)

    selectedDay.setDate(selectedDay.getDate() + diff)

    console.log(`new selectedDay: ${selectedDay}`)
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


  return (
    <>
      <div id="cal" className="container">
        <div className="left">
          <div className="calendar">
            <div className="month">
              <Arrow direction="previous"/>
              <h1 className="date">{months[selectedDay.getMonth()]} <span className="gradient-text">{selectedDay.getFullYear()}</span></h1>
              <Arrow direction="next"/>
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
          <div className="logo-container">
            <div style={{"gridColumn": "container"}}>
              <img className="logo" src="https://i.imgur.com/IoKG3DP.png" alt="logo" />
              <div className={`btns title-input-buttons ${isEditingTitle ? "" : "hidden"}`} style={{margin: "10px 0px"}}>
                <div className="submit-container">
                  <div className="input-container">
                    <input
                      type="text"
                      placeholder="Calendar title"
                      value={titleInput}
                      onChange={handleInputChange}
                      className="gradient-text"
                    />
                  </div>
                  <div style={{display:"flex"}}>
                    <button onClick={updateTitle} className="btn button-space">
                      <span className="underline">Submit</span>
                    </button>
                    <button onClick={cancelTitleUpdate} className="btn button-space">
                      <span className="underline">Cancel</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className={`calendar-title ${isEditingTitle ? "hidden" : "title" }`}>
                <h1 className="date"><span className="gradient-text" ref={spanEle}>{title}</span></h1>
                <button className="input-link" onClick={showTitleInput} ><span className="underline">edit</span></button>
              </div>
            </div>
          </div>
          <div className="events" style={{height: "100vh"}}>
            {
              isAddingEvent ?
              <div className="today-date">
                <div className="event-date">
                  <h2>
                      New event <span style={{ fontWeight: 400}}>
                        on {weekdays[selectedDay.getDay()]}, {months[selectedDay.getMonth()]} {selectedDay.getDate()}
                      </span>
                  </h2>
                  <div>
                    <button className="event-btn--create button-space" onClick={toggleNewEventForm}>Submit</button>
                    <button className="event-btn--cancel" onClick={toggleNewEventForm}>Cancel</button>
                  </div>
                </div>
                <div className="submit-container event-form">
                  <div className="event-form--title">
                    <label className="event-form--label">Title:</label>
                    <input
                      type="text"
                      placeholder=""
                      value={titleInput}
                      onChange={handleInputChange}
                      style={{background:"transparent"}}
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
                  events().map((evt) => {
                    const eventTitle = evt.title.substring(0, 37)
                    const eventDescription = evt.title.substring(37)
                    return (
                      <div style={{ display: "flex", flexDirection: "row", paddingTop: "1.5rem" }} key={`event-${evt.id}`}>
                        <span style={{ marginRight: "1rem" }}>⬜️</span>
                        <div>
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
          <div className="add-event-wrapper">
            <div className="add-event-header">
              <div className="title">Add Event</div>
              <i className="fas fa-times close"></i>
            </div>
            <div className="add-event-body">
              <div className="add-event-input">
                <input type="text" placeholder="Event Name" className="event-name" />
              </div>
              <div className="add-event-input">
                <input
                  type="text"
                  placeholder="Event Time From"
                  className="event-time-from"
                />
              </div>
              <div className="add-event-input">
                <input
                  type="text"
                  placeholder="Event Time To"
                  className="event-time-to"
                />
              </div>
            </div>
            <div className="add-event-footer">
              <button className="add-event-btn">Add Event</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Calendar;
