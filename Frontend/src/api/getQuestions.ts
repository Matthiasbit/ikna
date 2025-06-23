import {useEffect, useState} from "react";
import { useQuery } from "@tanstack/react-query";

export type CardType = {
    id: number,
    question: string,
    answer: string,
    difficulty: string,
    status: number,
    set?: number,
    lastreview?: string;
}

export function useGetQuestions(userId: number) {
  return useQuery<CardType[]>({
      queryKey: ["cards, userId"],
      queryFn: async ()=> {
          const res = await fetch(`api/cards/getCards?userId=${userId}`);
          if(!res.ok) throw new Error("Fehler beim Laden der Karten");
          return res.json();
      }
  });

   /* const [loading, setLoading] = useState(false)
    useEffect(() => {
        setData(exampleQuestion);
        setLoading(false);

    }, []);
    return {data, loading}

    */
}
