import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {ChangeEvent, useState} from "react";
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from "@mui/material/Card";
import CloseIcon from '@mui/icons-material/Close';
import Header from "@/Components/Header";



const Body = () => {
    const [questionValue, setQuestionValue] = useState('')
    // const [question, setQuestion] = useState('')
    const [answerValue, setAnswerValue] = useState('')
    // const [answer, setAnswer] = useState('')

    const getQuestion = (event: ChangeEvent<HTMLInputElement>) => {
        setQuestionValue(event.target.value)
    }
    const getAnswer = (event: ChangeEvent<HTMLInputElement>) => {
        setAnswerValue(event.target.value)
    }
    /* const handleSave = () => {
         // setQuestion(questionValue)
         // setAnswer(answerValue)
         setQuestionValue('')
         setAnswerValue('')
     }*/

    return (
        <>
            <Header text="Bearbeitung" />
            <Box component="form"
                 sx={{'& .MuiTextField-root': {m: 1, width: '25ch'}}}
                 noValidate
                 autoComplete="off">
                <div>
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
                            value={questionValue}
                            onChange={getQuestion}
                        />
                    </Card>
                </div>
                <div>
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
                            value={answerValue}
                            onChange={getAnswer}
                        />
                    </Card>
                </div>
            </Box>
            {/* TODO: possibility of categorising */}

            <Box style={{display: 'flex', justifyContent: 'center', border: '1px solid black'}}>
                <button style={{width: '33.33%', backgroundColor: 'lightgreen', height: '10vw'}}> easy</button>
                <button style={{width: '33.33%', backgroundColor: 'lightyellow', height: '10vw'}}> middle</button>
                <button style={{width: '33.33%', backgroundColor: 'lightcoral', height: '10vw'}}> hard</button>
            </Box>
            <br/>
            {/*
             TODO: delete this save button and the answers (was just to check if it works)
            <button onClick={handleSave}> Save</button>
             save mot to show the input but so save the whole card
            <p> saved question: {question} </p>
            <p> saved answer: {answer} </p>
*/}
        </>
    )
}

const Bottom = () => {
    return (
        <div style={{display: 'flex', justifyContent: 'flex-end'  /*,border: '1px solid black'*/}}>
            <div style={{display: 'flex'}}>
                <button><DeleteForeverIcon/></button>
                {/*TODO: delete card from set*/}{/*TODO: ask question if sure to delete??*/}
            </div>
            <div style={{display: 'flex'}}>
                <button> save</button>
                {/*TODO: setQuestionValue(''), setAnswerValue(''), saveCardInSet*/}
                <button> next card</button>
                {/*TODO: saveCardInSet + opens new empty form */}
            </div>
        </div>
    )
}


const CreateCard = () => {
    return (
        <div style={{textAlign: 'center'}}>
            <br/>

            <hr/>
            <Card variant={'outlined'}
                  style={{border: '1px solid black', margin: '10vw', padding: '5vw', paddingTop: '2vw'}}>
                <Box style={{textAlign: 'right'}}> <CloseIcon/> </Box>
                <Body/>
                <hr/>
                <Bottom/>
            </Card>
        </div>
    )
}
export default CreateCard