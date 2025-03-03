import {useEffect, useState} from "react";
import {QuestionArrayType} from "@/api/getQuestions";


export function useGetQuestion() {
    const [data, setData] = useState<QuestionArrayType>({id: 2, question: 'question 2', answer: "123"})
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
