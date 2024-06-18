import { useStorage } from '@/hooks';
import { Row } from '@/components/Row';

import css from './App.module.css';
import { getDistance, getParticipants, getResults, getTtResults } from './helpers';

export const App = () => {
  const [data, setData] = useStorage({ key: 'data', initialValue: [] });

  const distance = getDistance(data);
  const participants = getParticipants(data);
  const results = getResults(data);
  const ttResults = getTtResults(data);

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

  // TODO: separate table component

  return (
    <main className={css.root}>
      {data?.title ? (
        <div className={css.header}>
          <h1>{data?.title}</h1>
          {distance ? <p>&nbsp;&nbsp;–&nbsp;&nbsp;{distance} км</p> : null}
        </div>
      ) : null}
      {participants.length > 0 ? (
        <div className={css.tables}>
          <table>
            <tbody>
              {participants?.map(([key, item]) => (
                <Row key={key} id={key} {...item} onClick={handleClick} />
              ))}
            </tbody>
          </table>
          {results.length > 0 || ttResults.length > 0 ? (
            <div className={css.results}>
              {results.length > 0 ? (
                <table>
                  <tbody>
                    {results.map(([key, item]) => (
                      <Row
                        key={key}
                        className={css.resultRow}
                        distance={data?.distance}
                        id={key}
                        {...item}
                      />
                    ))}
                  </tbody>
                </table>
              ) : null}
              {ttResults.length > 0 ? (
                <table>
                  <caption>Раздельщики</caption>
                  <tbody>
                    {ttResults.map(([key, item]) => (
                      <Row
                        key={key}
                        className={css.resultRow}
                        distance={data?.distance}
                        id={key}
                        {...item}
                      />
                    ))}
                  </tbody>
                </table>
              ) : null}
            </div>
          ) : null}
        </div>
      ) : null}
      <input type="file" onChange={handleChange} />
    </main>
  );
};
