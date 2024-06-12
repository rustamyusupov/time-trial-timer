import { useState } from 'react';
import './App.css';

export const App = () => {
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount(count => count + 1)}>Count is {count}</button>;
};
