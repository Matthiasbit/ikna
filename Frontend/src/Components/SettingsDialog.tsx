import { Dialog ,DialogTitle, Button, DialogActions, DialogContent, FormControl, InputLabel, Select, MenuItem, Stack, TextField, Switch, FormControlLabel, CircularProgress} from '@mui/material';
import { ReactElement, useEffect, useState } from 'react';
import { useGetSettings } from '@/api/getSettings';

type SettingsDialogProps = {
    open: boolean;
    handleClose: () => void;
}

export type Options = {
    lernmethode: string;
    easy: number;
    medium: number;
    hard: number;
    shareSets: boolean;
    shareStats: boolean;
}

export default function SettingsDialog({open , handleClose }:SettingsDialogProps): ReactElement {
    const {data, loading} = useGetSettings();
    const [options, setOptions] = useState<Options>({
        lernmethode: data?.lernmethode || "Runden",
        easy: data?.easy || 0,
        medium: data?.medium || 0,
        hard: data?.hard || 0,
        shareSets: false,
        shareStats: false,
    });
    
    useEffect(() => {
        if (loading) {
            return;
        }
        if (data) {
            setOptions({
                lernmethode: data.lernmethode,
                easy: data.easy,
                medium: data.medium,
                hard: data.hard,
                shareSets: data.shareSets ,
                shareStats: data.shareStats,
            });
        }
    }, [data]);

    if (loading) {
        return <Dialog open={open} onClose={handleClose} maxWidth="lg"><div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%'}}><CircularProgress /></div></Dialog>;
    }
    return (
        <Dialog open={open} onClose={handleClose} maxWidth="lg" >
            <DialogTitle>Settings</DialogTitle>
            <DialogContent>
                <Stack spacing={2} >
                    <h3>Learning</h3>
                    <FormControl fullWidth style={{width: "700px"}}>
                        <InputLabel>Learning Method</InputLabel>
                        <Select
                            value={options.lernmethode}
                            label="Learning Method"
                            onChange={(event) => {setOptions({...options, lernmethode: event.target.value})}}
                        >
                            <MenuItem value="Runden">Roundsystem</MenuItem>
                            <MenuItem value="default">nächste Lernmethode</MenuItem>
                            <MenuItem value="def">noch Eine </MenuItem>
                        </Select>
                    </FormControl>
                    <Stack direction="row" spacing={2}>
                        <TextField label="easy" type="number" value={options.easy} onChange={(event) => setOptions({...options, easy: Number(event.target.value)})}/>
                        <TextField label="medium" type="number" value={options.medium} onChange={(event) => setOptions({...options, medium: Number(event.target.value)})}/>  
                        <TextField label="hard" type="number" value={options.hard} onChange={(event) => setOptions({...options, hard: Number(event.target.value)})}/>   
                    </Stack>
                    <h3>Account</h3>
                    <Stack direction="row" spacing={2}>
                        <Button style={{width: "163px"}}>Log Out</Button>
                        <Button style={{width: "163px"}}>Delete Account</Button>
                    </Stack>
                    <h3>Friends</h3>
                    <Stack direction="row" spacing={2}>
                        <FormControlLabel control={<Switch value={options.shareSets} onChange={() => setOptions({...options, shareSets: !options.shareSets})}/>} label="Share your Sets" />
                        <FormControlLabel control={<Switch value={options.shareStats}  onChange={() => setOptions({...options, shareStats: !options.shareStats})}/>} label="Share your Stats" />
                    </Stack>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={() => {
                    fetch('http://localhost:80/Settings', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(options)
                    })
                    handleClose();
                }} color="primary">
                    Apply
                </Button>
            </DialogActions>
        </Dialog>
    );
}