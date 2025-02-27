import {useEffect, useState} from "react";

export type QuestionArrayType = {
    questionID: number,
    questionText: string,
    category?: string,
}

const exampleQuestion: QuestionArrayType[] = [
    {questionID: 1, questionText: 'question 1'},
    {questionID: 2, questionText: 'question 2'}
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
