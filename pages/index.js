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
    const interval = setInterval(updateTimeLeft, 100);
    return () => clearInterval(interval);
  }, [date, time]);

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
              timeLeft >= 0 ?
              <>
                {
                  timeLeft > day &&
                  <div>
                    {Math.floor(timeLeft / day)}
                    <div style={{ height: `${timeLeft % day / day * 100}px` }} />
                    <span style={{ background: `rgba(${highlight}, ${timeLeft % day / day})`}}>d</span>
                  </div>
                }
                {
                  timeLeft > hour &&
                  <div>
                    {Math.floor(timeLeft % day / hour)}
                    <div style={{ height: `${timeLeft % hour / hour * 100}px` }} />
                    <span style={{ background: `rgba(${highlight}, ${timeLeft % hour / hour})`}}>h</span>
                  </div>
                }
                {
                  timeLeft > min &&
                  <div>
                    {Math.floor(timeLeft % day % hour / min)}
                    <div style={{ height: `${timeLeft % min / min * 100}px` }} />
                    <span style={{ background: `rgba(${highlight}, ${timeLeft % min / min})`}}>m</span>
                  </div>
                }
                <div>
                  {Math.floor(timeLeft % day % hour % min / sec)}
                  <div style={{ height: `${timeLeft % sec / sec * 100}px` }} />
                  <span style={{ background: `rgba(${highlight}, ${timeLeft % sec / sec})`}}>s</span>
                </div>
              </> :
              <>
                {-timeLeft > day && <>{Math.floor(-timeLeft / day)}<span>d</span></>}
                {-timeLeft > hour && <>{Math.floor(-timeLeft % day / hour)}<span>h</span></>}
                {-timeLeft > min && <>{Math.floor(-timeLeft % day % hour / min)}<span>m</span></>}
                {Math.floor(-timeLeft % day % hour % min / sec)}<span>s</span>
                <span> ago</span>
              </>
            }
          </div>
          <div className={styles.below}>
            <h1>{date} {time}</h1>
            <p>{Math.floor(timeLeft / 100) * 100}ms</p>
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
