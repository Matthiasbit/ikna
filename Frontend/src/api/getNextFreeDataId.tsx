import {useState, useEffect} from "react";

export function useGetNextFreeDataId() {
    const [data, setData] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setData(0);
        setLoading(false);
    }, []);

    return { data, loading };
}