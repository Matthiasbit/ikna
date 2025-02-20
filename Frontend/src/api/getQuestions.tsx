import {useEffect, useState} from "react";

export function useGetQuestions() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {

        // TODO: replace the content of useEffect
        // chatGPTs vorschlag, weil ich nicht wusste was in das useEffect rein sollte
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
        // chatGPT Ende
        //

    }, []);
    return {data, loading}
}
