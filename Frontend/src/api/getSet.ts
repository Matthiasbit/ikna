import { useEffect, useState } from "react";
import {SetArrayType} from "./getSets";

export function useGetSet() {
  const [data, setData] = useState<SetArrayType>({id: "0", name: "lala", category: "category1", zero: 1, fifty: 1,seventyfive: 1,twentyfive: 1,hundred: 1 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.fetch('http://localhost:80/getSets', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({id: 2})})
        .then(response => {
          if(!response.ok){
            throw new Error('Bad response from server');
          }
          return response.json();
        })
        .then(data => {
          setData(data);
          setLoading(true);
        })
        .catch(error => {
          console.error('Failed to send the request: ', error);
        })
  }, []);

  return { data, loading };

}