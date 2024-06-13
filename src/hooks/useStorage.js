import { useState } from 'react';

export const useStorage = ({ storage = localStorage, key, initialValue = {} }) => {
  const [storedValue, setStoredValue] = useState(() => {
    const item = storage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  const setValue = value => {
    setStoredValue(value);
    storage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue];
};
