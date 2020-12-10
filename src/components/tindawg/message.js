import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  border: 1px solid orange;
`;

const MessageRow = styled.div`
  display: flex;
`;

export default function Message(props) {
  return (
    <Container>
      <MessageRow></MessageRow>
    </Container>
  );
}
