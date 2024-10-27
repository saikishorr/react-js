import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  // Calculate time left to a target launch date (e.g., Dec 31, 2024)
  function calculateTimeLeft() {
    const targetDate = new Date("2024-12-31T00:00:00").getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    let time = {};
    if (difference > 0) {
      time = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return time;
  }

  // Update the countdown every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const timerComponents = Object.keys(timeLeft).map((interval) => (
    <div key={interval} className="time-box">
      <span className="number">{timeLeft[interval]}</span>
      <span className="label">{interval}</span>
    </div>
  ));

  return (
    <div className="coming-soon-container">
      <h1>Our Website is Coming Soon!</h1>
      <p>We are working hard to give you the best experience possible.</p>
      <div className="countdown">{timerComponents}</div>
    </div>
  );
};

export default App;
