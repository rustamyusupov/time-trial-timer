import PropTypes from 'prop-types';
import cn from 'classnames';

import { Button } from '@/components/Button';

import css from './row.module.css';
import { useInterval } from '../../hooks';
import { useEffect, useState } from 'react';
import { formatTime, getSpeed } from './helpers';
import { hundredthOfMilliseconds } from '../../constants';

export const Row = ({
  active = false,
  className,
  distance,
  id,
  name,
  number,
  start = 0,
  stop = 0,
  onClick,
}) => {
  const [time, setTime] = useState(0);

  const formattedTime = formatTime(time);
  const speed = getSpeed(distance, time);

  useEffect(() => setTime(stop > 0 ? stop - start : 0), [stop, start]);
  useInterval(
    () => setTime(time + hundredthOfMilliseconds),
    active ? hundredthOfMilliseconds : null
  );

  const handleStart = id => () =>
    onClick({
      id,
      active: !active,
      start: active || start !== 0 ? start : 0,
      stop: active ? time : stop,
    });

  const handleReset = id => () => {
    setTime(0);
    onClick({
      id,
      active: false,
      start: 0,
      stop: 0,
    });
  };

  return (
    <tr className={cn(css.root, className)}>
      <td className={css.cell}>{number}</td>
      <td className={css.cell}>{name}</td>
      <td className={css.cell}>{formattedTime}</td>
      {speed ? <td className={css.cell}>{`${speed} км/ч`}</td> : null}
      {onClick ? (
        <>
          <td className={css.cell}>
            <Button
              className={css.button}
              disabled={Boolean(stop)}
              tabIndex={`${id + 1}`}
              onClick={handleStart(id)}
            >
              {active ? 'Стоп' : 'Старт'}
            </Button>
          </td>
          <td className={css.cell}>
            <Button className={css.button} tabIndex="-1" onClick={handleReset(id)}>
              Сброс
            </Button>
          </td>
        </>
      ) : null}
    </tr>
  );
};

Row.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  distance: PropTypes.number,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  start: PropTypes.number,
  stop: PropTypes.number,
  onClick: PropTypes.func,
};
