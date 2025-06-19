import { Dialog ,DialogTitle, Button, DialogActions, DialogContent, FormControl, InputLabel, Select, MenuItem, Stack, TextField, Switch, FormControlLabel} from '@mui/material';
import { ReactElement, useState } from 'react';

type SettingsDialogProps = {
    open: boolean;
    handleClose: () => void;
}

type Options = {
    lernmethode: string;
    easy: number;
    medium: number;
    hard: number;
    shareSets: boolean;
    shareStats: boolean;
}

export default function SettingsDialog({open , handleClose }:SettingsDialogProps): ReactElement {
    const [options, setOptions] = useState<Options>({
        lernmethode: "difficulty",
        easy: 3,
        medium: 5,
        hard: 7,
        shareSets: false,
        shareStats: false
    });
    
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
                            <MenuItem value="leitner">Leitner-System</MenuItem>
                            <MenuItem value="difficulty">Nach Schwierigkeit</MenuItem>
                        </Select>
                    </FormControl>
                    <Stack direction="row" spacing={2}>
                        <TextField label="easy" type="number" value={options.easy} onChange={(event) => setOptions({...options, easy: Number(event.target.value)})}/>
                        <TextField label="medium" type="number" value={options.medium} onChange={(event) => setOptions({...options, medium: Number(event.target.value)})}/>  
                        <TextField label="hard" type="number" value={options.hard} onChange={(event) => setOptions({...options, hard: Number(event.target.value)})}/>   
                    </Stack>
                    <h3>Account</h3>
                    <Stack direction="row" spacing={2}>
                        <Button href="/ikna/loginpage" style={{width: "163px"}}>Log In</Button>
                        <Button href="/ikna/loginpage" style={{width: "163px"}}>Sign Up</Button>
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