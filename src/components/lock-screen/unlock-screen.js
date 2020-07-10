import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";

import StatusBar from "../ui/statusbar";
import { IoMdLock, IoMdUnlock } from "react-icons/io";
import { FaRegCircle, FaCircle } from "react-icons/fa";

const Wrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: rgba(127, 208, 248, 0.5);
  backdrop-filter: blur(8px) contrast(1.5) brightness(0.6);
  z-index: 1;
  padding: 8px;
  color: #fff;
  opacity: 0;
`;

export const LockStatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 60%;
  margin: 16px auto;

  & > * {
    margin: 0px 4px;
  }
  font-size: 32px;
`;

const LockBigText = styled.p`
  font-size: 18px;
  margin-top: 8px;
  font-weight: 300;
`;

const LockSmallText = styled(LockBigText)`
  font-size: 14px;
`;

const DotsContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;

  width: 66%;
  height: 16px;
  margin: 0 auto 32px auto;

  & > div {
    display: flex;
    justify-content: center;
    font-size: 14px;
  }
`;

const PasscodeInputWrapper = styled.div`
  display: grid;
  margin: 0 10%;

  grid-template-columns: auto auto auto;
  grid-auto-rows: 1fr;
  grid-row-gap: 5%;
  grid-column-gap: 10%;

  & > button {
    background-color: transparent;
    backdrop-filter: brightness(2);
    border: none;
    color: #fff;
    border-radius: 50%;
    align-self: center;
    justify-self: center;
    width: 100%;
    height: 100%;
    cursor: pointer;
    user-select: none;

    :nth-child(2) {
      grid-row: 1;
      grid-column: 1;
    }

    :last-child {
      grid-column: 2;
    }

    :hover {
      backdrop-filter: brightness(2.5) opacity(0.5);
    }

    :focus {
      outline: none;
      border: none;
    }
  }
`;

const variants = {
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
};

export default function Component({
  onSuccess = () => null,
  passcode = "00000",
}) {
  const [inputValue, setInputValue] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handlePasscodeInput = (event, char) => {
    event.stopPropagation();
    event.preventDefault();
    console.log("called");

    setInputValue((prevVal) => {
      if (prevVal.length < 5) {
        const newValue = prevVal + char.toString();
        return newValue;
      } else {
        return prevVal;
      }
    });
  };

  const dotAnimation = useAnimation();

  useEffect(() => {
    console.log(inputValue);
    if (inputValue.length === 5) {
      if (inputValue === passcode) {
        setIsUnlocked(true);
        dotAnimation.start({
          opacity: 0,
          transition: { duration: 0.3, delay: 0.2 },
        });
        setTimeout(() => {
          onSuccess();
        }, 750);
      } else {
        setInputValue("");

        dotAnimation.start({
          x: [10, -10, 10, -10, 10, -10, 10, -10, 0],
          transition: { duration: 0.5 },
        });
      }
    }
  }, [inputValue]);

  return (
    <Wrapper
      key="unlock-screen"
      variants={variants}
      intial="hidden"
      animate="visible"
      exit="hidden"
    >
      <StatusBar />
      <LockStatusContainer>
        {isUnlocked ? <IoMdUnlock /> : <IoMdLock />}
        <LockBigText>Enter Passcode</LockBigText>
        <LockSmallText>
          Your passcode is required to unlock this device
        </LockSmallText>
      </LockStatusContainer>
      <DotsContainer animate={dotAnimation} initial={{ opacity: 1 }}>
        <div>{inputValue.length >= 1 ? <FaCircle /> : <FaRegCircle />}</div>
        <div>{inputValue.length >= 2 ? <FaCircle /> : <FaRegCircle />}</div>
        <div>{inputValue.length >= 3 ? <FaCircle /> : <FaRegCircle />}</div>
        <div>{inputValue.length >= 4 ? <FaCircle /> : <FaRegCircle />}</div>
        <div>{inputValue.length >= 5 ? <FaCircle /> : <FaRegCircle />}</div>
      </DotsContainer>
      <PasscodeInputWrapper>
        <div
          style={{
            gridRow: "1",
            gridColumn: "1",
            width: 0,
            paddingBottom: "100%",
          }}
        />
        {[...Array(10)].map((e, i) => (
          <button
            key={i}
            onClick={(event) => handlePasscodeInput(event, (i + 1) % 10)}
          >
            {(i + 1) % 10}
          </button>
        ))}
      </PasscodeInputWrapper>
    </Wrapper>
  );
}
