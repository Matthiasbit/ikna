import {ListItem, ListItemText, ListItemIcon, List, ListItemButton, Stack, TextField} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import Header from "@/Components/Header";
import {useGetQuestions} from "@/api/getQuestions";
import {useGetSets} from "@/api/getSets";
import {Delete} from "@mui/icons-material";
import {useEffect, useState} from "react";


export default function CreateSet() {

    const questionsArray = useGetQuestions();

    const setDataArray = useGetSets();

    const [newSetname, setNewSetname] = useState("")
    const [newCategory, setNewCategory] = useState("")

    useEffect(() => {
        {
            console.log("new Setname:", {newSetname}, "new setCategory:", {newCategory})
        }
    }, [setDataArray]);

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

            <Stack direction={"column"} spacing={2}>

                {setDataArray.data.flatMap((setData) => {
                    return (
                        <List style={{display: 'flex'}}>

                            <ListItem>
                                <TextField label={'setname'}
                                           defaultValue={setData.name}
                                           onChange={(event) => setNewSetname(event.target.value)}/>
                                <TextField label={'category'}
                                           defaultValue={setData.category}
                                           onChange={(event) => setNewCategory(event.target.value)}/>
                            </ListItem>
                        </List>
                    )
                })}


                <List>
                    <ListItem>
                        <ListItemButton style={{justifyContent: 'center', border: '1px solid lightgrey'}}>
                            <AddIcon onClick={handleAddCard}/>
                        </ListItemButton>
                    </ListItem>
                </List>


                {questionsArray.data.flatMap((question) => {
                    return (
                        <List>
                            <ListItem>
                                <ListItemButton style={{border: '1px solid lightgrey'}}>
                                    <ListItemText primary={question.questionText}/>
                                </ListItemButton>
                                <ListItemIcon>
                                    <ListItemButton style={{padding: '12px', border: '1px solid lightgrey'}}>
                                        <EditIcon onClick={()=>handleEditCard(question.questionID)}/>
                                    </ListItemButton>
                                    <ListItemButton style={{padding: '12px', border: '1px solid lightgrey'}}>
                                        <Delete onClick={() => handleDeleteCard(question.questionID)}/>
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
