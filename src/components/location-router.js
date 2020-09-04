import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import ExampleLocation from "./location-screens/example";
import KioskScreen from "./location-screens/KioskScreen";
import ValuesWall from "./location-screens/ValuesWall";
import PetWall from "./location-screens/PetWall";
import ServerRoom from "./location-screens/ServerRoom";
import HongWeiOffice from "./location-screens/HongWeiOffice";
import OutsideOffice from "./location-screens/OutsideOffice";
import MainOffice from "./location-screens/MainOffice";

export default function LocationRouter() {
  return (
    <Switch>
      <Route exact path="/">
        <KioskScreen />
      </Route>
      <Route exact path="/2">
        You are at the 2nd path
        <Link to="/">Page 1</Link>
      </Route>
      <Route exact path="/values_wall">
        <ValuesWall />
      </Route>
      <Route exact path="/outside_office">
        <OutsideOffice />
      </Route>
      <Route exact path="/main_office">
        <MainOffice />
      </Route>
      <Route exact path="/server_room">
        <ServerRoom />
      </Route>
      <Route exact path="/hongwei_office">
        <HongWeiOffice />
      </Route>
      <Route exact path="/pet_wall">
        <PetWall />
      </Route>
    </Switch>
  );
}
