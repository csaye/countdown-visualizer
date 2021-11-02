import { useEffect, useState } from 'react';

import styles from '../styles/Index.module.css';

// time constants
const sec = 1000;
const min = sec * 60;
const hour = min * 60;
const day = hour * 24;

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

  function TimeLeft() {
    return (
      <div className={styles.timeleft}>
        {
          timeLeft >= 0 ?
          <>
            {timeLeft > day && <>{Math.floor(timeLeft / day)}<span>d</span></>}
            {timeLeft > hour && <>{Math.floor(timeLeft % day / hour)}<span>h</span></>}
            {timeLeft > min && <>{Math.floor(timeLeft % day % hour / min)}<span>m</span></>}
            {Math.floor(timeLeft % day % hour % min / sec)}<span>s</span>
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
    );
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
        date &&
        <div className={styles.center}>
          <TimeLeft />
          <div className={styles.below}>
            <h1>{date} {time}</h1>
            <p>{Math.floor(timeLeft / 100) * 100}ms</p>
            <p>{Math.floor(timeLeft / sec)}s</p>
            <p>{Math.floor(timeLeft / min)}m</p>
            <p>{Math.floor(timeLeft / hour).toFixed(1)}h</p>
            <p>{(timeLeft / day).toFixed(2)}d</p>
          </div>
        </div>
      }
    </div>
  );
}
