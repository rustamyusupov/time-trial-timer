import PropTypes from 'prop-types';

import { Button } from '@/components/Button';

import css from './row.module.css';
import { useInterval } from '../../hooks';
import { useEffect, useState } from 'react';
import { formatTime } from './helpers';

export const Row = ({ active = false, id, name, number, start = 0, stop = 0, onClick }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    setTime(stop > 0 ? stop - start : 0);
  }, [stop, start]);

  useInterval(
    () => {
      setTime(time + 100);
    },
    active ? 100 : null
  );

  const handleStart = id => () => {
    onClick({
      id,
      active: !active,
      start: active || start !== 0 ? start : 0,
      stop: active ? time : stop,
    });
  };

  const handleReset = id => () =>
    onClick({
      id,
      active: false,
      start: 0,
      stop: 0,
    });

  return (
    <tr className={css.root}>
      <td className={css.cell}>{number}</td>
      <td className={css.cell}>{name}</td>
      <td className={css.cell}>{formatTime(time)}</td>
      <td className={css.cell}>
        <Button onClick={handleStart(id)}>{active ? 'Stop' : 'Start'}</Button>
      </td>
      <td className={css.cell}>
        <Button onClick={handleReset(id)}>Reset</Button>
      </td>
    </tr>
  );
};

Row.propTypes = {
  active: PropTypes.bool,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  start: PropTypes.number,
  stop: PropTypes.number,
  onClick: PropTypes.func.isRequired,
};
