import Header from "@/Components/Header";
import Set from "@/Components/Set";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Autocomplete, CircularProgress, Grid2, IconButton, Stack, TextField } from "@mui/material";
import {  useEffect, useState, useRef } from "react";
import { Sets, useGetSets } from "@/api/getSets";


export default function Startseite() {

  const [page, setPage] = useState(0);
  const pages = useRef<Array<Array<Sets>>>([]);

  const data = useGetSets();

  useEffect(() => {
    for (let i = 0; i < data.data.length / 8; i++) {
      pages.current.push(data.data.slice(i * 8, i * 8 + 8));
    }
  }, [data]);
  

  function handleChange(next: boolean) {
    if (next) {
      if(page === pages.current.length - 1) {
        setPage(0);
      } else {
        setPage(page + 1);
      }
    } else {
      if (page === 0) {
        setPage(pages.current.length - 1);
      } else {  
        setPage(page - 1);
      }
    }
  }

  if (pages.current[page] === undefined) {
    return <CircularProgress />
  }
  
  return (
    <Stack direction="column" spacing={2} justifyContent="center" alignItems="center">
      <Header text="Start" />
        <Autocomplete 
          style={{width: '50%'}}
          options={["Example1", "Example2"]}
          renderInput={(params) => <TextField {...params} label="Kategorien" />}
        />
        <Stack direction="row" spacing={2} style={{width: '100%', minHeight: '500px'}}>
          <IconButton onClick={() => handleChange(false)}>
            <ChevronLeft color="primary" />
          </IconButton>
          <Grid2 container spacing={2} style={{width: '100%'}}>
            {pages.current[page].map((_set, index) => {
              return (
              <Grid2 key={index} size={4} >
                <Set  data={pages.current[page][index]} />
              </Grid2>)
            })}
            <Grid2 size={4} >
              <Set  data={{name: "plus"}}/>
            </Grid2>
          </Grid2>
          <IconButton onClick={() => handleChange(true)}>
            <ChevronRight color="primary"/>
          </IconButton>
        </Stack>
    </Stack>
  );
}
