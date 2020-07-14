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
  const [time, setTime] = React.useState(
    `${new Date().getHours()}:${new Date().getMinutes()}`
  );

  React.useEffect(() => {
    setInterval(
      () => {
        const d = new Date();
        setTime(`${d.getHours()}:${d.getMinutes()}`);
      },
      1000,
      true
    );
  }, []);

  return (
    <StatusBarWrapper
      className={className}
      textColor={textColor}
      backgroundColor={backgroundColor}
    >
      <p>webspring</p>
      <p>{time}</p>
    </StatusBarWrapper>
  );
};

export default StatusBar;
