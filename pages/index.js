import { useState } from 'react';

import styles from '../styles/Index.module.css';

export default function Index() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  return (
    <div>
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
      <h1>{date} {time}</h1>
    </div>
  );
}
