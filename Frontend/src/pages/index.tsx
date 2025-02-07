import Header from "@/Components/Header";
import Set from "@/Components/Set";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Autocomplete, Grid2, IconButton, Stack, TextField } from "@mui/material";
import '../app/bodyfix.css';
import { useState } from "react";


export default function Startseite() {

  const [page, setPage] = useState(0);

  const data = ["Set1", "Set2", "Set3", "Set4", "Set5", "Set6", "Set7", "Set8", "Set9", "Set10"];
  const pages: Array<Array<string>> = []; 
  // wahrscheinlich ein useEffect wenn die daten geladen werden dann...
  for (let i = 0; i < data.length / 8; i++) {
    pages.push(data.slice(i * 8, i * 8 + 8));
  }

  function handleChange(next: boolean) {
    if (next) {
      if(page === pages.length - 1) {
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
  
  return (
    <Stack direction="column" spacing={2} justifyContent="center" alignItems="center">
      <Header text="Start" />
        <Autocomplete 
          style={{width: '50%'}}
          options={["Example1", "Example2"]}
          renderInput={(params) => <TextField {...params} label="Kategorien" />}
        />
        <Stack direction="row" spacing={2} style={{width: '100%'}}>
        <IconButton onClick={() => handleChange(false)}>
            <ChevronLeft />
          </IconButton>
          <Grid2 container spacing={2} style={{width: '100%'}}>
            {pages[page].map((_set, index) => {
              return (
              <Grid2 size={4} >
                <Set data={pages[page][index]} />
              </Grid2>)
            })}
            <Grid2 size={4} >
              <Set  data="plus"/>
            </Grid2>
          </Grid2>
          <IconButton onClick={() => handleChange(true)}>
            <ChevronRight />
          </IconButton>
        </Stack>
    </Stack>
  );
}
