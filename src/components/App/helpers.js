import { metersInKilometer } from '@/constants';

export const getDistance = data => (data?.distance > 0 ? data?.distance / metersInKilometer : null);

export const getParticipants = data => Object.entries(data?.participants ?? {});

const getSortedResult = data => getParticipants(data).sort(([, a], [, b]) => a.stop - b.stop);

export const getResults = data =>
  getSortedResult(data)?.filter(([, { active, tt, stop }]) => !active && !tt && stop > 0);

export const getTtResults = data =>
  getSortedResult(data)?.filter(([, { active, tt, stop }]) => !active && tt && stop > 0);
