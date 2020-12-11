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

export default function FantasyWall() {
  const history = useHistory();
  const { state, dispatch } = useContext(StateContext);
  const [codeInput, setCodeInput] = useState("");
  const [input, setInput] = useState("");
  const [colorState, setColorState] = useState("white");
  const [backgroundPath, setBackgroundPath] = useState(
    "./office/FantasyMap.png"
  );
  useEffect(() => {
    if (codeInput == "n3i6u5" || codeInput == "N3I6U5") {
      setTimeout(() => {
        //dispatch({ type: "SET_STATE", payload: "LOCKSCREEN" });
        // history.push("/pet_wall_answer");
        //   setBackgroundPath(
        //     "https://media.giphy.com/media/yXBqba0Zx8S4/giphy.gif"
        //   );

        setBackgroundPath(
          "https://cdn.dribbble.com/users/2143961/screenshots/4248258/evr-crypto00.jpg"
        );
      }, 150);
    } else if (codeInput > " ") {
      setTimeout(() => {
        setBackgroundPath(
          "https://media.giphy.com/media/fADmG2Wc1EYGqgUbE8/giphy.gif"
        );
        setColorState("red");
      }, 0);
      setTimeout(() => {
        setBackgroundPath("./office/FantasyMap.png");
      }, 2000);
    }
  }, [codeInput]);

  return (
    <>
      <InteractiveImage animationPlay={true} src={backgroundPath}>
        <InputContainer>
          <p>Grid Code:</p>
          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setColorState("white");
            }}
            style={{ backgroundColor: colorState }}
            placeholder="A1B2C3"
          />
          <button
            onClick={() => {
              setCodeInput(input);
            }}
          >
            Enter Code
          </button>
          <button
            onClick={() => {
              if (backgroundPath == "./office/FantasyMap.png")
                setBackgroundPath("./office/morse_scroll_minimal.png");
              else setBackgroundPath("./office/FantasyMap.png");
            }}
          >
            Toogle Scroll
          </button>
        </InputContainer>
      </InteractiveImage>
    </>
  );
}
