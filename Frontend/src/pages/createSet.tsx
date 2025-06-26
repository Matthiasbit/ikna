import {
    Button,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    TextField
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
import createCard from "@/api/createCard";
import {getCardsBySetId} from "@/api/getCardsBySet";

function CreateSet() {

    const searchParams = useSearchParams();
    const setIdParam = searchParams?.get("setId");
    const setId = Number(setIdParam);

    const [cardsArray, setCardsArray] = useState<{ cards: { id: number; question: string }[] }>({cards: []});
    const [setData, setSetData] = useState<Sets | null>(null);
    const [newSetname, setNewSetname] = useState("");
    const [newCategory, setNewCategory] = useState("");

    useEffect(() => {
        if (!setId) return;

        const loadSetData = async () => {
            try {
                console.log(setId);
                const data = await getSet(setId);
                setSetData(data);
                setNewSetname(data.name ?? "");
                setNewCategory(data.kategorie ?? "");

                 const cards = await getCardsBySetId(setId);
                setCardsArray({ cards });
            } catch (err) {
                console.error("Fehler beim Laden von Set oder Karten: ", err);
                setSetData(null);
                setCardsArray({ cards: [] });
            }
        };

        loadSetData();
    }, [setId]);

    /*
        useEffect(() => {
            if (!setID || !token) return

            getSet(setID, token)
                .then(async (data) => {
                    if (!data) {
                        console.warn("Set nicht gefunden");
                        setSetData(null);
                        return;
                    }
                    setSetData(data);
                    setNewSetname(data.name ?? "");
                    setNewCategory(data.kategorie ?? "");

                    const cards = await getCardsBySetId(setID, token);
                    setCardsArray({cards});
                })
                .catch((err) => {
                    console.error("Fehler beim Laden der Sets: ", err);
                    setSetData(null);
                });
        }, [setID, token]);

     */

    const handleChangeName = async (value: string) => {
        setNewSetname(value);
        if (setId ) {
            try {
                await updateSet(setId, {name: value});
            } catch (err) {
                console.error("Fehler beim Set-Update (name): ", err);
            }
        }
    };
    const handleChangeCategory = async (value: string) => {
        setNewCategory(value);
        if (setId) {
            try {
                await updateSet(setId, {kategorie: value});
            } catch (err) {
                console.error("Fehler beim Set-Update (kategorie): ", err);
            }
        }
    };

    const handleAddCard = async () => {
        if (!setId) return;
        try {
            const newCard = await createCard({
                question: "", answer: "", difficulty: "mittel", setId: setId,
            });
            const newCardId = newCard?.card?.id;
            if (newCardId) {
                window.location.href = `/ikna/createCard?setId=${setId}&question=${newCardId}`;
            } else {
                alert("fegler beim Erstellen der Karte");
            }

        } catch (err) {
            console.error("Fehler beim Erstellen der Karte: ", err);
        }
    };

    const handleEditCard = (cardId: number) => {
        if (!setId) return;
        window.location.href = `/ikna/createCard?set=${setId}&question=${cardId}`
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
                />
                <TextField
                    label='category'
                    value={newCategory}
                    onChange={(event) => handleChangeCategory(event.target.value)}
                />

                <Divider/>

                <Button style={{
                    justifyContent: 'center',
                    border: '1px solid lightgrey',
                    marginLeft: '10px',
                    marginRight: '10px'
                }} onClick={handleAddCard}>
                    <AddIcon/>
                </Button>

                <List>
                    {cardsArray?.cards?.map((card) => {
                        return (
                            <ListItem key={card.id}>
                                <ListItemButton style={{border: '1px solid lightgrey'}}>
                                    <ListItemText primary={card.question}/>
                                </ListItemButton>
                                <ListItemIcon>
                                    <ListItemButton style={{padding: '12px', border: '1px solid lightgrey'}}
                                                    onClick={() => handleEditCard(card.id)}>
                                        <EditIcon/>
                                    </ListItemButton>
                                    <ListItemButton style={{padding: '12px', border: '1px solid lightgrey'}}
                                                    onClick={() => handleDeleteCard(card.id)}>
                                        <Delete/>
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