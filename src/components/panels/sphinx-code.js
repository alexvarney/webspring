import React, { useContext } from "react";
import InteractiveImage from "../shared/interactive-image";
import { useHistory } from "react-router-dom";
import { StateContext } from "../util/useApplicationState";

export default function SphinxCode() {
  const history = useHistory();
  const {
    state: { completedPuzzles },
  } = useContext(StateContext);

  const isComplete = completedPuzzles.includes("MEETING_ROOM");

  if (!isComplete) {
    history.push("/main_office");
    return <> </>;
  }

  return <InteractiveImage src="./office/sphinx_code.png" />;
}
