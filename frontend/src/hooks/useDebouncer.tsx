import { useRef, useCallback } from 'react';

export const useDebouncer = (fn: Function, delay: number) => {
    const handler = useRef<NodeJS.Timeout | null>(null);

    const debouncedFn = useCallback(
        (...args: any[]) => {
            if (handler.current) {
                clearTimeout(handler.current);
            }


            handler.current = setTimeout(() => {
                fn(...args);
            }, delay);
        },
        [fn, delay]
    );

    return debouncedFn;
};
