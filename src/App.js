import React, { useState, useEffect, useContext } from "react";
import { ListDataContext } from "./Component/Context/listingConext";
import ProfileContent from "./Component/Content";
import {
  Button,
  createTheme,
  Container,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  Grid,
} from "@mui/material";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import "./App.css";

// }
const ToggleButtonSection = () => {
  return (
    <>
      <ToggleButtonGroup
        size="small"
        orientation="horizontal"
        exclusive
        // onChange={handleAlignment}
        aria-label="text alignment"
      >
        <ToggleButton value="list" aria-label="list">
          <ViewListIcon />
        </ToggleButton>
        <ToggleButton value="module" aria-label="module">
          <ViewModuleIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  );
};

function App(props) {
  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#3DACFF",
      },
    },
  });
  const [searchString, setSearchString] = useState("");
  const listContextData = useContext(ListDataContext);
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      //the debounce delay (e.g. submit the form)
      listContextData.dispatch({ type: "GLOBALFILTER", payload: searchString });
    }, 500);

    // Cancel the debounce timer on cleanup to prevent memory leaks
    return () => clearTimeout(delayDebounceFn);
  }, [searchString]);
  const onChangeSearch = (e) => {
    setSearchString(e.target.value);
  };

  return (
    <>
      <main>
        <Box
          alignItems="center"
          justifyContent="center"
          sx={{
            bgcolor: "background.paper",

            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6} md={9}>
                <TextField
                  onChange={(e) => {
                    onChangeSearch(e);
                  }}
                  fullWidth
                  label="fullWidth"
                  id="fullWidth"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <Button
                  variant="contained"
                  sx={{ background: "background.paper" }}
                  startIcon={<PersonAddAltIcon />}
                  onClick={()=>{
                    window.location.href = '/editprofile/0'
                  }}
                >
                  Create Profile
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={1}>
                <ToggleButtonSection />
              </Grid>
            </Grid>
            <ProfileContent {...props} />
          </Container>
        </Box>
      </main>
    </>
  );
}

export default App;
