import { useStorage } from '@/hooks';
import { Row } from '@/components/Row';

import css from './App.module.css';

export const App = () => {
  const [data, setData] = useStorage({ key: 'data', initialValue: [] });

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
      <table>
        <tbody>
          {Object.entries(data?.participants ?? {})?.map(([key, item]) => (
            <Row key={key} id={key} {...item} onClick={handleClick} />
          ))}
        </tbody>
      </table>
    </main>
  );
};
