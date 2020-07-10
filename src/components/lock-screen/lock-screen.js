import React from "react";
import styled from "styled-components";
import { IoMdLock, IoMdUnlock } from "react-icons/io";
import { FaPiedPiperSquare } from "react-icons/fa";
import { motion } from "framer-motion";

import StatusBar from "../ui/statusbar";

const OuterContainer = styled(motion.div)`
  background: linear-gradient(0deg, #d53369 0%, #daae51 100%);
  color: #fff;

  width: 100%;
  height: 100%;

  user-select: none;

  position: relative;
  ::after {
    content: "";
    position: absolute;
    bottom: 16px;
    width: 40%;
    left: 30%;
    border: 2px solid white;
    border-radius: 2px;
  }
`;

const InnerContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 8px;
`;

const Clock = styled.p`
  margin-top: 8px;

  font-size: 64px;
  font-weight: 200;
  text-align: center;
  white-space: nowrap;
  user-select: none;
`;

const LockStatusContainer = styled.div`
  display: flex;
  justify-content: center;

  margin-top: 16px;
  & > * {
    margin: 0px 4px;
  }
  font-size: 14px;
`;

const DateDisplay = styled.p`
  text-align: center;
  font-size: 18px;
  margin-top: 8px;
  font-weight: 300;
`;

const NotificationContainer = styled.div`
  margin-top: 32px;
`;

const NotificationWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(2px);
  border-radius: 5px;

  padding: 8px;

  :not(:first-child) {
    margin-top: 8px;
  }
  font-size: 12px;
`;

const NotificationHeader = styled.div`
  display: flex;

  margin-bottom: 8px;
  & > *:nth-child(2) {
    margin-left: 8px;
    text-transform: uppercase;
  }
  font-weight: 300;
  color: rgba(255, 255, 255, 0.65);
`;

const NotificationHeaderTimestamp = styled.p`
  flex-grow: 1;
  text-align: right;
`;

const NotificationText = styled.p`
  line-height: 125%;
  font-weight: 300;
`;

const Notification = ({ name, time, text }) => {
  return (
    <NotificationWrapper>
      <NotificationHeader>
        <FaPiedPiperSquare /> <p>{name}</p>{" "}
        <NotificationHeaderTimestamp>{time}</NotificationHeaderTimestamp>
      </NotificationHeader>
      <NotificationText>{text}</NotificationText>
    </NotificationWrapper>
  );
};

export default function LockScreen({ onSwipeUp = () => 0 }) {
  const constraintsRef = React.useRef(null);

  const dragHandler = (event, info) => {
    if (info.point.y < -30) {
      onSwipeUp();
    }
  };

  return (
    <motion.div
      ref={constraintsRef}
      exit={{ opacity: 0 }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
    >
      <OuterContainer
        drag="y"
        dragConstraints={constraintsRef}
        dragElastic={0.15}
        onDrag={dragHandler}
      >
        <StatusBar />
        <InnerContainer>
          <LockStatusContainer>
            <IoMdLock /> <p>Swipe up to unlock</p>
          </LockStatusContainer>
          <Clock>10:34</Clock>
          <DateDisplay>Monday, July 6</DateDisplay>
          <NotificationContainer>
            <Notification
              name="Example app"
              time="1m ago"
              text="This is an example notification"
            />
            <Notification
              name="Another App"
              time="1h ago"
              text="This is an example of a notification with a longer text descrption. Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, dolorum?"
            />
          </NotificationContainer>
        </InnerContainer>
      </OuterContainer>
    </motion.div>
  );
}
