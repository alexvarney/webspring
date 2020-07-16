import React from "react";
import { BrowserRouter } from "react-router-dom";
import useApplicationState, { StateContext } from "./hooks/useApplicationState";
import Layout from "./components/ui/layout";

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
