import {ListItem, ListItemText, ListItemIcon, List, ListItemButton, Button, Stack, TextField, Divider} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import Header from "@/Components/Header";
import {useGetQuestions} from "@/api/getQuestions";
import {Delete} from "@mui/icons-material";
import {useEffect, useState} from "react";
import { useGetSet } from "@/api/getSet";


export default function CreateSet() {

    const questionsArray = useGetQuestions();

    const data = useGetSet();

    const [newSetname, setNewSetname] = useState("")
    const [newCategory, setNewCategory] = useState("")

    function saveSet() {
        console.log("save set" + newSetname + newCategory);
    }

    useEffect(() => {
        if (data.data === undefined) {
            return
        }
        setNewSetname(data.data.name)
        setNewCategory(data.data.category ?? "")
    }, [data]);

    const handleAddCard = () => {
        // TODO: newID -> empty createCard
        window.location.href = "/createCard"
        console.log("createNewID")
    }
    const handleEditCard = (questionID: number) => {
        // TODO: cardID
        window.location.href = "/createCard?set=1&question=5"

        console.log("navigate to createCard with the ID", questionID)
    }
    const handleDeleteCard =(questionID: number)=> {
        // TODO: delete card by ID
        console.log("delete card by ID", questionID)
    }


    return (
        <>
            <Header text={'edit-set-page'}/>
            <Stack direction="column" spacing={2} style={{padding: '10px'}}>
                <TextField 
                    label='setname'
                    value={newSetname}
                    onChange={(event) => setNewSetname(event.target.value) }
                    onBlur={saveSet}
                    />
                <TextField 
                    label='category'
                    value={newCategory}
                    onChange={(event) => setNewCategory(event.target.value)}
                    onBlur={saveSet}
                    />

                <Divider/>

                <Button style={{justifyContent: 'center', border: '1px solid lightgrey', marginLeft: '10px', marginRight: '10px'}}>  
                    <AddIcon onClick={handleAddCard}/>
                </Button>

                {questionsArray.data.flatMap((question) => {
                    return (
                        <List>
                            <ListItem>
                                <ListItemButton style={{border: '1px solid lightgrey'}}>
                                    <ListItemText primary={question.question}/>
                                </ListItemButton>
                                <ListItemIcon>
                                    <ListItemButton style={{padding: '12px', border: '1px solid lightgrey'}}>
                                        <EditIcon onClick={()=>handleEditCard(question.id)}/>
                                    </ListItemButton>
                                    <ListItemButton style={{padding: '12px', border: '1px solid lightgrey'}}>
                                        <Delete onClick={() => handleDeleteCard(question.id)}/>
                                    </ListItemButton>
                                </ListItemIcon>
                            </ListItem>
                        </List>
                    )
                })
                }
            </Stack>
        </>
    )
}
