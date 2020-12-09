import React from "react";
import styled from "styled-components";
import StatusBar from "../ui/statusbar";
import AppIcon from "./app-icon";
import { motion } from "framer-motion";

const Container = styled(motion.div)`
  height: 100%;
  background: url("/icons/tindawg_legend_dark.png");
  background-size: cover;
  background-position: center;

  color: #fff;

  display: flex;
  flex-direction: column;
  z-index: 10;
`;

const AppGrid = styled.div`
  flex: 0 1 100%;
  max-width: 100%;

  padding: 16px 8px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: min-content;
  grid-gap: 2.5%;
`;

export default function HomeScreen(props) {
  return (
    <Container
      key="home-screen"
      initial={{ scale: 1, opacity: 0 }}
      animate={{ scale: 1, opacity: 1, delay: 0.3 }}
      exit={{ scale: 1, opacity: 0, delay: 0.3 }}
    >
      <StatusBar />
      <AppGrid>
        <AppIcon
          src="https://us.123rf.com/450wm/bentosi/bentosi1812/bentosi181200032/127097317-pin-maps-location-icon-vector.jpg?ver=6"
          label="Maps"
          appState="MAP"
        />
        <AppIcon
          src="http://placekitten.com/g/200/200"
          appState="LOCKSCREEN"
          label="Lock Device"
        />
        <AppIcon
          src="/icons/slack_icon.png"
          appState="SLACK"
          label="Slack"
          notificationNumber="1"
        />
        <AppIcon
          src="http://placekitten.com/g/200/200"
          appState="PLAYER"
          label="YouTube"
          notificationNumber="2"
        />
        <AppIcon
          src={"/icons/tindawg.png"}
          appState="TINDAWG"
          label="Tindawg"
        />
      </AppGrid>
    </Container>
  );
}
