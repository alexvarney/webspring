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

export default function PetWall() {
  const history = useHistory();
  const { state, dispatch } = useContext(StateContext);
  const [codeInput1, setCodeInput1] = useState("");
  const [codeInput2, setCodeInput2] = useState("");
  const [codeInput3, setCodeInput3] = useState("");
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [colorState, setColorState] = useState("white");
  useEffect(() => {
    if (codeInput1 == "6" && codeInput2== "5" && codeInput3 == "10") {
      setTimeout(() => {
        //dispatch({ type: "SET_STATE", payload: "LOCKSCREEN" });
        history.push("/pet_wall_answer");
      }, 150);
    }
    else if (codeInput1 > " " ||  codeInput2 > " " || codeInput3 > " "){
      setTimeout(() => {
        setColorState("red");
      }, 500);
    }
  }, [codeInput1]);

  return (
    <InteractiveImage animationPlay={true} src="./office/pet_wall_original.png">
      <InputContainer>
        <p>Dog Code:</p>
        <input
          value={input1}
          onChange={(e) => {
            setInput1(e.target.value);
            setColorState("white");
          }}
          style={{ backgroundColor: colorState }}
          type="number"
        
        />
        <input
          value={input2}
          onChange={(e) => {
            setInput2(e.target.value);
            setColorState("white");
          }}
          style={{ backgroundColor: colorState }}
          type="number"
        
        />
        <input
          value={input3}
          onChange={(e) => {
            setInput3(e.target.value);
            setColorState("white");
          }}
          style={{ backgroundColor: colorState }}
          type="number"

        />
        <button
          onClick={() => {
            setCodeInput1(input1);
            setCodeInput2(input2);
            setCodeInput3(input3);
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
