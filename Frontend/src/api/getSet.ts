import { useEffect, useState } from "react";
import { Sets } from "./getSets";

export function useGetSet() {
  const [data, setData] = useState<Sets>({id: "0", name: "lala", category: "category1", zero: 1, fifty: 1,seventyfive: 1,twentyfive: 1,hundred: 1 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  setData({id: "0", name: "lala", category: "category1", zero: 1, fifty: 1,seventyfive: 1,twentyfive: 1,hundred: 1 });
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