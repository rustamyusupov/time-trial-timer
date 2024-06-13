import { useStorage } from '@/hooks';
import { Button } from '@/components/Button';

import css from './App.module.css';

export const App = () => {
  const [data, setData] = useStorage({ key: 'data', initialValue: [] });

  const handleChange = e => {
    const fileReader = new FileReader();

    fileReader.readAsText(e.target.files[0], 'utf-8');
    fileReader.onload = e => setData(JSON.parse(e.target.result));
  };

  return (
    <main className={css.root}>
      <input className={css.input} type="file" onChange={handleChange} />
      <table className={css.table}>
        {data?.map(({ number, name }) => (
          <tr key={number} className={css.row}>
            <td className={css.cell}>{number}</td>
            <td className={css.cell}>{name}</td>
            <td className={css.cell}>
              <Button>Start</Button>
            </td>
            <td className={css.cell}>
              <Button>Reset</Button>
            </td>
          </tr>
        ))}
      </table>
    </main>
  );
};
