import React from "react";
import styled from "styled-components";
import { StateContext, ActionTypes } from "../../hooks/useApplicationState";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  align-items: center;

  max-width: 100%;
  min-height: 0;
  overflow: hidden;
  cursor: pointer;

  & > img {
    overflow: hidden;
    object-fit: contain;
    width: 5vh;
    border-radius: 1.5vh;
    max-width: 50px;
    max-height: 50px;
  }

  & > p {
    text-align: center;
    font-size: 12px;
    margin-top: 10%;
  }
`;

export default function AppIcon({ src, appState, label }) {
  const { dispatch } = React.useContext(StateContext);

  return (
    <Container
      onClick={() => {
        dispatch({ type: ActionTypes.setState, payload: appState });
      }}
    >
      <img src={src} />
      <p>{label}</p>
    </Container>
  );
}
