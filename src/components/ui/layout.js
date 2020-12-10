import React from "react";
import styled from "styled-components";
import { StateContext, ActionTypes } from "../../hooks/useApplicationState";
import PhoneRouter from "../phone-router";
import LocationRouter from "../location-router";

const PageContainer = styled.div`
  display: grid;
  grid-template-columns: minmax(275px, 35%) 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
  /*background-color: #fee140;
  background-image: linear-gradient(90deg, #fee140 0%, #fa709a 100%);*/

  background-image: url("/ui/wood_01.jpg");
  background-size: cover;
  background-position: center;
`;

const DeviceOuterContainer = styled.div`
  overflow: hidden;
  align-self: center;
  justify-self: center;

  visibility: ${(props) => (props.hidden ? "hidden" : "visible")};

  width: 95%;
  max-width: 375px;
  min-height: 300px;
  height: 80vh;
  max-height: 750px;
  display: flex;
  flex-direction: column;
  border: 16px solid #000;
  background-color: #000;
  border-radius: 24px;
  box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.5);
`;

const DeviceContainer = styled.div`
  flex-grow: 1;
  width: 100%;

  background-color: #2e2e2e;
  overflow: hidden;
  border-radius: 8px;

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

  display: flex;
  justify-content: center;
  padding: 16px 0 0 0;
  grid-column: 1;
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

const Header = styled.div`
  padding: 16px 8px;
  color: #fff;
  background: rgba(75, 75, 75);
  grid-column: span 2;
  align-self: start;
  display: flex;
  align-items: center;
`;

const RightPanel = styled.div`
  width: 100%;
  height: 100%;

  padding: 8px;
  display: grid;
  place-items: center;
  background-color: #ffffff;
  background-image: url("https://www.transparenttextures.com/patterns/brick-wall.png");
  border-left: 6px solid #000;
`;

function App({ children }) {
  const {
    state: { appState },
    dispatch,
  } = React.useContext(StateContext);

  const goHome = () => {
    const destination =
      appState === "LOCKSCREEN"
        ? "LOCKSCREEN.UNLOCK"
        : appState === "LOCKSCREEN.UNLOCK"
        ? "LOCKSCREEN"
        : "HOME";

    dispatch({ type: ActionTypes.setState, payload: destination });
  };

  return (
    <PageContainer>
      <Header>Mappedin Escape Room</Header>
      <DeviceOuterContainer hidden={appState === "HIDDEN"}>
        <DeviceContainer>
          <PhoneRouter />
        </DeviceContainer>
        <HomeButtonContainer>
          <HomeButton onClick={goHome} />
        </HomeButtonContainer>
      </DeviceOuterContainer>
      <RightPanel>
        <LocationRouter />
      </RightPanel>
    </PageContainer>
  );
}

export default App;
