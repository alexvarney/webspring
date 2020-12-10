import React from "react";
import styled from "styled-components";
import ReactPlayer from "react-player/youtube";
import { motion } from "framer-motion";
import StateContainer from "./ui/state-container";

const Container = styled(StateContainer)`
  background-color: #fff;
  overflow: scroll !important;
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
  width: 90%;
  background-color:lightgrey;
  margin: 16px auto;
  border-radius: 5px;
  padding: 5%;
`;

const TextHint = styled(motion.p)`
  color: rgba(0, 0, 0, 0.65);
`;

const Author = styled.div`
  font-weight: bold !important;
`;

const textHintVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const comments = [
{ text: "Ugh seriously", author: "ragefilledpriscilla"}, 
{ text: "This is the internet’s theme song can we all agree", author: "hinityspurious"},
{ text: "My professor sent us this link as the final exam key........", author: "antleeding"},
{ text: "Jokes on you, I love this song.", author: "sluffenportkey"},
{ text: "Who else clicked on this video because they genuinely like the song?", author: "proportionshine"},
{ text: "Wait a minute, this is not the darude sandstorm song someone link me to.", author: "fallaciousorderly"},
{ text: "How tf did this get in my recommended \n Did I just got rickrolled by Youtube", author: "elaborateboromir"},
]

var finalComment = {text: "The passcode is the initials of a book by Andrew S. Grove, it's so good that you should get 2 copies!", author: "realhumanbean"}

export default function Component(props) {
  const [isHintVisible, setHintVisible] = React.useState(false);

  return (
    <Container>
      <VideoContainer>
        <ReactPlayer
          url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          playsinline
          onEnded={()=>{
            setHintVisible(true)
          }}
          playing={false}
        />
      </VideoContainer>
      <VideoDescriptionContainer>
        <h2>WATCH THIS VIDEO UNTIL THE VERY END!!</h2>
        <h3>342,561,000 Views • 9 Years Ago</h3>
      </VideoDescriptionContainer>
      <DummyContentContainer>
        {isHintVisible&&<Card
          style={{
            background: "linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%)",
          }}
        >
          <TextHint
            initial="visible"
            variants={textHintVariants}>
            {finalComment.text}
             <Author>- {finalComment.author}</Author>
          </TextHint>
        </Card>
        }
        {

          comments.map((c)=> (
            <Card>
              {c.text}
               <Author>- {c.author}</Author>
            </Card>
          ))
        }

      </DummyContentContainer>
    </Container>
  );
}
