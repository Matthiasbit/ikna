import {useEffect, useState} from "react";

export type Sets = {
    id: number;
    name: string;
    kategorie?: string;
    zero: number;
    twentyfive: number;
    fifty: number;
    seventyfive: number;
    hundred: number;
}

export function useGetSets() {
    const [data, setData] = useState<Array<Sets>>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {


        const token = sessionStorage.getItem("token");
        if (!token) {
            window.location.href = "/ikna/loginpage";
            return;
        }

        fetch(process.env.NEXT_PUBLIC_API_BASE_URL! + "/sets", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                if (!response.ok) {
                    if (response.status === 401) {
                        window.location.href = 'ikna/loginpage';
                    }
                    throw new Error('Fehlerhafte Antwort vom Server');
                }
                return response.json();
            }).then(data => {
            setData(data);
            setLoading(false);
        }).catch(error => {
            console.error('Fehler beim Senden der Anfrage:', error);
        });
    }, []);
    return {data, loading};
}