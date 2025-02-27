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
  const [data, setData] = useState<Array<Sets>>([{name: "Test", id: "1", zero: 50, twentyfive: 100, fifty: 7, seventyfive: 14, hundred: 44},{name: "Test", id: "1", zero: 50, twentyfive: 100, fifty: 7, seventyfive: 14, hundred: 44},{name: "Test", id: "1", zero: 50, twentyfive: 100, fifty: 7, seventyfive: 14, hundred: 44},{name: "Test", id: "1", zero: 50, twentyfive: 100, fifty: 7, seventyfive: 14, hundred: 44},{name: "Test", id: "1", zero: 50, twentyfive: 100, fifty: 7, seventyfive: 14, hundred: 44},{name: "Test", id: "1", zero: 50, twentyfive: 100, fifty: 7, seventyfive: 14, hundred: 44},{name: "Test", id: "1", zero: 50, twentyfive: 100, fifty: 7, seventyfive: 14, hundred: 44},{name: "Test", id: "1", zero: 50, twentyfive: 100, fifty: 7, seventyfive: 14, hundred: 44},{name: "Test", id: "1", zero: 50, twentyfive: 100, fifty: 7, seventyfive: 14, hundred: 44},]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setData([]);
    setLoading(false);
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