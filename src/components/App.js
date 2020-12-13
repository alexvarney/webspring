import React from "react";
import { BrowserRouter } from "react-router-dom";
import useApplicationState, { StateContext } from "./util/useApplicationState";
import Layout from "./layout/layout";

function App() {
  const applicationState = useApplicationState();

  return (
    <StateContext.Provider value={applicationState}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </StateContext.Provider>
  );
}

export default App;
