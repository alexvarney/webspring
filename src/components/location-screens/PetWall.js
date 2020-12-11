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

export default function PetWall() {
  const history = useHistory();
  const { state, dispatch } = useContext(StateContext);
  const [codeInput, setCodeInput] = useState("");
  const [input, setInput] = useState("");
  const [colorState, setColorState] = useState("white");
  useEffect(() => {
    if (codeInput == "6510") {
      setTimeout(() => {
        //dispatch({ type: "SET_STATE", payload: "LOCKSCREEN" });
        history.push("/pet_wall_answer");
      }, 150);
    }
    if (codeInput > "0") {
      setTimeout(() => {
        setColorState("red");
      }, 500);
    }
  }, [codeInput]);

  return (
    <InteractiveImage animationPlay={true} src="./office/pet_wall_original.png">
      <InputContainer>
        <p>Dog Code:</p>
        <input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setColorState("white");
          }}
          style={{ backgroundColor: colorState }}
          type="number"
          placeholder="0000"
        />
        <button
          onClick={() => {
            setCodeInput(input);
          }}
        >
          Enter Code
        </button>
      </InputContainer>
    </InteractiveImage>
  );
}

export function PetWallAnswer() {
  return (
    <InteractiveImage src="./office/pet_wall_answer.png"></InteractiveImage>
  );
}
