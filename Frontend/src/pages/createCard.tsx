import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {useState, useEffect} from "react";
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from "@mui/material/Card";
import CloseIcon from '@mui/icons-material/Close';
import Header from "@/Components/Header";
import {Button, CircularProgress, Divider, Stack} from "@mui/material";
import {useGetQuestion} from "@/api/getQuestion";

export default function CreateCard() {

    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')

    const questionBackend = useGetQuestion();

    const cardId = questionBackend.data?.id;
    const newCard = cardId === undefined;

    const handleSave = async (questionID: number | undefined) => {
        const payload = {question, answer, difficulty, status: 0};

        try {
            if (newCard) {
                const response = await fetch("/api/cards/createCard", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(payload),
                });
                const data = await response.json();
                console.log("Neue Karte erstellt: ", data);
            } else {
                const response = await fetch(`/api/cards/updateCard/${questionID}`, {
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

    const handleDelete = async (questionID: number | undefined) => {
        if (!questionID) return;
        try {
            const response = await fetch(`api/cards/deleteCard/${questionID}`, {
                method: "DELETE",
            });
            const data = await response.json();
            console.log("Karte gelöscht: ", data);
            window.location.href = "/ikna/createCard";
        } catch (e) {
            console.error("Fehler beim Löschen: ", e);
        }
    };

    const [difficulty, setDifficulty] = useState<"leicht" | "mittel" | "schwer">("mittel");

    const handleNext = async (questionID: number | undefined) => {
        if (!questionID && !newCard) return;

        await handleSave(questionID);
        window.location.href = "/ikna/createCard"
    }


    if (questionBackend.data === undefined) {
        return <CircularProgress/>
    }
    ;


    useEffect(() => {
        if (!questionBackend.data || newCard) return;

        setQuestion(questionBackend.data.question);
        setAnswer(questionBackend.data.answer);
        setDifficulty(questionBackend.data.difficulty || "mittel");
    }, [questionBackend.data]);


    // console.log(question, answer) // TODO: API call an Backend

    const handleClose = () => {
        setQuestion("")
        setAnswer("")

        window.location.href = "/ikna/createSet"
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
                <Stack direction="row" spacing={2} key={questionBackend.data.id} style={{width: "100%"}}
                       justifyContent="space-between">
                    <Button style={{width: "25%"}}><DeleteForeverIcon
                        onClick={() => handleDelete(questionBackend.data?.id)}/></Button>
                    <Button onClick={() => handleSave(questionBackend.data?.id)} style={{width: "25%"}}> Save </Button>
                    <Button onClick={() => handleNext(questionBackend.data?.id)} style={{width: "25%"}}> next
                        card</Button>
                </Stack>
            </Card>
        </>
    )
}
