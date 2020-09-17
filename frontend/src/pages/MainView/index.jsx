import React from "react";
import { AppBar } from "../../components";
import { Container } from "./styles";
import TablePost from "./Table";

const MainView = () => {
  return (
    <>
      <AppBar />
      <Container>
        <TablePost />
      </Container>
    </>
  );
};

export default MainView;
