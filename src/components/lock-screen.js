import React from "react";
import styled from "styled-components";
import { IoMdLock, IoMdUnlock } from "react-icons/io";
import { FaPiedPiperSquare } from "react-icons/fa";
import { motion } from "framer-motion";

const Container = styled(motion.div)`
  min-height: 300px;
  height: 80vh;
  max-height: 600px;

  min-width: calc(300px / 2.165);
  width: calc(80vh / 2.165);
  max-width: calc(600px / 2.165);
  border: 16px solid #000;

  border-radius: 5px;
  box-sizing: content-box;
  background-color: #2e2e2e;
  overflow: hidden;

  & > * {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
`;

const ScreenContainer = styled(motion.div)`
  background: linear-gradient(0deg, #d53369 0%, #daae51 100%);
  color: #fff;

  width: 100%;
  height: 100%;

  padding: 8px;

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

const StatusBar = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  font-size: 12px;
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

export default function LockScreen(props) {
  const constraintsRef = React.useRef(null);

  return (
    <Container>
      <motion.div ref={constraintsRef}>
        <ScreenContainer
          drag="y"
          dragConstraints={constraintsRef}
          dragElastic={0.15}
          onDrag={(event, info) => console.log(info.point.x, info.point.y)}
        >
          <StatusBar>
            <p>webspring</p>
            <p>10:34</p>
          </StatusBar>
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
        </ScreenContainer>
      </motion.div>
    </Container>
  );
}
