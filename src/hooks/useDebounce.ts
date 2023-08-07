import { useEffect, useState } from "react";

export default function useDebounce(value: string, delay: number) {

    const [debounseValue, setDebounseValue] = useState(value);

    useEffect(() => {
        const hendler = setTimeout(() => {
            setDebounseValue(value);
        }, delay);
        return () => {
            clearTimeout(hendler);;
        };
    }, [value, delay]);

    return debounseValue;
}