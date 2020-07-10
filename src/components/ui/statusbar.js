import React from "react";
import styled from "styled-components";

const StatusBarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  color: #fff;
  background-color: transparent;
  font-size: 12px;
  user-select: none;
  padding: 8px;
`;

const StatusBar = ({ textColor, backgroundColor, className }) => {
  return (
    <StatusBarWrapper
      className={className}
      textColor={textColor}
      backgroundColor={backgroundColor}
    >
      <p>webspring</p>
      <p>10:34</p>
    </StatusBarWrapper>
  );
};

export default StatusBar;
