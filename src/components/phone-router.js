import React from "react";

import LockScreen from "./lock-screen";
import HomeScreen from "./home-screen";
import MapView from "./map-view/";
import SlackView from "./slack-view";
import Player from "./player";
import { AnimatePresence } from "framer-motion";
import { StateContext } from "../hooks/useApplicationState";
import Tindawg from "./tindawg";

export default function Routes() {
  const {
    state: { appState },
  } = React.useContext(StateContext);

  console.log(appState);

  return (
    <AnimatePresence>
      {appState === "TINDAWG" && <Tindawg key="tindawg-view-outer" />}

      {appState === "PLAYER" && <Player key="youtube-view-outer" />}

      {appState === "MAP" && <MapView key="map-view-outer" />}

      {(appState === "LOCKSCREEN" || appState === "LOCKSCREEN.UNLOCK") && (
        <LockScreen key="lock-screen-outer" />
      )}

      {appState === "SLACK" && <SlackView />}

      {appState === "HOME" && <HomeScreen key="home-screen-outer" />}
    </AnimatePresence>
  );
}
