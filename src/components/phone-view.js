import React, { useState, useContext } from "react";
import styled from "styled-components";
import StatusBar from "./ui/statusbar";
import { motion, useAnimation } from "framer-motion";
import { ImPhone, ImPhoneHangUp } from "react-icons/im";
import { RiDeleteBack2Line } from "react-icons/ri"

const Wrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: white;
  backdrop-filter: blur(8px) contrast(1.5) brightness(0.6);
  z-index: 1;
  color: black;
  opacity: 0;
  position: relative;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 100%;
  align-items: center;
  position: relative;
  max-width: 100%;
  min-height: 0;
  overflow: hidden;
  cursor: pointer;
  padding-top: 35px;

  & > img {
    overflow: hidden;
    object-fit: contain;
    width: 5vh;
    border-radius: 50%;
    max-width: 50px;
    max-height: 50px;
  }

`;

const CancelButton = styled.img`

  margin-left: 19px;

`;

const PasscodeInputWrapper = styled.div`
  display: grid;
  margin: 0 20%;

  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: 1fr;
  grid-row-gap: 5%;
  grid-column-gap: 10%;

  & > button {
    background-color: lightgrey;
    backdrop-filter: brightness(2);
    border: none;
    color: black;
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

    :hover {
      backdrop-filter: brightness(2.5) opacity(0.5);
    }

    :focus {
      outline: none;
      border: none;
    }
  }

  & > .phoneIcon {
    background: limegreen;
  }

  & > .hangUpIcon {
    background: orangered;
  }

  & > .deleteButton {
    background-image: url(./icons/cancel_button.png);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100%;
    background-color: transparent;
  }

  & > .clearButton {
    background: transparent;
  }
`;

const PhoneInputView = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  align-items: center;
  position: relative;
  max-width: 100%;
  min-height: 100px;
  overflow: hidden;
  cursor: pointer;
  justify-content: center;
`;

function sound(src, loop = false) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  this.sound.loop = loop
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}

var phoneTimeout;
var phoneInterval;
const phoneDial = new sound("./audio/phone_dial.mp3");
const morseCode = new sound("./audio/morse_code.wav", true);
var timer = 0;

export default function PhoneView(props) {
  const [inputValue, setInputValue] = useState("");
  const [callStatus, setCallStatus] = useState("");
  const [isCalling, setIsCalling] = useState(false)
  const [callSucceeded, setCallSucceeded] = useState(false)

  React.useEffect(() => {
    return () => {
      hangUp();
    };
  }, [props.current]);

  const handlePhoneInput = (event, char) => {
    event.stopPropagation();
    event.preventDefault();

    setCallStatus("")
    setInputValue((prevVal) => {

      if (prevVal.length == 12) {
        return prevVal;
      }

      if (prevVal.length == 3 || prevVal.length == 7) {
        prevVal += "-"
      }
      console.log(char)
      return prevVal + char.toString();

    });
  };

  const deletePhoneInput = () => {
    setCallStatus("")
    setInputValue((prevVal) => {
      return prevVal.slice(0, -1)
    });
  }


  const successfulCall = () => {
    setCallSucceeded(true)
    morseCode.play();
    incrementTimer()
    phoneInterval = setInterval(incrementTimer, 1000)
  }

  const incrementTimer = () => {

    var minutes = Math.floor(timer/60)
    var seconds = timer%60
    var minutesString = ""
    var secondsString = ""
    if (minutes < 10) {
        minutesString = "0"
    }
    minutesString += minutes

    if (seconds < 10) {
      secondsString = "0"
    }
    secondsString += seconds

    setCallStatus(minutesString + ":" + secondsString)
    timer +=1
  }

  const hangUp = () => {
    setCallSucceeded(false)
    setIsCalling(false)
    clearInterval(phoneInterval)
    clearTimeout(phoneTimeout)
    setCallStatus("Call ended")
    timer = 0;
    //stop all audio files
    phoneDial.stop()
    morseCode.stop()
    console.log("hanging up")
  }

  const call = () => {
    phoneDial.stop();
    phoneDial.play();
    clearTimeout(phoneTimeout)
    setCallStatus("Calling...")
    setIsCalling(true)

    phoneTimeout = setTimeout(function() {
      phoneDial.stop();
      if (inputValue == "519-745-2222") {
        //number called
        successfulCall()
      } else {
        setCallStatus("Call failed")
        setIsCalling(false)
      }
    }, 6000)
  }

  const phoneInputs = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#']
  return (
    <Wrapper
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      key="map-container"
    >
      <StatusBar />

      <PhoneInputView>
        <center>{inputValue}</center>
        <center>{callStatus}</center>
      </PhoneInputView>


      <PasscodeInputWrapper>
        <div
          style={{
            gridRow: "1",
            gridColumn: "1",
            width: 0,
            paddingBottom: "100%",
          }}
        />
        {phoneInputs.map((e, i) => (
          <button key={i} onClick={(event)=>{handlePhoneInput(event, phoneInputs[i])}}>{phoneInputs[i]}</button>
        ))}
        <button className="clearButton"></button>
        {!isCalling&&<button className="phoneIcon" onClick={()=>{call()}}><ImPhone color="white" /></button>}
        {isCalling&&<button className="hangUpIcon" onClick={()=>{hangUp()}}><ImPhoneHangUp color="white" /></button>}
        <button className="deleteButton" onClick={()=>{deletePhoneInput()}}></button>
      </PasscodeInputWrapper>

    </Wrapper>
    );
}
