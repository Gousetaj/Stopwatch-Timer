import React, { useState, useEffect } from "react";

const StopwatchTimer: React.FC = () => {
  const [time, setTime] = useState<number>(0); // Time in seconds
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number | null>(null); // Countdown time in seconds

  // Effect to handle interval for stopwatch or countdown
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (countdown !== null && prevTime <= 0) {
          clearInterval(interval);
          setIsRunning(false);
          return 0;
        }
        return countdown !== null ? prevTime - 1 : prevTime + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, countdown]);

  // Handlers
  const startHandler = () => setIsRunning(true);

  const stopHandler = () => setIsRunning(false);

  const resetHandler = () => {
    setIsRunning(false);
    setTime(countdown || 0);
  };

  const setCountdownHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value)) {
      setCountdown(value);
      setTime(value);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Stopwatch/Timer</h1>
      <h2>{new Date(time * 1000).toISOString().substr(11, 8)}</h2>
      <div style={{ margin: "20px" }}>
        <label>
          Set Countdown (seconds):
          <input type="number" onChange={setCountdownHandler} />
        </label>
      </div>
      {!countdown && (
        <div>
          <button onClick={startHandler} disabled={isRunning}>
            Start
          </button>
          <button onClick={stopHandler} disabled={!isRunning}>
            Stop
          </button>
          <button onClick={resetHandler}>Reset</button>
        </div>
      )}

      {countdown !== null && (
        <div>
          <button onClick={startHandler} disabled={isRunning || time === 0}>
            Start Countdown
          </button>
          <button onClick={stopHandler} disabled={!isRunning}>
            Stop
          </button>
          <button onClick={resetHandler}>Reset</button>
        </div>
      )}


    </div>
  );
};

export default StopwatchTimer;
