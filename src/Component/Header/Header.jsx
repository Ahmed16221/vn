import React, { Component } from 'react'
import {AppBar, Toolbar, Typography}  from "@mui/material";
export class Header extends Component {
  render() {
    return (
        <AppBar position="relative">
        <Toolbar>
          <Typography>VN</Typography>
        </Toolbar>
      </AppBar>
    )
  }
}

export default Header