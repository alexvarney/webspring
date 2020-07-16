import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: #fff;
  padding: 4px;
  border: 1px solid lightgrey;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.35);
  color: #000;
`;

export default function LocationRedirectMarker({
  text,
  onActivate = (x) => x,
}) {
  return (
    <Container>
      <p>{text}</p>
      <button onClick={onActivate}>Go!</button>
    </Container>
  );
}
