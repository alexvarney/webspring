import React from "react";
import styled from "styled-components";
import { StateContext, ActionTypes } from "../../hooks/useApplicationState";

const PageContainer = styled.div`
  display: grid;
  justify-content: center;
  align-content: center;
  min-height: 100vh;
  grid-template-columns: auto;
`;

const DeviceContainer = styled.div`
  min-height: 300px;
  height: 80vh;
  max-height: 600px;

  min-width: calc(300px / 2.165);
  width: calc(80vh / 2.165);
  max-width: calc(600px / 2.165);
  border: 16px solid #000;

  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  box-sizing: content-box;
  background-color: #2e2e2e;
  overflow: hidden;

  display: grid;

  & > * {
    width: 100%;
    height: 100%;
    max-height: 100%;
    overflow: hidden;
    box-sizing: border-box;
    grid-column: 1;
    grid-row: 1;
  }
`;

const HomeButtonContainer = styled.div`
  width: 100%;

  background-color: #000;

  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
`;

const HomeButton = styled.button`
  background: transparent;
  border: none;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 10px;
  margin: 5px;
  background: rgba(255, 255, 255, 0.15);
  cursor: pointer;

  :focus {
    outline: none;
  }

  :hover {
    background: rgba(255, 255, 255, 0.2);
  }

  ::after {
    display: block;
    content: "";
    width: 2.5vh;
    height: 2.5vh;
    border: 2px solid #fff;
    border-radius: 20%;
  }
`;

function App({ children }) {
  const {
    state: { appState },
    dispatch,
  } = React.useContext(StateContext);

  return (
    <PageContainer>
      <DeviceContainer>{children}</DeviceContainer>
      <HomeButtonContainer>
        <HomeButton
          onClick={() =>
            dispatch({ type: ActionTypes.setState, payload: "HOME" })
          }
        />
      </HomeButtonContainer>
    </PageContainer>
  );
}

export default App;
