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
import { env } from 'process';

export default function CreateCard() {

    const questionBackend = useGetQuestion();

    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')

    useEffect(() => {
        if (questionBackend.data === undefined) {
            return
        }
        setQuestion(questionBackend.data.question)
        setAnswer(questionBackend.data.answer)
    }, [questionBackend.data])

    console.log(question, answer) // TODO: API call an Backend

    const handleClose =()=> {
        setQuestion("")
        setAnswer("")
        console.log(env.BASE_PATH)
        window.location.href= env.BASE_PATH ?? "" + "/createSet"
        //TODO: cancel edit and go one page back ??
    }
    const hanldeDelete = (questionID: number | undefined) => {
        if (questionID === undefined) {
            return
        }
        console.log("delete: " , questionID)
    }
    const handleSave = (questionID: number | undefined) => {
        if (questionID === undefined) {
            return
        }
        console.log("save: " , questionID, "in setID" )
    }
    const handleNext = (questionID: number | undefined) => {
        if (questionID === undefined) {
            return
        }
        handleSave(questionID)
        window.location.href = env.BASE_PATH ?? "" + "/createCard" // TODO: createNewID
        console.log("save:", questionID, "open new createCard")
    }

    if (questionBackend.data === undefined) {
        return <CircularProgress />
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
                <Box style={{textAlign: 'right', cursor: "pointer", padding: "5px"}}> <CloseIcon onClick={handleClose}/> </Box>
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
                    <Button style={{width: '33.33%', backgroundColor: 'lightgreen', height: '10vw', color: "black"}}> easy</Button>
                    <Button style={{width: '33.33%', backgroundColor: 'yellow', height: '10vw' , color: "black"}}> middle</Button>
                    <Button style={{width: '33.33%', backgroundColor: 'coral', height: '10vw', color: "black"}}> hard</Button>
                </Box>
                <br/>

                <Divider/>
                <Stack direction="row" spacing={2} key={questionBackend.data.id} style={{width: "100%"}} justifyContent="space-between">
                    <Button style={{width: "25%"}}><DeleteForeverIcon onClick={() => hanldeDelete(questionBackend.data?.id)}/></Button>
                    <Button onClick={() => handleSave(questionBackend.data?.id)} style={{width: "25%"}}> Save </Button>
                    <Button onClick={() => handleNext(questionBackend.data?.id)} style={{width: "25%"}}> next card</Button>
                </Stack>
            </Card>
        </>
    )
}
