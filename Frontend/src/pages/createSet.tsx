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
import {updateSet} from "@/api/updateSet";
import createCard from "@/api/createCard";
import useGetCards from "@/api/getCards";
import deleteCard from "@/api/deleteCard";

export default function CreateSet() {

    const searchParams = useSearchParams();
    const setIdParam = searchParams?.get("setId");
    const setId = Number(setIdParam);

    const [newSetname, setNewSetname] = useState("");
    const [newCategory, setNewCategory] = useState("");

    const {cards, loading, refetch} = useGetCards(setId);

    useEffect(() => {

        if (!setId) return;

        const loadSetData = async () => {
            try {
                const data = await getSet(setId);
                setNewSetname(data.name ?? "");
                setNewCategory(data.kategorie ?? "");

            } catch (err) {
                console.error("Fehler beim Laden von Set oder Karten: ", err);
            }
        };

        loadSetData();
    }, [setId]);

    const handleChangeName = async (value: string) => {
        setNewSetname(value);
        if (!setId) return;
        try {
            await updateSet(setId, {name: value});
        } catch (err) {
            console.error("Fehler beim Set-Update (name): ", err);
        }
    };

    const handleChangeCategory = async (value: string) => {
        setNewCategory(value);
        if (!setId) return;
        try {
            await updateSet(setId, {name: newSetname, kategorie: value});
        } catch (err) {
            console.error("Fehler beim Set-Update (kategorie): ", err);
        }

    };

    const handleAddCard = async () => {
        if (!setId) return;
        try {
            const newCard = await createCard({
                question: "", answer: "", difficulty: "mittel", setId,
            });
            const newCardId = newCard?.card?.id;
            if (newCardId) {
                window.location.href = `/ikna/createCard?setId=${setId}&question=${newCardId}`;
            } else {
                console.warn("Keine gültige Karten ID")
            }
        } catch (err) {
            console.error("Fehler beim Erstellen der Karte: ", err);
        }
    };

    const handleEditCard = (cardId: number) => {
        if (!setId) return;
        window.location.href = `/ikna/createCard?setId=${setId}&question=${cardId}`
    };

    const handleDeleteCard = async (cardId: number) => {
        const confirmDelete = window.confirm("Willst du diese Karte wirklich löschen?");
        if (!confirmDelete) return;

        try {
            await deleteCard(cardId);
            refetch();
        } catch (error) {
            console.error("Fehler beim Löschen der Karte:", error);
            alert("Beim Löschen der Karte ist ein Fehler aufgetreten.");
        }
    };

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

                {loading && <p>Karten werden geladen...</p>}

                <List>
                    {cards?.map((card) => {
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
