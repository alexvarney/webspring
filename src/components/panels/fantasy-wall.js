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

export default function FantasyWall() {
  const history = useHistory();
  const [codeInput1, setCodeInput1] = useState("");
  const [input1, setInput1] = useState("");
  const [codeInput2, setCodeInput2] = useState("");
  const [input2, setInput2] = useState("");
  const [codeInput3, setCodeInput3] = useState("");
  const [input3, setInput3] = useState("");
  const [colorState, setColorState] = useState("white");
  const [backgroundPath, setBackgroundPath] = useState(
    "./office/FantasyMap.png"
  );

  const {
    state: { completedPuzzles },
    dispatch,
  } = useContext(StateContext);

  const isPuzzleComplete = completedPuzzles.includes("FANTASYWALL");
  const markComplete = () =>
    setTimeout(
      dispatch({ type: ActionTypes.completePuzzle, payload: "FANTASYWALL" }),
      1000
    );

  useEffect(() => {
    if (
      codeInput1 == "n3" ||
      codeInput1 == "N3" ||
      codeInput2 == "i6" ||
      codeInput2 == "I6" ||
      codeInput3 == "u5" ||
      codeInput3 == "U5"
    ) {
      setTimeout(() => {
        //dispatch({ type: "SET_STATE", payload: "LOCKSCREEN" });
        // history.push("/pet_wall_answer");
        //   setBackgroundPath(
        //     "https://media.giphy.com/media/yXBqba0Zx8S4/giphy.gif"
        //   );
        markComplete();
        setBackgroundPath(
          "https://cdn.dribbble.com/users/2143961/screenshots/4248258/evr-crypto00.jpg"
        );
      }, 150);
    } else if (codeInput1 > " " || codeInput2 > " " || codeInput3 > " ") {
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
  }, [codeInput1]);

  return (
    <>
      <InteractiveImage
        animationPlay={true}
        src={
          !isPuzzleComplete
            ? backgroundPath
            : "https://cdn.dribbble.com/users/2143961/screenshots/4248258/evr-crypto00.jpg"
        }
      >
        <InputContainer>
          <p>Grid Code:</p>
          <input
            value={input1}
            onChange={(e) => {
              setInput1(e.target.value);
              setColorState("white");
            }}
            style={{ backgroundColor: colorState }}
            placeholder="A1"
          />
          <input
            value={input2}
            onChange={(e) => {
              setInput2(e.target.value);
              setColorState("white");
            }}
            style={{ backgroundColor: colorState }}
            placeholder="A1"
          />
          <input
            value={input3}
            onChange={(e) => {
              setInput3(e.target.value);
              setColorState("white");
            }}
            style={{ backgroundColor: colorState }}
            placeholder="A1"
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
