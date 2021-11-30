import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

import { useEffect, useState } from 'react';

import styles from '../styles/Index.module.css';

// time constants
const sec = 1000;
const min = sec * 60;
const hour = min * 60;
const day = hour * 24;

const highlight = '0, 0, 0';

let audioctx;

export default function Index() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('00:00');
  const [timeLeft, setTimeLeft] = useState(undefined);
  const [muted, setMuted] = useState(true);

  function updateTimeLeft() {
    const end = new Date(`${date.replaceAll('-', '/')} ${time}`);
    setTimeLeft(end - new Date());
  }

  // initialize audio context
  useEffect(() => {
    audioctx = new (window.AudioContext || window.webkitAudioContext)();
  }, []);

  // plays sound of given frequency
  function playSound(frequency) {
    if (!ready() || muted) return;
    const osc = audioctx.createOscillator();
    osc.frequency.value = frequency;
    osc.connect(audioctx.destination);
    osc.start();
    osc.stop(audioctx.currentTime + 0.1);
  }

  // play second sound
  useEffect(() => {
    playSound(440);
  }, [Math.floor(Math.abs(timeLeft) % min / sec)]);

  // play minute sound
  useEffect(() => {
    playSound(540);
  }, [Math.floor(Math.abs(timeLeft) % hour / min)]);

  // play hour sound
  useEffect(() => {
    playSound(640);
  }, [Math.floor(Math.abs(timeLeft) % day / hour)]);

  // play day sound
  useEffect(() => {
    playSound(740);
  }, [Math.floor(Math.abs(timeLeft) / day)]);

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

  // returns whether time left ready
  function ready() {
    return timeLeft !== undefined && !isNaN(timeLeft);
  }

  return (
    <div className={styles.container}>
      <button
        className={styles.mutebutton}
        onClick={() => setMuted(!muted)}
      >
        {muted ? <VolumeOffIcon /> : <VolumeUpIcon />}
      </button>
      <div className={
        ready() ? styles.input : `${styles.input} ${styles.centered}`
      }>
        {!ready() && <h1>Enter a date</h1>}
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          placeholder="mm/dd/yyyy"
        />
        <input
          type="time"
          value={time}
          onChange={e => setTime(e.target.value)}
          placeholder="hh:mm"
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
              <h1>{date.replaceAll('-', '/')} {time}</h1>
              <p>{timeLeft}ms</p>
              <p>{(timeLeft / sec).toFixed(2)}s</p>
              <p>{(timeLeft / min).toFixed(2)}m</p>
              <p>{(timeLeft / hour).toFixed(2)}h</p>
              <p>{(timeLeft / day).toFixed(2)}d</p>
              <p>{(timeLeft / (day * 7)).toFixed(2)}w</p>
              <p>{(timeLeft / (day * 30)).toFixed(2)}M</p>
              <p>{(timeLeft / (day * 365)).toFixed(2)}y</p>
            </div>
          </>
        }
      </div>
    </div>
  );
}
