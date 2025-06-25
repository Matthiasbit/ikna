import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import * as React from "react";
import {useEffect, useState} from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from "@mui/material/Card";
import CloseIcon from '@mui/icons-material/Close';
import Header from "@/Components/Header";
import {Button, CircularProgress, Divider, Stack} from "@mui/material";
import {useSearchParams} from "next/navigation";
import {getCard} from "@/api/getCard";

export default function CreateCard() {

    const searchParams = useSearchParams();
    const questionIdParam = searchParams?.get("question");
    const questionId = questionIdParam ? parseInt(questionIdParam, 10) : undefined;
    const newCard = !questionId || isNaN(questionId);

    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [difficulty, setDifficulty] = useState<"leicht" | "mittel" | "schwer">("mittel");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (newCard || !questionId) return;
        setLoading(true);

        getCard(questionId)
            .then((data) => {
                setQuestion(data.question || "");
                setAnswer(data.answer || "");
                setDifficulty(data.difficulty || "mittel");
            })
            .catch((err) => {
                console.error("Fehler beim Laden der Karte:", err);
            })
            .finally(() => setLoading(false));
    }, [questionId]);


    const handleSave = async () => {
        const payload = {question, answer, difficulty, status: 0};

        try {
            if (newCard) {
                const response = await fetch("/api/createCard", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(payload),
                });
                const data = await response.json();
                console.log("Neue Karte erstellt: ", data);
            } else {
                const response = await fetch(`/api/updateCard/${questionId}`, {
                    method: "PUT",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(payload),
                });
                const data = await response.json();
                console.log("Karte aktualisiert: ", data);
            }
        } catch (e) {
            console.error("Fehler beim Speichern der Karte: ", e);
        }
    };

    const handleDelete = async () => {
        if (!questionId) return;
        try {
            const response = await fetch(`api/cards/deleteCard/${questionId}`, {
                method: "DELETE",
            });
            const data = await response.json();
            console.log("Karte gelöscht: ", data);
            window.location.href = "/ikna/createCard";
        } catch (e) {
            console.error("Fehler beim Löschen: ", e);
        }
    };

    const handleNext = async (questionID: number | undefined) => {
        if (!questionID && !newCard) return;

        await handleSave();
        window.location.href = "/ikna/createCard"
    }

    const handleClose = () => {
        setQuestion("")
        setAnswer("")
        window.location.href = "/ikna/createSet"
    }

    if (loading) {
        return <CircularProgress/>
    }

    return (
        <>
            <Header text="edit-card-page"/>
            <br/>
            <Card variant={'outlined'}
                  style={{
                      textAlign: 'center',
                      border: '1px solid black',
                      padding: '5vw',
                      paddingTop: '2vw'
                  }}>
                <Box style={{textAlign: 'right', cursor: "pointer", padding: "5px"}}> <CloseIcon onClick={handleClose}/>
                </Box>
                <Box>
                    <Card variant={'outlined'} style={{
                        border: '2px solid black',
                        minWidth: '10vw',
                        minHeight: '20vh',
                        alignContent: 'center'
                    }}>
                        <TextField
                            style={{width: "50%"}}
                            required
                            label='Question'
                            value={question}
                            onChange={(event) => setQuestion(event.target.value)}
                        />
                    </Card>
                    <Card variant='outlined' style={{
                        border: '2px solid black',
                        minWidth: '10vw',
                        minHeight: '20vh',
                        alignContent: 'center'
                    }}>
                        <TextField
                            style={{width: "50%"}}
                            required
                            label="Answer"
                            value={answer}
                            onChange={(event) => setAnswer(event.target.value)}
                        />
                    </Card>
                </Box>
                <Box style={{display: 'flex', justifyContent: 'center', border: '1px solid black'}}>
                    <Button style={{width: '33.33%', backgroundColor: 'lightgreen', height: '10vw', color: "black"}}
                            onClick={() => setDifficulty("leicht")}> easy</Button>
                    <Button style={{width: '33.33%', backgroundColor: 'yellow', height: '10vw', color: "black"}}
                            onClick={() => setDifficulty("mittel")}> middle</Button>
                    <Button style={{width: '33.33%', backgroundColor: 'coral', height: '10vw', color: "black"}}
                            onClick={() => setDifficulty("schwer")}> hard</Button>
                </Box>
                <br/>

                <Divider/>
                <Stack direction="row" spacing={2} style={{width: "100%"}}
                       justifyContent="space-between">
                    <Button style={{width: "25%"}}><DeleteForeverIcon
                        onClick={handleDelete}/></Button>
                    <Button onClick={handleSave} style={{width: "25%"}}> Save </Button>
                    <Button onClick={() => handleNext(undefined)} style={{width: "25%"}}> next
                        card</Button>
                </Stack>
            </Card>
        </>
    )
}
