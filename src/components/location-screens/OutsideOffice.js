import React, { useContext } from "react";
import InteractiveImage from "../interactive-image";
import { Link, useHistory } from "react-router-dom";
import { StateContext, ActionTypes } from "../../hooks/useApplicationState";

export default function OutsideOffice() {
  const history = useHistory();
  const { state, dispatch } = useContext(StateContext);

  const enterOffice = () => {
    history.push('/main_office')
  };

  return (
    <InteractiveImage
      src="./office/outside_office.png"
    >
    <button onClick={enterOffice}>Enter the office</button>
    </InteractiveImage>
  );
}
