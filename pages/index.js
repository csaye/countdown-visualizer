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

  // returns text color for given value
  function getColor(val) {
    if (val > 0.5) return 'white';
    return 'black';
  }

  // returns whether time left ready
  function ready() {
    return timeLeft !== undefined && !isNaN(timeLeft);
  }

  return (
    <div className={styles.container}>
      <div className={
        ready() ? styles.input : `${styles.input} ${styles.centered}`
      }>
        {!ready() && <h1>Enter a date</h1>}
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
      <div className={
        ready() ?
        styles.center : `${styles.center} ${styles.hidden}`
      }>
        {
          ready() &&
          <>
            <div className={styles.timeleft}>
              {
                Math.abs(timeLeft) > day &&
                <div>
                  {Math.floor(Math.abs(timeLeft) / day)}
                  <div className={styles.progress}>
                    <div style={{ height: `${Math.abs(timeLeft) % day / day * 100}px` }} />
                  </div>
                  <span style={{
                    background: `rgba(${highlight}, ${Math.abs(timeLeft) % day / day})`,
                    color: getColor(Math.abs(timeLeft) % day / day)
                  }}>d</span>
                </div>
              }
              {
                Math.abs(timeLeft) > hour &&
                <div>
                  {pad(Math.floor(Math.abs(timeLeft) % day / hour), Math.abs(timeLeft) < day)}
                  <div className={styles.progress}>
                    <div style={{ height: `${Math.abs(timeLeft) % hour / hour * 100}px` }} />
                  </div>
                  <span style={{
                    background: `rgba(${highlight}, ${Math.abs(timeLeft) % hour / hour})`,
                    color: getColor(Math.abs(timeLeft) % hour / hour)
                  }}>h</span>
                </div>
              }
              {
                Math.abs(timeLeft) > min &&
                <div>
                  {pad(Math.floor(Math.abs(timeLeft) % hour / min), Math.abs(timeLeft) < hour)}
                  <div className={styles.progress}>
                    <div style={{ height: `${Math.abs(timeLeft) % min / min * 100}px` }} />
                  </div>
                  <span style={{
                    background: `rgba(${highlight}, ${Math.abs(timeLeft) % min / min})`,
                    color: getColor(Math.abs(timeLeft) % min / min)
                  }}>m</span>
                </div>
              }
              {
                <div>
                  {pad(Math.floor(Math.abs(timeLeft) % min / sec), Math.abs(timeLeft) < min)}
                  <div className={styles.progress}>
                    <div style={{ height: `${Math.abs(timeLeft) % sec / sec * 100}px` }} />
                  </div>
                  <span style={{
                    background: `rgba(${highlight}, ${Math.abs(timeLeft) % sec / sec})`,
                    color: getColor(Math.abs(timeLeft) % sec / sec)
                  }}>s</span>
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
              <p>{(timeLeft / sec).toFixed(2)}s</p>
              <p>{(timeLeft / min).toFixed(2)}m</p>
              <p>{(timeLeft / hour).toFixed(2)}h</p>
              <p>{(timeLeft / day).toFixed(2)}d</p>
            </div>
          </>
        }
      </div>
    </div>
  );
}
