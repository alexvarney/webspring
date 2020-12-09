import React from "react";
import styled from "styled-components";
import StateContainer from "../ui/state-container";

const Container = styled(StateContainer)`
  background-color: #fff;
`;

export default function TindawgState() {
  return <Container>Tindawg</Container>;
}
