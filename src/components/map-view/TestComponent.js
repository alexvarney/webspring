import React from "react";
import styled from "styled-components";
import { StateContext } from "../../hooks/useApplicationState";

const Container = styled.p`
  border: 1px solid red;
  color: #000;
  background-color: #fff;
  padding: 4px;
  max-width: 60%;
`;

export default function TestMarker(props) {
  console.log(React.useContext(StateContext));

  return (
    <Container>
      This is a React Component. Message prop is {props.message}!
    </Container>
  );
}
