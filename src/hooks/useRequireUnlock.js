import React from "react";
import { StateContext } from "./useApplicationState";
import { useHistory } from "react-router-dom";

export default function useRequireUnlock() {
  const { state } = React.useContext(StateContext);

  const history = useHistory();

  if (state.unlocked !== true) {
    console.log("redirecting");

    history.push("/");
  }
}
