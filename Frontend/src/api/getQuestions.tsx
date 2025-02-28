import { useEffect, useState } from 'react'

type Question = {
    id: number
    question: string
    answer: string
    category: string
    difficulty: string
}

export function useGetQuestion() {
    const [questionsArray, setQuestionsArray] = useState<Question>();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setQuestionsArray({question: "Test Question", answer: "Answer is cool", category: "Test Category", difficulty: "easy", id: 1});
        setLoading(false);
    }, []);
    /*useEffect(() => {
        fetch('http://localhost:8080/api/questions')
            .then(response => response.json())
            .then(data => setQuestionsArray(data))
    }, [])*/
    return {data: questionsArray, loading};
}