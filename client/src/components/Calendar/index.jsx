import { useState, useEffect, useRef } from "react";
import Days from "./Days";
import useEth from "../../contexts/EthContext/useEth";
import ContractBtns from "./ContractBtns";
import Demo from "./Demo";

function Arrow({ direction }) { return <i className={`fas fa-angle-left ${direction}`}></i> }

function Calendar({ value, setValue }) {
  const { state: { contract, accounts } } = useEth();

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [valueLoaded, setValueLoaded] = useState(false);
  const [selectedDay, setSelectedDay] = useState(new Date());
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const spanEle = useRef("");


  useEffect(() => {
    spanEle.current.classList.add("flash");
    const flash = setTimeout(() => {
      spanEle.current.classList.remove("flash");
    }, 300);
    return () => {
      clearTimeout(flash);
    };
  }, [value]);


  useEffect(() => {
    (async () => {
      let res = await contract.methods.title().call({ from: accounts[0] })
      setValue(res)
      setValueLoaded(true);
    })();
  }, []);

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
  allEvents.forEach(evt => {
    console.log(`event: ${JSON.stringify(evt)}`)
    // const e = JSON.parse(evt)
    console.log(evt.title)
  })

  const events = () => {
    let selectedEvents = []
    allEvents.forEach(evt => {
      // const e = JSON.parse(evt)
      console.log(evt.title)
      const startDate = new Date(evt.startTime * 1000)

      if (startDate >= firstDay() && startDate <= lastDay()) {
        selectedEvents.push(evt)
      }
    })

    return selectedEvents
  }

  console.log(`lastday: ${lastDay()}`)
  console.log(`firstday: ${firstDay()}`)

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
            <Days />
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
            <img className="logo" src="logos/logo-square.png" alt="logo" />
            {
              isEditingTitle ?
              <ContractBtns setValue={setValue} /> :
              <>
                <h1 className="date"><span className="gradient-text" ref={spanEle}>{value ? value : "EventBlock"}</span></h1>
                <button className="input-link" onClick={showTitleInput} ><span className="underline">edit</span></button>
              </>
            }
          </div>
          <div className="events">
            {
              events().map((evt) => {
                return (
                  <div className="today-date" key={`event-${evt.id}`}>
                    <div className="event-title">{evt.title}</div>
                    <div className="event-description">{evt.description}</div>
                  </div>
                )
              })
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
        <button className="add-event">
          <span>+</span>
        </button>
      </div>
    </>
  );
}

export default Calendar;
