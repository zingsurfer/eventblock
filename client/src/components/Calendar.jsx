import { useState, useEffect, useRef } from "react";
import Days from "./Days";
import useEth from "../contexts/EthContext/useEth";
import ContractBtns from "./Demo/ContractBtns";

function Arrow({ direction }) { return <i className={`fas fa-angle-left ${direction}`}></i> }

const events = [
  {
    day: 13,
    month: 3,
    year: 2023,
    events: [
      {
        title: "Event 1 lorem ipsun dolar sit genfa tersd dsad ",
        time: "10:00 AM",
      },
      {
        title: "Event 2",
        time: "11:00 AM",
      },
    ],
  },
];

function Calendar({ value, setValue }) {
  const { state: { contract, accounts } } = useEth();

  const spanEle = useRef("");
  const [currentDay, setCurrentDay] = useState(new Date())
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const { state } = useEth();
  const [valueLoaded, setValueLoaded] = useState(false);

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

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
      setValueLoaded(false);
      let res = await contract.methods.title().call({ from: accounts[0] })
      console.log(res)
      setValue(res)
      setValueLoaded(true);
    })();
  }, []);

  function showTitleInput() {
    setIsEditingTitle(true)
    console.log(isEditingTitle)
  }

  return (
    <>
      <div id="cal" className="container">
        <div className="left">
          <div className="calendar">
            <div className="month">
              <Arrow direction="previous"/>
              <h1 className="date">{months[currentDay.getMonth()]} <span className="gradient-text">{currentDay.getFullYear()}</span></h1>
              <Arrow direction="next"/>
            </div>
            <div className="weekdays">
              {
                weekdays.map((weekday) => {
                  return <div key={weekday}>{weekday}</div>
                })
              }
            </div>
            <Days day={currentDay} />
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
            <h1 className="date"><span className="gradient-text" ref={spanEle}>{value}</span></h1>
            {
              isEditingTitle ?
              <ContractBtns setValue={setValue} /> :
              <>
                <h1 className="date"><span className="gradient-text" ref={spanEle}>{value ? value : "EventBlock"}</span></h1>
                <button className="input-link" onClick={showTitleInput} ><span className="underline">edit</span></button>
              </>
            }
          </div>
          <div className="today-date">
            <div className="event-day">fri</div>
            <div className="event-date">30th may 2022</div>
          </div>
          <div className="events"></div>
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
