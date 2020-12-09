import React from "react";
import styled from "styled-components";
import ReactPlayer from "react-player/youtube";
import { motion } from "framer-motion";
import StateContainer from "./ui/state-container";

const Container = styled(StateContainer)`
  background-color: #fff;
`;

const VideoContainer = styled.div`
  width: 100%;

  & > * {
    max-width: 100%;
  }
`;

const VideoDescriptionContainer = styled.div`
  padding: 8px 12px;

  & > h2 {
    font-size: 14px;
  }

  & > h3 {
    margin-top: 6px;
    font-size: 10px;
  }

  border-bottom: 1px solid lightgrey;
  box-shadow: 2px 0px 4px rgba(40, 40, 40, 0.5);
`;

const DummyContentContainer = styled.div`
  padding: 8px;
`;

const Card = styled.div`
  width: 75%;
  margin: 16px auto;
  height: 100px;
  border-radius: 5px;
  padding: 5%;
`;

const TextHint = styled(motion.p)`
  color: rgba(0, 0, 0, 0.65);
`;

const textHintVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default function Component(props) {
  const [isHintVisible, setHintVisible] = React.useState(false);

  return (
    <Container>
      <VideoContainer>
        <ReactPlayer
          url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          playsinline
          playing={false}
        />
      </VideoContainer>
      <VideoDescriptionContainer>
        <h2>WATCH THIS VIDEO UNTIL THE VERY END!!</h2>
        <h3>342,561,000 Views • 9 Years Ago</h3>
      </VideoDescriptionContainer>
      <DummyContentContainer>
        <Card
          style={{
            background: "linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%)",
          }}
          onClick={() => setHintVisible((prev) => !prev)}
        >
          <TextHint
            initial="hidden"
            animate={isHintVisible ? "visible" : "hidden"}
            variants={textHintVariants}
          >
            This is some text
          </TextHint>
        </Card>
        <Card
          style={{
            background: "linear-gradient(-90deg, #e3ffe7 0%, #d9e7ff 100%)",
          }}
        />
      </DummyContentContainer>
    </Container>
  );
}
