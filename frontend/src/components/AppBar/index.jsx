import React from "react";
import { Toolbar } from "@material-ui/core";
import { StyledAppBar, StyledTitle } from "./styles";

const AppBar = () => {
  return (
    <>
      <StyledAppBar position="fixed">
        <Toolbar>
          <StyledTitle>CRUD POSTS</StyledTitle>
        </Toolbar>
      </StyledAppBar>
      <Toolbar />
    </>
  );
};

export default AppBar;
