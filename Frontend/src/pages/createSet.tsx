import {ListItem, Box, ListItemText, ListItemIcon, List, ListItemButton} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import Header from "@/Components/Header";


export type QuestionArrayType = {
    questionID: number,
    questionText: string,
    category?: string,
}

const CreateSet = () => {

    const questionsArray: QuestionArrayType[] = [
        {questionID: 1, questionText: 'question 1'},
        {questionID: 2, questionText: 'question 2'}
    ]

    return (
        <>
            <Header text={'Bearbeitung-Set'}/>

            <Box>
                <List>
                    <ListItem>
                        <ListItemButton style={{justifyContent: 'center', border: '1px solid lightgrey'}}>
                            <AddIcon/>
                        </ListItemButton>
                    </ListItem>
                </List>

                {questionsArray.flatMap((question) => {
                    return (
                        <List>
                            <ListItem>
                                <ListItemButton style={{border: '1px solid lightgrey'}}>
                                    <ListItemText primary={question.questionText}/>
                                </ListItemButton>
                                <ListItemIcon>
                                    <ListItemButton style={{padding: '12px', border: '1px solid lightgrey'}}>
                                        <EditIcon/>
                                    </ListItemButton>
                                </ListItemIcon>
                            </ListItem>
                        </List>
                    )
                })}
            </Box>
        </>
    )
}

export default CreateSet