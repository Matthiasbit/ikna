import {useEffect, useState} from "react";

export type QuestionArrayType = {
    id: number,
    question: string,
    answer: string,
    category?: string,
}

const exampleQuestion: QuestionArrayType[] = [
    {id: 1, question: 'question 1', answer: "123"},
    {id: 2, question: 'question 2', answer: "234"}
]

export function useGetQuestions() {
    const [data, setData] = useState(exampleQuestion)
    const [loading, setLoading] = useState(false)
    useEffect(() => {

          const fetchData = async () => {
            try {
                const response = await fetch('deine_api_url'); // API URL hier einfügen
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Fehler beim Abrufen der Daten:', error);
            } finally {
                setLoading(false); // Sobald die Daten geladen sind, loading auf false setzen
            }
        };
        fetchData();

    }, []);
    return {data, loading}
}
