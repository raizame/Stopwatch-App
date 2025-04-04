
import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {

  const [isRunning, setisRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    }

    return () => {
      clearInterval(intervalIdRef.current);
    }

  }, [isRunning])

  function start() {
    setisRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  }

  function stop() {
    setisRunning(false);

  }

  function reset() {
    setisRunning(false);
    setElapsedTime(0);
  }

  function formatTime() {
    
    let hours = String(Math.floor(elapsedTime / (1000 * 60 * 60))).padStart(2,"0");
    let minutes = String(Math.floor(elapsedTime / (1000 * 60 ) % 60)).padStart(2,"0");
    let seconds = String(Math.floor(elapsedTime / (1000) % 60)).padStart(2,"0");
    let milliseconds = String(Math.floor((elapsedTime % 1000) / 10)).padStart(2,"0");

    return `${minutes}:${seconds}:${milliseconds}`;
  }


  return (
    <div className='stopwatch'>
      <div className='display' >{formatTime()}</div>
      <div className='controls'>
        <button className='start-btn' onClick={start}>Start</button>
        <button className='stop-btn' onClick={stop}>Stop</button>
        <button className='reset-btn' onClick={reset}>Reset</button>

      </div>
    </div>

  )
}

export default App
