import React from "react";
import styled from "styled-components";
import StatusBar from "../ui/statusbar";
import AppIcon from "./app-icon";
import { motion } from "framer-motion";
import Layout from "../ui/layout";

const Container = styled(motion.div)`
  height: 100%;

  color: #fff;
  background: rgb(50, 50, 50);
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
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
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
      </AppGrid>
    </Container>
  );
}
