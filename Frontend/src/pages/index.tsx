import Header from "@/Components/Header";
import Set from "@/Components/Set";
import {ChevronLeft, ChevronRight} from "@mui/icons-material";
import {Autocomplete, CircularProgress, Grid2, IconButton, Stack, TextField} from "@mui/material";
import {useMemo, useState} from "react";
import {Sets, useGetSets} from "@/api/getSets";
import "../app/bodyfix.css";


export default function Startseite() {

    const [page, setPage] = useState(0);

    const data = useGetSets();

    const pages = useMemo(() => {
        if (data.loading || !data.data) return [];
        const result: Array<Array<Sets>> = [];
        for (let i = 0; i < data.data.length; i += 8) {
            result.push(data.data.slice(i, i + 8));
        }
        return result;
    }, [data.data, data.loading]);


    function handleChange(next: boolean) {
        if (next) {
            if (page === pages.length - 1) {
                setPage(0);
            } else {
                setPage(page + 1);
            }
        } else {
            if (page === 0) {
                setPage(pages.length - 1);
            } else {
                setPage(page - 1);
            }
        }
    }

    if (data.loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '100vw'
            }}>
                <CircularProgress/>
            </div>
        );
    }

    return (
        <Stack direction="column" spacing={2} justifyContent="center" alignItems="center">
            <Header text="Start"/>
            <Autocomplete
                style={{width: '50%'}}
                options={["Example1", "Example2"]}
                renderInput={(params) => <TextField {...params} label="Kategorien"/>}
            />
            <Stack direction="row" spacing={2} style={{width: '100%', minHeight: '500px'}}>
                <IconButton onClick={() => handleChange(false)}>
                    <ChevronLeft color="primary"/>
                </IconButton>
                <Grid2 container spacing={3} style={{width: '100%'}}>
                    {data.data.length === 0 ?
                        <Stack>
                            <h2>Keine Sets gefunden!!!</h2>
                            <p>Erstelle dein erstes Set!</p>
                            <p>Drücke auf das Plus nebendran</p>
                        </Stack>
                        :
                        pages[page].map((_set, index) => {
                            return (
                                <Grid2 key={index} size={{xs: 12, md: 6, lg: 4}}>
                                    <Set data={pages[page][index]}/>
                                </Grid2>)
                        })}
                    <Grid2 size={{xs: 12, md: 6, lg: 4}}>
                        <Set data={null}/>
                    </Grid2>
                </Grid2>
                <IconButton onClick={() => handleChange(true)}>
                    <ChevronRight color="primary"/>
                </IconButton>
            </Stack>
        </Stack>
    );
}
