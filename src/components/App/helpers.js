import { metersInKilometer } from '@/constants';

export const getDistance = data => (data?.distance > 0 ? data?.distance / metersInKilometer : null);

const prepare = data =>
  [...(data?.participants || [])]
    ?.sort((a, b) => a.stop - b.stop)
    .filter(({ active, stop }) => !active && stop > 0);

export const getResults = data => prepare(data).filter(({ tt }) => !tt);
export const getTtResults = data => prepare(data).filter(({ tt }) => tt);
