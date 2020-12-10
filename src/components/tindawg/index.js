import React, { useState } from "react";
import styled from "styled-components";
import StateContainer from "../ui/state-container";
import TindawgSwiper from "./swiper";
import Message from "./message";

const Container = styled(StateContainer)`
  background-color: #f0f0f0;
  display: grid;
  grid-template: auto 1fr / 1fr;
`;

const BannerImage = styled.img`
  width: 100%;
  max-height: 48px;
  object-fit: contain;
  padding: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.125);
  background-color: #fff;
`;

export default function TindawgState() {
  return (
    <Container>
      <BannerImage src="/icons/tindawg_banner.png" />
      <Message />
    </Container>
  );
}
