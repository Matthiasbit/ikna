import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {useState, useEffect} from "react";
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from "@mui/material/Card";
import CloseIcon from '@mui/icons-material/Close';
import Header from "@/Components/Header";
import {Button, Chip, CircularProgress, Divider, Stack} from "@mui/material";
import {useGetQuestion} from "@/api/getQuestion";

export default function CreateCard() {

    const questionBackend = useGetQuestion();

    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [selectedChip, setSelectedChip] = useState<string | null>(null);


    useEffect(() => {
        if (questionBackend.data === undefined) {
            return
        }
        setQuestion(questionBackend.data.question)
        setAnswer(questionBackend.data.answer)
    }, [questionBackend.data])

    console.log(question, answer) // TODO: API call an Backend

    const handleClose = () => {
        setQuestion("")
        setAnswer("")

        window.location.href = "ikna/createSet"
        //TODO: cancel edit and go one page back ??
    }
    const hanldeDelete = (questionID: number | undefined) => {
        if (questionID === undefined) {
            return
        }
        console.log("delete: ", questionID)
    }
    const handleSave = (questionID: number | undefined) => {
        if (questionID === undefined) {
            return
        }
        console.log("save: ", questionID, "in setID")
    }
    const handleNext = (questionID: number | undefined) => {
        if (questionID === undefined) {
            return
        }
        handleSave(questionID)
        window.location.href = "/ikna/createCard"
        console.log("save:", questionID, "open new createCard")
    }

    function handleChipClick(chipLabel: string) {
        setSelectedChip(chipLabel);
    }

    if (questionBackend.data === undefined) {
        return <CircularProgress/>
    }

    return (
        <>
            <Header text="edit-card-page"/>

            <Box sx={{maxWidth: '90vw', margin: 'auto', paddingTop: '20px'}}>
                <Card sx={{
                    minHeight: '70vh',
                    borderRadius: '16px',
                    backgroundColor: '#E3F2FD',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '1vw'
                }}>
                    <Box style={{textAlign: 'right', cursor: "pointer", padding: "5px"}}> <CloseIcon
                        onClick={handleClose}/>
                    </Box>
                    <Box sx={{padding: "0vw", textAlign: 'center'}}>
                        <TextField
                            style={{
                                backgroundColor: "whitesmoke",
                                minWidth: '70%',
                                alignContent: 'center', margin: '10px'
                            }}
                            required
                            label='Question'
                            value={question}
                            onChange={(event) => setQuestion(event.target.value)}

                        />

                        <br/><br/>

                        <TextField
                            style={{
                                backgroundColor: "whitesmoke",
                                minWidth: '70%',
                                alignContent: 'center',
                                margin: '10px'
                            }}
                            required
                            label="Answer"
                            value={answer}
                            onChange={(event) => setAnswer(event.target.value)}
                        />
                    </Box>

                    <Stack direction="column" spacing={2} style={{padding: '10px'}}>
                        <Box sx={{display: 'flex', justifyContent: 'center', gap: '8px', padding: '8px'}}>
                            <Chip
                                label="Leicht"
                                variant="outlined"
                                sx={{
                                    width: '100%', backgroundColor: selectedChip === 'Leicht' ? 'lightblue' : 'inherit'
                                }}
                                clickable
                                onClick={() => handleChipClick('Leicht')}
                            />
                            <Chip
                                label="Mittel"
                                variant="outlined"
                                sx={{
                                    width: '100%', backgroundColor: selectedChip === 'Mittel' ? 'lightblue' : 'inherit'
                                }}
                                clickable
                                onClick={() => handleChipClick('Mittel')}
                            />
                            <Chip
                                label="Schwer"
                                variant="outlined"
                                sx={{
                                    width: '100%', backgroundColor: selectedChip === 'Schwer' ? 'lightblue' : 'inherit'
                                }}
                                clickable
                                onClick={() => handleChipClick('Schwer')}
                            />
                        </Box>

                        <Divider/>

                        <Box sx={{display: 'flex', justifyContent: 'center', gap: '16px', padding: '16px'}}>
                            <Button onClick={() => hanldeDelete(questionBackend.data?.id)}
                                    color="primary" variant="text" sx={{width: '100%'}}><DeleteForeverIcon/></Button>
                            <Button onClick={() => handleSave(questionBackend.data.id)}
                                    color="primary" variant="text" sx={{width: '100%'}}> Save </Button>
                            <Button onClick={() => handleNext(questionBackend.data?.id)}
                                    color="primary" variant="text" sx={{width: '100%'}}> next card </Button>
                        </Box>

                    </Stack>

                </Card>
            </Box>
        </>

    )
}
