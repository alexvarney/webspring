import React from "react";
import styled from "styled-components";

import LockScreen from "./components/lock-screen";

const AppContainer = styled.div`
  display: grid;
  justify-content: center;
  align-content: center;
  min-height: 100vh;
`;

function App() {
  return (
    <AppContainer className="App">
      <LockScreen />
    </AppContainer>
  );
}

export default App;
