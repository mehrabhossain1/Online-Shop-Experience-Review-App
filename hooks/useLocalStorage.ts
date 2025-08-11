import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
    const [value, setValue] = useState<T>(initialValue);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem(key);
        if (stored) {
            setValue(JSON.parse(stored));
        }
        setLoading(false);
    }, [key]);

    useEffect(() => {
        if (!loading) {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }, [key, value, loading]);

    return [value, setValue, loading] as const;
}
