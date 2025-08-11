import { useState, useEffect } from "react";

/**
 * Debounces a value by the specified delay.
 * @param value The value to debounce
 * @param delay Delay in milliseconds (default 300)
 * @returns Debounced value
 */
export function useDebounce<T>(value: T, delay = 300): T {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);

        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
}
