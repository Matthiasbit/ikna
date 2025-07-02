import { Dialog ,DialogTitle, Button, DialogActions, DialogContent, FormControl, InputLabel, Select, MenuItem, Stack, TextField, CircularProgress} from '@mui/material';
import { ReactElement, useEffect, useState } from 'react';
import { useGetSettings } from '@/api/getSettings';
import { updateSettings } from '@/api/updateSettings';
import { deleteUser } from '@/api/deleteUser';

type SettingsDialogProps = {
    open: boolean;
    handleClose: () => void;
}

export type Options = {
    lernmethode: string;
    easy: number;
    medium: number;
    hard: number;
}

export default function SettingsDialog({open , handleClose }:SettingsDialogProps): ReactElement {
    const {data, loading} = useGetSettings();
    const [options, setOptions] = useState<Options>({
        lernmethode: data?.lernmethode || "difficulty",
        easy: data?.easy || 3,
        medium: data?.medium || 5,
        hard: data?.hard || 7,
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
            });
        }
    }, [data, loading]);

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
                            <MenuItem value="leitner">Leitner-System</MenuItem>
                            <MenuItem value="difficulty">Nach Schwierigkeit</MenuItem>
                        </Select>
                    </FormControl>
                    <Stack direction="row" spacing={2}>
                        <TextField label="easy" type="number" value={options.easy} onChange={(event) => setOptions({...options, easy: parseInt(event.target.value)})}/>
                        <TextField label="medium" type="number" value={options.medium} onChange={(event) => setOptions({...options, medium: parseInt(event.target.value)})}/>  
                        <TextField label="hard" type="number" value={options.hard} onChange={(event) => setOptions({...options, hard: parseInt(event.target.value)})}/>   
                    </Stack>
                    <h3>Account</h3>
                    <Stack direction="row" spacing={2}>
                        <Button style={{width: "163px"}} onClick={() => {
                            sessionStorage.removeItem('token');
                            window.location.href = "ikna/loginpage";
                            }}>
                                Log Out
                        </Button>
                        <Button style={{width: "163px"}} onClick={() => {
                            deleteUser();
                            sessionStorage.removeItem('token');
                            window.location.href = "ikna/loginpage";
                        }}>
                            Delete Account
                        </Button>
                    </Stack>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    if (!data){return;}
                    setOptions({
                        lernmethode: data.lernmethode,
                        easy: data.easy,
                        medium: data.medium,
                        hard: data.hard,
                    });
                    handleClose()}
                } 
                color="secondary">
                    Cancel
                </Button>
                <Button
                onClick={async () => {
                    await updateSettings(options);
                    handleClose();
                }}
                color="primary"
                >
                Apply
                </Button>
            </DialogActions>
        </Dialog>
    );
}