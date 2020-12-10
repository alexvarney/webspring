import React from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  0%{
    opacity:0;
    //transform: rotate(0deg);
  }

  100% {
    opacity:1;
    //transform: rotate(360deg);
  }
`;

const Container = styled.div`
  width: 100%;
  height: 50vw;
  background-color: aqua;
  box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.3);
  background-image: url(${(props) => props.backgroundSrc});
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  animation: ${(props) => (props.animationPlay ? fadeIn : "")} ease 10s;
`;

const Clickable = styled.div`
  border: 1px solid red;
  position: absolute;
  left: ${(props) => props.x[0]}%;
  width: ${(props) => props.x[1] - props.x[0]}%;
  top: ${(props) => props.y[0]}%;
  height: ${(props) => props.y[1] - props.y[0]}%;
  transform: rotate(${(props) => props.rotation ?? 0}deg);
`;

const ControlsMenu = styled.div`
  width: 100%;
  height: 10%;
  background-color: #1c2542;
  z-index: 50;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  color: #fff;
  align-items: center;
  padding: 0 2.5%;

  a,
  a:link,
  a:visited,
  a:active {
    color: unset;
  }
`;

export default function InteractiveImage({
  src,
  areas,
  children,
  animationPlay,
}) {
  return (
    <Container backgroundSrc={src} animationPlay>
      {areas && areas.map((area) => <Clickable {...area} />)}
      {children && <ControlsMenu>{children}</ControlsMenu>}
    </Container>
  );
}
