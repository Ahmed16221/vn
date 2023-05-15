import React, { useState, useEffect, useContext } from "react";
import { ListDataContext } from "./Component/Context/listingConext";
import ProfileContent from "./Component/Content";
import {
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Container,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  Grid,
  Stack,
  Pagination,
  Typography,
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
  const [searchString, setSearchString] = useState("");
  const listContextData = useContext(ListDataContext);

  // variables for Pagination //
  const [pageSize, setPageSize] = useState(15);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPagination, setShowPagination] = useState(false);

  const handleChangeForPageSize = (event) => {
    listContextData.dispatch({
      type: "SETPAGESIZE",
      payload: event.target.value,
    });
    setPageSize(event.target.value);
  };
  //calculating the page count //
  useEffect(() => {
    if (listContextData.listData.length !== 0) {
      setPageCount(
        Math.ceil(listContextData.listData.getAllProfiles.size / pageSize) -1
      );
    }
  }, [listContextData]);

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
  const handleChangeForPagination = (event, value) => {
    listContextData.dispatch({
      type: "SETPAGENO",
      payload: parseInt(value, 10),
    });
    setCurrentPage(value);
  };

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      if (position > 4) {
        // adjust 4 to the desired scroll position
        setShowPagination(true);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // The code for infinite Scrolling Without Any pagination Panel.
  // useEffect(() => {
  //   const options = {
  //     root: null,
  //     rootMargin: "0px",
  //     threshold: 1.0,
  //   };

  //   const observer = new IntersectionObserver(([entry]) => {
  //     if (entry.isIntersecting) {
  //       setPage((page) => page + 1);
  //     }
  //   }, options);

  //   if (containerRef.current) {
  //     observer.observe(containerRef.current);
  //   }

  //   return () => {
  //     if (containerRef.current) {
  //       observer.unobserve(containerRef.current);
  //     }
  //   };
  // }, []);

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
                  label="Search"
                  id="Search"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <Button
                  color="maincolor"
                  variant="contained"
                  startIcon={<PersonAddAltIcon />}
                  sx={{ color: "white" }}
                  onClick={() => {
                    window.location.href = "/editprofile/0";
                  }}
                >
                  Create Profile
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={1}>
                <ToggleButtonSection />
              </Grid>
            </Grid>
            <Grid container sx={{ justifyContent: "flex-end", mt: 2 }}>
              <FormControl sx={{ minWidth: 120 }} size="small">
                <InputLabel id="item-to-be-shown">Page Size</InputLabel>
                <Select
                  labelId="item-to-be-shown"
                  id="select-number-of-item-on-page"
                  value={pageSize}
                  onChange={handleChangeForPageSize}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={15}>Fifteen</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <ProfileContent key={`profileContent`} {...props} />

            <Grid container sx={{ justify: "flex-end", mt: 3 }}>
              {showPagination && (
                <Stack spacing={2}>
                  <Typography>Page: {currentPage}</Typography>
                  <Pagination
                    count={pageCount}
                    page={currentPage}
                    onChange={handleChangeForPagination}
                  />
                </Stack>
              )}
            </Grid>
          </Container>
        </Box>
      </main>
    </>
  );
}

export default App;
