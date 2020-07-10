import React from "react";
import styled from "styled-components";

const StatusBarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  color: #fff;
  font-size: 12px;
  user-select: none;
`;

const StatusBar = (props) => {
  return (
    <StatusBarWrapper>
      <p>webspring</p>
      <p>10:34</p>
    </StatusBarWrapper>
  );
};

export default StatusBar;
