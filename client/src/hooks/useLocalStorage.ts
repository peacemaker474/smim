import { Dispatch, SetStateAction, useCallback, useState } from 'react';

type SetValue<T> = Dispatch<SetStateAction<T>>;

function parseJSON <T> (value: string | null): T | undefined {
  try {
    return value === 'undefined' ? undefined : JSON.parse(value ?? '');
  } catch {
    console.log(value);
    return undefined;
  }
}

function useLocalStorage <T>(key: string, initialValue: T): [T, SetValue<T>] {
  const readValue = useCallback(() : T => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? (parseJSON(item) as T) : initialValue;
    } catch (err) {
      console.log(err);
      return initialValue;
    }
  }, [initialValue, key]);

  const [storedValue, setStoredValue] = useState<T>(readValue);

  const setValue: SetValue<T> = value => {
    if (typeof window === 'undefined') {
      console.log(value);
    }

    try {
      const newValue = value instanceof Function ? value(storedValue) : value;

      window.localStorage.setItem(key, JSON.stringify(newValue));

      setStoredValue(newValue);
    } catch (err) {
      console.log(err);
    }
  }

  return [storedValue, setValue];
}

export default useLocalStorage;