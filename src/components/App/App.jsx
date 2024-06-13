import { useState } from 'react';
import css from './App.module.css';

export const App = () => {
  const [data, setData] = useState('');

  const handleChange = e => {
    const fileReader = new FileReader();

    fileReader.readAsText(e.target.files[0], 'utf-8');
    fileReader.onload = e => setData(JSON.parse(e.target.result));
  };

  return (
    <main className={css.root}>
      <input type="file" onChange={handleChange} />
    </main>
  );
};
