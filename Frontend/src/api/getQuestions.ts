import {useEffect, useState} from "react";

export type QuestionArrayType = {
    id: number,
    question: string,
    answer: string,
    category?: string,
}

const exampleQuestion: QuestionArrayType[] = [
    {id: 1, question: 'question 1', answer: "123"},
    {id: 2, question: 'question 2', answer: "234"}
]

export function useGetQuestions() {
    const [data, setData] = useState(exampleQuestion)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setData(exampleQuestion);
        setLoading(false);

    }, []);
    return {data, loading}
}
