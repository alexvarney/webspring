import React, { useContext, useState, useEffect } from "react";
import InteractiveImage from "../shared/interactive-image";
import { Link, useHistory } from "react-router-dom";
import { StateContext, ActionTypes } from "../util/useApplicationState";
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



export default function BombRoom() {
  const history = useHistory();
  const { state, dispatch } = useContext(StateContext);
  const [dataInput, setDataInput] = useState("");

  useEffect(() => {
    if (dataInput == "1935") {
      setTimeout(() => {
        dispatch({ type: "SET_STATE", payload: "LOCKSCREEN" });
        history.push("/outside_office");
      }, 150);
    }
  }, [dataInput]);



  return (
    <InteractiveImage
        src="./office/bombdefusalUI.jpg"
    >
        {/* <InputContainer>
        <p>Answer:</p>
        <input
            value={dataInput}
            onChange={(e) => {
            setDataInput(e.target.value);
            }}
        />
        </InputContainer> */}
    </InteractiveImage>
    
  );
}

export function InputImage() {
    // return (

    // );
}