import PropTypes from 'prop-types';
import cn from 'classnames';

import { Button } from '@/components/Button';

import css from './row.module.css';
import { useInterval } from '../../hooks';
import { useEffect, useState } from 'react';
import { formatTime } from './helpers';

export const Row = ({
  active = false,
  className,
  id,
  name,
  number,
  start = 0,
  stop = 0,
  onClick,
}) => {
  const [time, setTime] = useState(0);

  useEffect(() => setTime(stop > 0 ? stop - start : 0), [stop, start]);
  useInterval(() => setTime(time + 10), active ? 10 : null);

  const handleStart = id => () =>
    onClick({
      id,
      active: !active,
      start: active || start !== 0 ? start : 0,
      stop: active ? time : stop,
    });

  const handleReset = id => () =>
    onClick({
      id,
      active: false,
      start: 0,
      stop: 0,
    });

  return (
    <tr className={cn(css.root, className)}>
      <td className={css.cell}>{number}</td>
      <td className={css.cell}>{name}</td>
      <td className={css.cell}>{formatTime(time)}</td>
      {onClick ? (
        <>
          <td className={css.cell}>
            <Button className={css.button} onClick={handleStart(id)}>
              {active ? 'Стоп' : 'Старт'}
            </Button>
          </td>
          <td className={css.cell}>
            <Button className={css.button} onClick={handleReset(id)}>
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
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  start: PropTypes.number,
  stop: PropTypes.number,
  onClick: PropTypes.func,
};
