import React from "react";
import styled from "styled-components";
const Container = styled.div`
`;
export default function SlackView(props) {
  return (
    <Container>
    	<img src={process.env.PUBLIC_URL + '/office/sphinx.png'}/>
    </Container>
  );
}