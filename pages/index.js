import { useEffect, useState } from 'react';

import styles from '../styles/Index.module.css';

// time constants
const sec = 1000;
const min = sec * 60;
const hour = min * 60;
const day = hour * 24;

const highlight = '0, 0, 0'

export default function Index() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('00:00');
  const [timeLeft, setTimeLeft] = useState(undefined);

  function updateTimeLeft() {
    const end = new Date(`${date} ${time}`);
    setTimeLeft(end - new Date());
  }

  // update time left
  useEffect(() => {
    updateTimeLeft();
    const interval = setInterval(updateTimeLeft, 10);
    return () => clearInterval(interval);
  }, [date, time]);

  // pads given num to 2 digits
  function pad(num, noPad) {
    if (num > 9 || noPad) return num;
    return `0${num}`;
  }

  return (
    <div className={styles.container}>
      <div className={styles.input}>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <input
          type="time"
          value={time}
          onChange={e => setTime(e.target.value)}
        />
      </div>
      {
        date ?
        <div className={styles.center}>
          <div className={styles.timeleft}>
            {
              timeLeft > day &&
              <div>
                {Math.floor(timeLeft / day)}
                <div className={styles.progress}>
                  <div style={{ height: `${timeLeft % day / day * 100}px` }} />
                </div>
                <span style={{ background: `rgba(${highlight}, ${timeLeft % day / day})`}}>d</span>
              </div>
            }
            {
              timeLeft > hour &&
              <div>
                {pad(Math.floor(timeLeft % day / hour), timeLeft < day)}
                <div className={styles.progress}>
                  <div style={{ height: `${timeLeft % hour / hour * 100}px` }} />
                </div>
                <span style={{ background: `rgba(${highlight}, ${timeLeft % hour / hour})`}}>h</span>
              </div>
            }
            {
              timeLeft > min &&
              <div>
                {pad(Math.floor(timeLeft % hour / min), timeLeft < hour)}
                <div className={styles.progress}>
                  <div style={{ height: `${timeLeft % min / min * 100}px` }} />
                </div>
                <span style={{ background: `rgba(${highlight}, ${timeLeft % min / min})`}}>m</span>
              </div>
            }
            {
              <div>
                {pad(Math.floor(timeLeft % min / sec), timeLeft < min)}
                <div className={styles.progress}>
                  <div style={{ height: `${timeLeft % sec / sec * 100}px` }} />
                </div>
                <span style={{ background: `rgba(${highlight}, ${timeLeft % sec / sec})`}}>s</span>
              </div>
            }
            {
              timeLeft < 0 &&
              <div className={styles.ago}>
                <span> ago</span>
              </div>
            }
          </div>
          <div className={styles.below}>
            <h1>{date} {time}</h1>
            <p>{Math.floor(timeLeft / 10) * 10}ms</p>
            <p>{Math.floor(timeLeft / sec)}s</p>
            <p>{Math.floor(timeLeft / min)}m</p>
            <p>{Math.floor(timeLeft / hour).toFixed(1)}h</p>
            <p>{(timeLeft / day).toFixed(2)}d</p>
          </div>
        </div> :
        <h1>Enter a date</h1>
      }
    </div>
  );
}
