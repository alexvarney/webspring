import React from "react";
import styled from "styled-components";
import StatusBar from "./ui/statusbar";
const Container = styled.a`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  background-color: rgb(237, 237, 237);
  & > img {
    max-width: 100%;
    object-fit: contain;
  }
`;
const StyledStatusBar = styled(StatusBar)`
  position: absolute;
  top: 0;
`;
export default function SlackView(props) {
  return (
    <Container
      target="_blank"
      href="slack://channel?hint=ask-bot-for-riddle&team=T024SHDN6&id=G75G7NB53"
    >
      <StyledStatusBar />
      <img src={process.env.PUBLIC_URL + "/office/sphinx.png"} />
    </Container>
  );
}
