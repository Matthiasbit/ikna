import { useEffect, useState } from "react";
import type { Options } from "@/Components/SettingsDialog";


export function useGetSettings() {
  const [data, setData] = useState<Options>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_BASE_URL! + "/Settings", {method: 'GET',  headers: { 'Content-Type': 'application/json', 'authorization' : "Bearer " + sessionStorage.getItem('token') || "Bearer " + '' }})
        .then(response => {
            if (!response.ok) {
                throw new Error('Fehlerhafte Antwort vom Server');
            }
            return response.json();
        }).then(data => {
            const options: Options = {
                lernmethode: data.lernmethode,
                easy: data.easy,
                medium: data.medium,
                hard: data.hard,
                shareSets: false,
                shareStats: false,
            };
            setData(options);
            setLoading(false);
        }).catch(error => {
            console.error('Fehler beim Senden der Anfrage:', error);
        });
    }, []);
  return { data, loading };
}