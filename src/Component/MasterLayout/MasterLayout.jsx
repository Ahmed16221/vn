import React from "react";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import Header from "../Header";

const MasterLayout = (props) => {
  const { palette } = createTheme();
  const { augmentColor } = palette;
  const createColor = (mainColor) =>
    augmentColor({ color: { main: mainColor } });

  const theme = createTheme({
    palette: {
      maincolor: createColor("#3DACFF"),
      mode: "dark",
      primary: {
        main: "#FFFFFF",
        contrastText: "#FFFFFF",
      },
      secondary: {
        main: "#00fff0", // very cyan
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Header />
          {props.children}
        </CssBaseline>
      </ThemeProvider>
    </>
  );
};

export default MasterLayout;
