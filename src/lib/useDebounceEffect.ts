import { DependencyList, useEffect } from 'react';

export function useDebounceEffect(fn: () => void, waitTime: number, deps: DependencyList) {
  useEffect(
    () => {
      const t = setTimeout(() => {
        // @ts-ignore
        return fn.apply(undefined, deps);
      }, waitTime);

      return () => {
        clearTimeout(t);
      };
    },
    deps as readonly any[],
  );
}
