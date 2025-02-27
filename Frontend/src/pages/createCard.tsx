import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {useState} from "react";
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from "@mui/material/Card";
import CloseIcon from '@mui/icons-material/Close';
import Header from "@/Components/Header";
import {Button, Divider, Stack} from "@mui/material";

export default function CreateCard() {

    const questionsArray = useGetQuestions();

    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')

    console.log(question, answer) // TODO: API call an Backend

    const handleClose =()=> {
        setQuestion("")
        setAnswer("")
        window.location.href="/createSet"
        //TODO: cancel edit and go one page back ??
    }
    const hanldeDelete = (questionID: number) => {
        console.log("delete: " , questionID)
    }
    const handleSave = (questionID: number) => {
        console.log("save: " , questionID, "in setID" )
    }
    const handleNext = (questionID: number) => {
        handleSave(questionID)
        window.location.href = "/createCard" // TODO: createNewID
        console.log("save:", questionID, "open new createCard")
    }

    return (
        <>
            <Header text="edit-card-page"/>
            <br/>
            <Card variant={'outlined'}
                  style={{
                      textAlign: 'center',
                      border: '1px solid black',
                      margin: '10vw',
                      padding: '5vw',
                      paddingTop: '2vw'
                  }}>
                <Box style={{textAlign: 'right'}}> <CloseIcon onClick={handleClose}/> </Box>
                <Box component="form"
                     sx={{'& .MuiTextField-root': {m: 1, width: '25ch'}}}
                     noValidate
                     autoComplete="off">
                    <Card variant={'outlined'} style={{
                        border: '2px solid black',
                        minWidth: '10vw',
                        minHeight: '20vh',
                        alignContent: 'center'
                    }}>
                        <TextField
                            required
                            id="outlined-required"
                            label={'question'}
                            value={question}
                            onChange={(event) => setQuestion(event.target.value)}
                        />
                    </Card>
                    <Card variant={'outlined'} style={{
                        border: '2px solid black',
                        minWidth: '10vw',
                        minHeight: '20vh',
                        alignContent: 'center'
                    }}>
                        <TextField
                            required
                            id="outlined-required"
                            label="answer"
                            value={answer}
                            onChange={(event) => setAnswer(event.target.value)}
                        />
                    </Card>
                </Box>
                <Box style={{display: 'flex', justifyContent: 'center', border: '1px solid black'}}>
                    <Button style={{width: '33.33%', backgroundColor: 'lightgreen', height: '10vw'}}> easy</Button>
                    <Button style={{width: '33.33%', backgroundColor: 'lightyellow', height: '10vw'}}> middle</Button>
                    <Button style={{width: '33.33%', backgroundColor: 'lightcoral', height: '10vw'}}> hard</Button>
                </Box>
                <br/>

                <Divider/>

                {questionsArray.data.flatMap((question) => {
                    return (
                        <Stack style={{display: 'flex', justifyContent: 'flex-end'  /*,border: '1px solid black'*/}}>
                            <Stack style={{display: 'flex'}}>
                                <Button><DeleteForeverIcon onClick={() => hanldeDelete(question.questionId)}/></Button>

                            </Stack>
                            <Stack style={{display: 'flex'}}>
                                <Button onClick={() => handleSave(question.questionId)}> save </Button>

                                <Button onClick={() => handleNext(question.questionId)}> next card</Button>

                            </Stack>
                        </Stack>

                    )
                })

                }
            </Card>
        </>
    )
}
