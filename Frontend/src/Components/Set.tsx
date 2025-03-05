import { Sets } from "@/api/getSets";
import { BarChart } from "@mui/x-charts/BarChart";
import { Card, Stack, useMediaQuery, useTheme } from "@mui/material";
import { useGetNextFreeDataId } from "@/api/getNextFreeDataId";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from "react";

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

    const dataId = useGetNextFreeDataId().data;

    function handleClick() {
        if (data === null) {
        window.location.href = "/createSet?id=" + dataId;
        } else {
            window.location.href = "/Lernseite?id=" + data.id;
        }
    }

    if (data === null) {
        return (
            <div style={{alignItems: "center", cursor: "pointer", display: "flex", justifyContent: "center"}} onClick={handleClick}>
                <AddIcon style={{height: `${height}px`, width: `${height}px`}} />
            </div>
        );
    }

    return (
        <Card elevation={3} >
            <Stack direction="column" spacing={2} alignItems="center" onClick={handleClick} style={{cursor: "pointer", padding: "5px"}}>
                <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" style={{width: "100%", paddingRight: "5px", paddingLeft: "5px"}}>
                    <div></div>
                    <h2>{data.name}</h2>
                    <EditIcon onClick={() => window.location.href = "/createSet?id=" + data.id} style={{cursor: "pointer"}}/>
                </Stack>

                <BarChart x-Axis={[{scaleType: "band"}]}
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
            </Stack>
        </Card>

    );
}