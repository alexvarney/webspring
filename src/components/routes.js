import React from "react";

import LockScreen from "./lock-screen/";
import HomeScreen from "./home-screen";
import MapView from "./map-view";
import { AnimatePresence } from "framer-motion";
import { StateContext } from "../hooks/useApplicationState";

export default function Routes() {
  const {
    state: { appState },
  } = React.useContext(StateContext);

  console.log(appState);

  return (
    <>
      <AnimatePresence>
        {appState === "HOME" && <HomeScreen key="home-screen-outer" />}
      </AnimatePresence>
      <AnimatePresence>
        {appState === "MAP" && <MapView key="map-view-outer" />}
      </AnimatePresence>
      <AnimatePresence>
        {appState === "LOCKED" && <LockScreen key="lock-screen-outer" />}
      </AnimatePresence>
    </>
  );
}
