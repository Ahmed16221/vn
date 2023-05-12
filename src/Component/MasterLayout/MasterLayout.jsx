import React from 'react'
import {ThemeProvider, CssBaseline, createTheme} from "@mui/material"
import Header from '../Header';

const MasterLayout = (props) => {
    const theme = createTheme({
        palette: {
          mode: "dark",
          primary: {
            main: "#00FFFF",
          },
        },
      });
  
    return (
  <>
  <ThemeProvider theme={theme}>
  <CssBaseline>
    <Header/>
    {props.children}
  </CssBaseline>
  </ThemeProvider>
  </>
  )
}

export default MasterLayout