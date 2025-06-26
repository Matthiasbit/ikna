import {Sets} from "@/api/getSets";
import {BarChart} from "@mui/x-charts/BarChart";
import {Card, CircularProgress, IconButton, Stack, useMediaQuery, useTheme} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import {useEffect, useState} from "react";
import {createSet} from "@/api/postSet";
import {deleteSet} from "@/api/deleteSet";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

type SetProps = {
    data: Sets | null;
}

export default function Set({data}: SetProps) {
    const theme = useTheme();

    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const lg = useMediaQuery(theme.breakpoints.down('lg'));
    const xl = useMediaQuery(theme.breakpoints.up('lg'));

    const [height, setHeight] = useState(300);
    const [width, setWidth] = useState(500);

    //
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window === "undefined") return
        const storedToken = localStorage.getItem("token");
        setToken(storedToken);

    }, []);

    useEffect(() => {
        if (sm) {
            setHeight(200);
            setWidth(300);
        } else if (lg) {
            setHeight(250);
            setWidth(400);
        } else if (xl) {
            setHeight(300);
            setWidth(500);
        }
    }, [sm, lg, xl]);

    async function handleClick() {
        if (!token) {
            alert("Nicht eingeloggt!");
            return;
        }


        if (data === null) {
            try {
                const created = await createSet();
                window.location.href = `/ikna/createSet?set=${created.id}`;
            } catch (err) {
                console.error("Fehler bim Erstellen des Sets ", err);
                alert("Set konnte nicht erstellt werden");
            }
        } else {
            window.location.href = "/ikna/learningpage?setId=" + data.id;
        }
    }

    const handleDelete = async () => {
        if (!token || !data?.id) return;

        const confirm = window.confirm("Willst du dieses Set wirklich löschen?");
        if (!confirm) return;

        try {
            await deleteSet(data.id, token);
            window.location.reload(); // oder redirect zur Startseite
        } catch (err) {
            console.error("Fehler beim Löschen des Sets:", err);
            alert("Fehler beim Löschen!");
        }
    };

    if (data === null && token === null) {
        return (<div
            style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                height: "100%",
            }}
        >
            <CircularProgress/>
        </div>)
    }


    if (data === null) {
        return (
            <div style={{alignItems: "center", cursor: "pointer", display: "flex", justifyContent: "center"}}
                 onClick={handleClick}>
                <AddIcon style={{height: `${height}px`, width: `${height}px`}}/>
            </div>
        );
    }

    return (
        <Card elevation={3}>
            <Stack direction="column" spacing={2} alignItems="center" style={{padding: "5px"}}>
                <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between"
                       style={{width: "100%", paddingRight: "5px", paddingLeft: "5px"}}>
                    <div onClick={handleClick} style={{cursor: "pointer"}}></div>
                    <h2 onClick={handleClick} style={{cursor: "pointer"}}>{data.name}</h2>
                    <Stack direction="row" spacing={1}>
                        <IconButton sx={{color: "black"}} onClick={handleDelete}>
                            <DeleteForeverIcon/>
                        </IconButton>
                        <IconButton onClick={() => window.location.href = "/ikna/createSet?setId=" + data.id}
                                    style={{cursor: "pointer", color: "black"}}>
                            <EditIcon/>
                        </IconButton>
                    </Stack>
                </Stack>
                <div onClick={handleClick} style={{cursor: "pointer"}}>
                    <BarChart
                        x-Axis={[{scaleType: "band"}]}
                        series={[
                            {data: [data.zero], label: "0%", color: "darkred"},
                            {data: [data.twentyfive], label: "25%", color: "orange"},
                            {data: [data.fifty], label: "50%", color: "yellow"},
                            {data: [data.seventyfive], label: "75%", color: "lightgreen"},
                            {data: [data.hundred], label: "100%", color: "green"}
                        ]}
                        width={width}
                        height={height}
                    />
                </div>
            </Stack>
        </Card>

    );
}
