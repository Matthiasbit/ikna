import {ListItem, ListItemText, ListItemIcon, List, ListItemButton, Stack} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import Header from "@/Components/Header";
import {useGetQuestions} from "@/api/getQuestions";

export default function CreateSet() {

    const questionsArray = useGetQuestions();

    return (
        <>
            <Header text={'Bearbeitung-Set'}/>

            {/*TODO: input categorie and input setName with popup by clicking the "+" ? */}

            <Stack direction={"column"} spacing={2}>
                <List>
                    <ListItem>
                        <ListItemButton style={{justifyContent: 'center', border: '1px solid lightgrey'}}>
                            <AddIcon/>
                        </ListItemButton>
                    </ListItem>
                </List>

                {questionsArray.data.flatMap((question) => {
                    return (
                        <List>
                            <ListItem>
                                <ListItemButton style={{border: '1px solid lightgrey'}}>
                                    <ListItemText primary={"question placeholder"}/>
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
            </Stack>
        </>
    )
}
