import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 id="head">How Soon Is Then?</h1>
      </header>

      <div id="countdownTicker">
        <ul>
          <li>
            <span>00</span>Days
          </li>
          <li>
            <span>00</span>Hours
          </li>
          <li>
            <span>00</span>Minutes
          </li>
          <li>
            <span>00</span>Seconds
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;
