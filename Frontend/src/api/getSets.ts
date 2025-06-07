import {useEffect, useState} from "react";

export type SetArrayType = {
    id: string;
    name: string;
    category?: string;
    zero: number;
    twentyfive: number;
    fifty: number;
    seventyfive: number;
    hundred: number;
    // cards: []; // ?
}

// noch erweitern was da alles drin steht


export function useGetSets() {
    const [data, setData] = useState<Array<SetArrayType>>(exampleSet);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setData(exampleSet);
        setLoading(false);
    }, []);

    return {data, loading}
}


const exampleSet: SetArrayType[] = [
    {
        name: "Test",
        id: "1",
        zero: 50,
        twentyfive: 100,
        fifty: 7,
        seventyfive: 14,
        hundred: 44
    }, {
        name: "Test",
        id: "1",
        zero: 50,
        twentyfive: 100,
        fifty: 7,
        seventyfive: 14,
        hundred: 44
    },
    {
        name: "Test",
        id: "1",
        zero: 50,
        twentyfive: 100,
        fifty: 7,
        seventyfive: 14,
        hundred: 44
    },
    {
        name: "Test",
        id: "1",
        zero: 50,
        twentyfive: 100,
        fifty: 7,
        seventyfive: 14,
        hundred: 44
    }
]