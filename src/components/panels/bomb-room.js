import React, { useState, useEffect, useRef } from "react";
import { Container as InteractiveImageContainer } from "../shared/interactive-image";

import styled from "styled-components";

const Container = styled(InteractiveImageContainer)`
  background-image: url("/office/bombdefusalUI.jpg");
`;

const InputWrapper = styled.div`
  position: absolute;
  left: 18.5%;
  right: 18.5%;
  top: 80%;
  bottom: 14.5%;

  display: grid;
  grid-template: 1fr / repeat(4, 1fr);
  grid-gap: 3.5%;

  & > input {
    color: #000;
    border: none;
    text-transform: uppercase;
  }
`;

const unlockCode = ["stay", "hom", "fur", "evr"];

export default function BombRoom() {
  const [dataInput, _setDataInput] = useState(["", "", "", ""]);
  const timeoutRef = useRef();

  const setData = (index, value) => {
    _setDataInput((prevVal) => {
      const newArr = [...prevVal];
      newArr[index] = value;
      return newArr;
    });
  };

  useEffect(() => {
    const isValid = dataInput.every(
      (value, index) => unlockCode[index].toLowerCase() === value.toLowerCase()
    );

    if (isValid) {
      timeoutRef.current = setTimeout(() => {
        alert("Puzzle unlocked");
      }, 250);
    }
  }, [dataInput]);

  useEffect(
    () => () => timeoutRef.current && clearTimeout(timeoutRef.current),
    []
  );

  return (
    <Container>
      <InputWrapper>
        <input
          type="text"
          value={dataInput[0]}
          onChange={(e) => setData(0, e.target.value)}
        />
        <input
          type="text"
          value={dataInput[1]}
          onChange={(e) => setData(1, e.target.value)}
        />
        <input
          type="text"
          value={dataInput[2]}
          onChange={(e) => setData(2, e.target.value)}
        />
        <input
          type="text"
          value={dataInput[3]}
          onChange={(e) => setData(3, e.target.value)}
        />
      </InputWrapper>
    </Container>
  );
}
