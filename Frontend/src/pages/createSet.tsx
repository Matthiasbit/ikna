import {
    ListItem,
    ListItemText,
    ListItemIcon,
    List,
    ListItemButton,
    Button,
    Stack,
    TextField,
    Divider, Box
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import Header from "@/Components/Header";
import {useGetQuestions} from "@/api/getQuestions";
import {Delete} from "@mui/icons-material";
import {useEffect, useState} from "react";
import {useGetSet} from "@/api/getSet";
import {useSearchParams} from "next/navigation";
import {useGetNextFreeDataId} from "@/api/getNextFreeDataId";
import "../app/bodyfix.css";
import Card from "@mui/material/Card";


export default function CreateSet() {
    const serachParams = useSearchParams();
    const [setID, setSetID] = useState(0);
    const newQuestionId = useGetNextFreeDataId().data;
    const questionsArray = useGetQuestions();
    const data = useGetSet();
    const [newSetname, setNewSetname] = useState("");
    const [newCategory, setNewCategory] = useState("");

    function saveSet() {
        console.log("save set" + newSetname + newCategory);
    }


    useEffect(() => {
        if (data.data === undefined) {
            return;
        }
        if (serachParams === null) {
            return;
        }
        const setParam = serachParams.get("set");
        setSetID(setParam !== null ? parseInt(setParam) : 0);
        if (newSetname === "") {
            setNewSetname(data.data.name)
        }
        if (newCategory === "") {
            setNewCategory(data.data.category ?? "")
        }
    }, [data]);

    const handleAddCard = () => {
        window.location.href = `/ikna/createCard?question${newQuestionId}`
        console.log("createNewID")
    }
    const handleEditCard = (questionID: number) => {
        window.location.href = `/ikna/createCard?set=${setID}&question=${questionID}`
        console.log("navigate to createCard with the ID", questionID)
    }
    const handleDeleteCard = (questionID: number) => {
        console.log("delete card by ID", questionID)
    }

    return (
        <>
            <Header text={'edit-set-page'}/>

            <Box sx={{maxWidth: '90vw', margin: 'auto', paddingTop: '20px'}}>

                <Card sx={{
                    minHeight: '70vh',
                    borderRadius: '16px',
                    backgroundColor: '#E3F2FD',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '2vw'
                }}>

                    <Stack direction="column" spacing={2} style={{padding: '10px'}}>

                        <TextField
                            label='setname'
                            value={newSetname}
                            onChange={(event) => {
                                setNewSetname(event.target.value);
                                console.log(event.target.value);
                            }}
                            onBlur={saveSet}
                        />

                        <TextField
                            label='category'
                            value={newCategory}
                            onChange={(event) => {
                                setNewCategory(event.target.value);
                                console.log(event.target.value);
                            }}
                            onBlur={saveSet}
                        />

                        <br/>
                        <br/>
                        <br/>

                        <Divider/>

                        <Button style={{
                            justifyContent: 'center',
                            border: '1px solid lightgrey',
                            marginLeft: '10px',
                            marginRight: '10px',
                            width: '84vw'
                        }}>
                            <AddIcon onClick={handleAddCard}/>
                        </Button>

                        {questionsArray.data.flatMap((question) => {
                            return (
                                <List sx={{maxWidth:'84vw'}}>
                                    <ListItem sx={{border: '1px solid lightgrey', borderRadius: '5px', padding:'0px',  marginLeft: '10px',
                                        marginRight: '10px'}}>
                                        <ListItemButton>
                                            <ListItemText primary={question.question}/>
                                        </ListItemButton>

                                        <Divider orientation={"vertical"} flexItem/>

                                        <ListItemIcon>
                                            <ListItemButton style={{padding: '12px'}}>
                                                <EditIcon onClick={() => handleEditCard(question.id)}/>
                                            </ListItemButton>

                                            <Divider orientation={"vertical"} flexItem/>

                                            <ListItemButton style={{padding: '12px'}}>
                                                <Delete onClick={() => handleDeleteCard(question.id)}/>
                                            </ListItemButton>
                                        </ListItemIcon>
                                    </ListItem>
                                </List>
                            )
                        })
                        }
                    </Stack>
                </Card>
            </Box>
        </>
    )
}
