import React from "react";
import styled from "styled-components";
import useApplicationState, { StateContext } from "./hooks/useApplicationState";
import Layout from "./components/ui/layout";

function App() {
  const applicationState = useApplicationState();

  return (
    <StateContext.Provider value={applicationState}>
      <Layout />
    </StateContext.Provider>
  );
}

export default App;
