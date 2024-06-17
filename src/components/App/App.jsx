import { useStorage } from '@/hooks';
import { Row } from '@/components/Row';

import css from './App.module.css';

export const App = () => {
  const [data, setData] = useStorage({ key: 'data', initialValue: [] });

  const participants = Object.entries(data?.participants ?? {});
  const results = Object.entries(data?.participants ?? {})
    ?.filter(([, item]) => !item.active && item.stop > 0)
    .sort(([, a], [, b]) => a.stop - b.stop);

  const handleChange = e => {
    const fileReader = new FileReader();

    fileReader.readAsText(e.target.files[0], 'utf-8');
    fileReader.onload = e => setData(JSON.parse(e.target.result));
  };

  const handleClick = ({ id, active, start, stop }) => {
    setData({
      ...data,
      participants: {
        ...data.participants,
        [id]: {
          ...data.participants[id],
          active,
          start,
          stop,
        },
      },
    });
  };

  return (
    <main className={css.root}>
      <h1 className={css.title}>{data?.title}</h1>
      <input className={css.input} type="file" onChange={handleChange} />
      <div className={css.tables}>
        <table>
          <tbody>
            {participants?.map(([key, item]) => (
              <Row key={key} id={key} {...item} onClick={handleClick} />
            ))}
          </tbody>
        </table>
        <table>
          <tbody>
            {results.map(([key, item]) => (
              <Row key={key} className={css.resultRow} id={key} {...item} />
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};
