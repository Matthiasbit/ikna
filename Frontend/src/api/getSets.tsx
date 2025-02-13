import { useEffect, useState } from "react";

export type Sets = {
    name: string;
}
// noch erweitern was da alles drin steht

export function useGetSets() {
  const [data, setData] = useState<Array<Sets>>([{name: "lala"}]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  setData([{name: "lala"}]);
  setLoading(false)
  }, []);

 /* useEffect(() => {
    fetch("/api/sets")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [setData]); */

  return { data, loading };
}