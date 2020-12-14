import React from "react";
import InteractiveImage from "../shared/interactive-image";
import Button from "../shared/button";
import { useHistory } from "react-router-dom";

export default function OutsideOffice() {
  const history = useHistory();

  const enterOffice = () => {
    history.push("/main_office");
  };

  return (
    <InteractiveImage src="./office/outside_office.png">
      <Button onClick={enterOffice}>Enter the office</Button>
    </InteractiveImage>
  );
}
