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
import createCard from "@/api/createCard";
import updateCard from "@/api/updateCard";
import deleteCard from "@/api/deleteCard";

export default function CreateCard() {

    const searchParams = useSearchParams();
    const questionIdParam = searchParams?.get("question");
    const questionId = questionIdParam ? parseInt(questionIdParam, 10) : undefined;
    const newCard = !questionId || isNaN(questionId);

    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [difficulty, setDifficulty] = useState<"leicht" | "mittel" | "schwer">("mittel");
    const [loading, setLoading] = useState(false);

    const setIdParam = searchParams?.get("setId");
    const setId = setIdParam ? parseInt(setIdParam, 10) : undefined;


    useEffect(() => {
        if (newCard || !questionId || isNaN(questionId)) return;
        setLoading(true);

        getCard(questionId)
            .then((data) => {
                setQuestion(data?.question ?? "");
                setAnswer(data?.answer ?? "");
                setDifficulty(data?.difficulty ?? "mittel");
            })
            .catch((err) => {
                console.error("Fehler beim Laden der Karte:", err);
            })
            .finally(() => setLoading(false));
    }, [questionId, newCard]);


    const handleSave = async (redirect: boolean = true) => {
        if (!question || !answer) {
            alert("Bitte sowohl Frage als auch Antwort eingeben.");
            return;
        }


        try {
            if (!questionId || isNaN(questionId)) {
                if (!setId) {
                    alert("Kein Set ausgewählt – setId fehlt!");
                    return;
                }
                await createCard({question, answer, difficulty, setId});
            } else {
                await updateCard({id: questionId, set: setId!, question, answer, difficulty, status: 0});
            }

            if (redirect) {
                window.location.href = `createSet?setId=${setId}`;
            }
        } catch (err) {
            console.error("Fehler beim Speichern der Karte:", err);
            alert("Fehler beim Speichern.");
        }


    };

    const handleDelete = async () => {
        if (!questionId || !setId) return;

        const confirmDelete = window.confirm("Willst du diese Karte wirkich löschen?");
        if(!confirmDelete) return;

        try {
            await deleteCard(questionId)

            window.location.href = `createSet?setId=${setId}`;
        } catch (e) {
            console.error("Fehler beim Löschen: ", e);
        }
    };

    const handleNext = async () => {

        await handleSave(false);

        if (!setId) {
            alert("Kein Set ausgewählt - setId fehlt!")
            return;
        }
        try {
            const response = await createCard({
                question: "", answer: "", difficulty: "mittel", setId
            });
            const newCardId = response?.card?.id;
            if (newCardId) {
                window.location.href = `createCard?setId=${setId}&question=${newCardId}`;
            } else {
                alert("Fehler beim Erstellen der neuen Karte.");
            }
        } catch (err) {
            console.error("Fehler beim Erstellen der neuen Karte: ", err);
            alert("Fehler beim Erstellen der neuen Karte.");
        }
    };

    const handleClose = () => {
        if (setId) {
            window.location.href = `createSet?setId=${setId}`;
        }
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
                    <Button onClick={() => handleSave(true)} style={{width: "25%"}}> Save </Button>
                    <Button onClick={handleNext} style={{width: "25%"}}> next
                        card</Button>
                </Stack>
            </Card>
        </>
    )
}
