import {
    ListItem,
    ListItemText,
    ListItemIcon,
    List,
    ListItemButton,
    Button,
    Stack,
    TextField,
    Divider
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import Header from "@/Components/Header";
import {Delete} from "@mui/icons-material";
import {useEffect, useState} from "react";
import getSet from "@/api/getSet";
import {useSearchParams} from "next/navigation";
import "../app/bodyfix.css";
import {Sets} from "@/api/getSets";
import {updateSet} from "@/api/postSet";

function CreateSet() {

    const searchParams = useSearchParams();
    const [setID, setSetID] = useState<number | null>(null);
    //const cardsArray = getCards();
    const [cardsArray, setCardsArray] = useState<{ cards: { id: number; question: string }[] }>({cards: []});

    const [setData, setSetData] = useState<Sets | null>(null);
    const [newSetname, setNewSetname] = useState("");
    const [newCategory, setNewCategory] = useState("");

    const [token, setToken] = useState<string | null>(null);


    useEffect(() => {
        if (typeof window === "undefined") return
        const storedToken = localStorage.getItem("token");
        setToken(storedToken);

        if (!searchParams) return;
        const param = searchParams.get("set");
        const parsed = param ? parseInt(param) : null;
        if(parsed && !isNaN(parsed)){
            setSetID(parsed);
        }

    }, [searchParams]);


    useEffect(() => {
        if (!setID || !token) return

        getSet(setID, token)
            .then((data) => {
                setSetData(data);
                setNewSetname(data.name);
                setNewCategory(data.category ?? "");
            })
            .catch((err) => {
                console.error("Fehler beim Laden der Sets: ", err);
                setSetData(null);
            });
        /*
                    getCardsBySet(setID, token)
                        .then((cards)=> {
                            setCardsArray(cards);
                        })
                        .catch((err)=> {
                            console.error("Fehler beim Laden der Karten", err);
                            setCardsArray([]);
                        });

         */

    }, [setID, token]);

    const handleChangeName = async (value: string) => {
        setNewSetname(value);
        if (setID && token) {
            try {
                await updateSet(setID, {name: value}, token);
            } catch (err) {
                console.error("Fehler beim Set-Update (name): ", err);
            }
        }
    };
    const handleChangeCategory = async (value: string) => {
        setNewCategory(value);
        if (setID && token) {
            try {
                await updateSet(setID, {kategorie: value}, token);
            } catch (err) {
                console.error("Fehler beim Set-Update (kategorie): ", err);
            }
        }
    };

    /* ?? TODO
    function saveSet() {
        console.log("save set" + newSetname + newCategory);
    }

     */


    const handleAddCard = () => {
       if(!setID) return;
        window.location.href = `/ikna/createCard`
        console.log("createNewID")
    }
    const handleEditCard = (cardId: number) => {
        if(!setID) return;
        window.location.href = `/ikna/createCard?set=${setID}&question=${cardId}`
        console.log("navigate to createCard with the ID", cardId)
    }
    const handleDeleteCard = (cardId: number) => {
        console.log("delete card by ID", cardId)
    }

    return (
        <>
            <Header text={'edit-set-page'}/>
            <Stack direction="column" spacing={2} style={{padding: '10px'}}>
                <TextField
                    label='setname'
                    value={newSetname}
                    onChange={(event) => handleChangeName(event.target.value)}
                    // onBlur={saveSet}
                />
                <TextField
                    label='category'
                    value={newCategory}
                    onChange={(event) => handleChangeCategory(event.target.value)}
                    // onBlur={saveSet}
                />

                <Divider/>

                <Button style={{
                    justifyContent: 'center',
                    border: '1px solid lightgrey',
                    marginLeft: '10px',
                    marginRight: '10px'
                }} onClick={handleAddCard}>
                    <AddIcon />
                </Button>

                        <List>
                {cardsArray?.cards?.flatMap((card) => {
                    return (
                            <ListItem>
                                <ListItemButton style={{border: '1px solid lightgrey'}}>
                                    <ListItemText primary={card.question}/>
                                </ListItemButton>
                                <ListItemIcon>
                                    <ListItemButton style={{padding: '12px', border: '1px solid lightgrey'}} onClick={() => handleEditCard(card.id)}>
                                        <EditIcon />
                                    </ListItemButton>
                                    <ListItemButton style={{padding: '12px', border: '1px solid lightgrey'}} onClick={() => handleDeleteCard(card.id)}>
                                        <Delete />
                                    </ListItemButton>
                                </ListItemIcon>
                            </ListItem>
                    )
                })
                }
                        </List>
            </Stack>
        </>
    )
}


export default CreateSet;