import {useEffect, useState} from "react";
import {QuestionArrayType} from "@/api/getQuestions";


export function useGetQuestion() {
    const [data, setData] = useState<QuestionArrayType>({id: 2, question: 'question 2', answer: "123"})
    const [loading, setLoading] = useState(false)
    useEffect(() => {

        setData({id: 2, question: 'question 2', answer: "123"});
        setLoading(false);

    }, []);
    return {data, loading}
}
