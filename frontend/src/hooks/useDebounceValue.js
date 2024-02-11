import { useEffect, useState } from "react";

export function useDebounceValue(input, debounceTime) {
  let [debounceValue, setDebounceValue] = useState(input);

  useEffect(() => {
    let timeout = setTimeout(() => {
      setDebounceValue(input);
    }, debounceTime);

    return () => {
      clearTimeout(timeout);
    };
  }, [input, debounceTime]);

  return debounceValue;
}
