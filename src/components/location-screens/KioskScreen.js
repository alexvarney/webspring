import React, { useContext, useState, useEffect } from "react";
import InteractiveImage from "../interactive-image";
import { Link, useHistory } from "react-router-dom";
import { StateContext, ActionTypes } from "../../hooks/useApplicationState";
import styled from "styled-components";

const InputContainer = styled.div`
  display: flex;
  input {
    margin-right: 24px;
  }

  p {
    margin-right: 12px;
  }
`;

export default function KioskScreen() {
  const history = useHistory();
  const { state, dispatch } = useContext(StateContext);
  const [dataInput, setDataInput] = useState("");

  useEffect(() => {
    if (dataInput == "1935") {
      setTimeout(() => {
        dispatch({ type: "SET_STATE", payload: "LOCKSCREEN" });
        history.push("/outside_office")
      }, 150);
    }
  }, [dataInput]);

  const ClickableRegions = [
    {
      key: 1,
      x: [30, 70],
      y: [15, 80],
      onClick: () =>
        window.open(
          "https://www.google.ca/maps/@43.4973584,-80.5268509,3a,75y,112.2h,91.61t/data=!3m6!1e1!3m4!1sAF1QipPrXC_fqOLgAtJrkLwGd6Q1MJfz06e2QkIM-jWv!2e10!7i13312!8i6656"
        ),
    },
  ];

  return (
    <InteractiveImage areas={ClickableRegions} src="./office/MappinsDirectory.png">
      <img src="./office/MappinsHint.png" height="70"/>
      <InputContainer>
        <p>Answer:</p>
        <input
          value={dataInput}
          onChange={(e) => {
            setDataInput(e.target.value); 
          }}
        />
      </InputContainer>
    </InteractiveImage>
  );
}
