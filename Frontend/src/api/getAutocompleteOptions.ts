import { useState, useEffect } from "react";

export function useGetAutocompleteOptions() {

    const [data, setData] = useState<Array<string>>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_API_BASE_URL! + "/user", {method: 'GET',  headers: { 'Content-Type': 'application/json', 'authorization' : "Bearer " + sessionStorage.getItem('token') || "Bearer " + '' }})
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            }).then(data => {
                setData(data);
                setLoading(false);
            }).catch(error => {
                console.error('Fehler beim Senden der Anfrage:', error);
            });
    }, []);

    return { data, loading };
}