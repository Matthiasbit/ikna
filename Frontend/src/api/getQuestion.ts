import {useEffect, useState} from "react";
import {CardType} from "@/api/getQuestions";


export function useGetQuestion() {
    const [data, setData] = useState<CardType>()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        window.fetch('http://localhost:80/getQuestion', {method: 'POST',  headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({id: 2})})
            .then(response => {
                if (!response.ok) {
                    throw new Error('Fehlerhafte Antwort vom Server');
                }
                return response.json(); // oder .text(), je nach Rückgabe
            })
            .then(data => {
                setData(data);
                setLoading(true);
            })
            .catch(error => {
                console.error('Fehler beim Senden der Anfrage:', error);
            });


    }, []);
    return {data, loading}
}
