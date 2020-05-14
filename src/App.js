import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;

  let [futureDate, setFutureDate] = useState(
    new Date("Thu May 24 2020 16:45:28 GMT-0500").getTime()
  );

  let [currentDate, setCurrentDate] = useState(new Date().getTime());

  let [distance, setDistance] = useState(futureDate - currentDate);

  let [distanceObj, setDistanceObj] = useState({
    days: Math.floor(distance / day),
    hours: Math.floor((distance % day) / hour),
    minutes: Math.floor((distance % hour) / minute),
    seconds: Math.floor((distance % minute) / second),
  });

  function useInterval(cb, delay) {
    const savedCallback = useRef();

    useEffect(() => {
      savedCallback.current = cb;
    }, [cb]);

    useEffect(() => {
      function tick() {
        savedCallback.current();
      }

      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  function handleDateChange(e) {
    setFutureDate(new Date(e).getTime());
  }

  useInterval(() => {
    // https://overreacted.io/making-setinterval-declarative-with-react-hooks/

    setCurrentDate(new Date().getTime());
    setDistance(futureDate - currentDate);

    let days = Math.floor(distance / day);
    let hours = Math.floor((distance % day) / hour);
    let minutes = Math.floor((distance % hour) / minute);
    let seconds = Math.floor((distance % minute) / second);

    setDistanceObj({ days, hours, minutes, seconds });

    // update the DOM element representing the particular time interval here
    document.getElementById("days").innerText = distanceObj.days;
    document.getElementById("hours").innerText = distanceObj.hours;
    document.getElementById("minutes").innerText = distanceObj.minutes;
    document.getElementById("seconds").innerText = distanceObj.seconds;
  }, second);

  return (
    <div className="App">
      <header className="App-header">
        <h1 id="head">How Soon Is Then?</h1>
        <DatePicker
          selected={futureDate}
          dateFormat="EEEE, MMM d, yyyy"
          onChange={(e) => handleDateChange(e)}
        />
      </header>

      <div id="countdownTicker">
        <ul>
          <li>
            <span id="days"></span>Days
          </li>
          <li>
            <span id="hours"></span>Hours
          </li>
          <li>
            <span id="minutes"></span>Minutes
          </li>
          <li>
            <span id="seconds"></span>Seconds
          </li>
        </ul>
      </div>
      <div id="countdownLabel">UNTIL TEST EVENT</div>
    </div>
  );
}

export default App;
