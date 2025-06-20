import { useEffect, useState } from "react";

export type Sets = {
    id: string;
    name: string;
    category?: string;
    zero: number;
    twentyfive: number;
    fifty: number;
    seventyfive: number;
    hundred: number;
}
// noch erweitern was da alles drin steht

export function useGetSets() {
  const [data, setData] = useState<Array<Sets>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_BASE_URL! + "/Sets", {method: 'GET',  headers: { 'Content-Type': 'application/json', 'authorization' : "Bearer " + sessionStorage.getItem('token') || "Bearer " + '' }})
        .then(response => {
            if (!response.ok) {
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
  return { data, loading };
}